'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Download,
  Trash2,
  Search,
  X,
  ArrowRight,
  Plus
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Action from './Action';
import {
  OPPORTUNITIES,
  IDEAS,
  RESOURCES,
  WORKSPACE_TITLES,
  WORKSPACE_DESCRIPTIONS
} from '../data/studosData';
import { Opportunity, SavedProject, TeamPlan, WorkspaceView } from '../types/studos';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch {
      setError('Saved data could not be loaded on this device.');
    }
    setReady(true);
  }, [key]);

  const save = (newValue: T) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setError('');
    } catch {
      setError('Device storage is unavailable. Keep a copy before leaving.');
    }
  };

  return { value, save, ready, error };
}

function DetailModal({ item, close }: { item: Opportunity; close: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="detail"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <button className="close-dialog" onClick={close} aria-label="Close opportunity details">
        <X size={20} />
      </button>
      <span className="badge">DEMO DATA · ILLUSTRATIVE BRIEF</span>
      <p className="eyebrow">{item.category}</p>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <dl>
        {Object.entries({
          Organization: item.organizer,
          Eligibility: item.eligibility,
          'Location / format': `${item.location} / ${item.format}`,
          Duration: item.duration,
          Deadline: item.deadline,
          'Required skills': item.skills.join(', '),
          'What you learn': item.outcomes,
          'What to prepare': item.prepare,
          'After the experience': item.after
        }).map(([label, val]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{val}</dd>
          </div>
        ))}
      </dl>
      <p className="demo-note">
        This example is not open for applications. Dates, roles and organizers are illustrative.
        No application link is provided.
      </p>
      <Action href="/resources">Find official starting points</Action>
    </dialog>
  );
}

export default function Workspace({ view }: { view: WorkspaceView }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<Opportunity | null>(null);
  const bookmarks = useLocalStorage<string[]>('studos-bookmarks', []);
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [activeIdeaIndex, setActiveIdeaIndex] = useState(0);
  const teamState = useLocalStorage<TeamPlan>('studos-team', { name: '', roles: [] });
  const projectsState = useLocalStorage<SavedProject[]>('studos-projects', []);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = ['All', ...Array.from(new Set(OPPORTUNITIES.map((o) => o.category)))];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newUrl = cat === 'All' ? '/opportunities' : `/opportunities?category=${encodeURIComponent(cat)}`;
    router.replace(newUrl, { scroll: false });
  };

  const filteredOpportunities = OPPORTUNITIES.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSaved = !filterSavedOnly || bookmarks.value.includes(item.id);
    const haystack = `${item.title} ${item.skills.join(' ')} ${item.description}`.toLowerCase();
    const matchesQuery = haystack.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSaved && matchesQuery;
  });

  const activeIdea = IDEAS[activeIdeaIndex] || IDEAS[0];
  const titlePair = WORKSPACE_TITLES[view] || ['STUDOS', 'WORKSPACE'];
  const description = WORKSPACE_DESCRIPTIONS[view] || '';

  const availableRoles = [
    'Problem researcher',
    'Software developer',
    'Hardware builder',
    'Designer',
    'Customer & business thinker'
  ];

  return (
    <>
      <Header />
      <main id="main" className="workspace">
        <Link className="back-link" href="/">
          <ArrowLeft size={15} /> Back to the experience
        </Link>

        <div className="workspace-heading">
          <span className="eyebrow">
            <span className="status-dot" /> YOUR NEXT STEP / {view.toUpperCase()}
          </span>
          <h1>
            {titlePair[0]}
            <br />
            <em>{titlePair[1]}</em>
          </h1>
          <p>{description}</p>
        </div>

        {/* Opportunities View */}
        {view === 'opportunities' && (
          <>
            <div className="demo-banner">
              <span className="badge">DEMO DATA</span>
              <p>All listings are illustrative examples. No live feed or applications are connected.</p>
            </div>

            <div className="explorer-tools">
              <label className="search-box">
                <Search size={19} />
                <input
                  aria-label="Search opportunities"
                  placeholder="Search opportunities or skills…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button aria-label="Clear search" onClick={() => setSearchQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </label>

              <button
                className={`filter-save ${filterSavedOnly ? 'active' : ''}`}
                onClick={() => setFilterSavedOnly(!filterSavedOnly)}
                aria-pressed={filterSavedOnly}
              >
                <Bookmark size={16} /> Saved ({bookmarks.value.length})
              </button>
            </div>

            <div className="filters" aria-label="Opportunity categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={selectedCategory === cat ? 'active' : ''}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="result-count" aria-live="polite">
              {filteredOpportunities.length}{' '}
              {filteredOpportunities.length === 1 ? 'example' : 'examples'}{' '}
              {filterSavedOnly ? 'in your saved list' : 'to explore'}
            </p>

            <div className="op-grid">
              {filteredOpportunities.map((op) => {
                const isBookmarked = bookmarks.value.includes(op.id);
                return (
                  <article className="op-card" key={op.id}>
                    <div className="op-card-top">
                      <span className="eyebrow">{op.category}</span>
                      <button
                        className="icon-btn"
                        aria-label={`${isBookmarked ? 'Unsave' : 'Save'} ${op.title}`}
                        aria-pressed={isBookmarked}
                        onClick={() => {
                          const updated = isBookmarked
                            ? bookmarks.value.filter((id) => id !== op.id)
                            : [...bookmarks.value, op.id];
                          bookmarks.save(updated);
                        }}
                      >
                        <Bookmark size={19} fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <span className="badge">DEMO DATA</span>
                    <h2>{op.title}</h2>
                    <p>{op.description}</p>

                    <div className="tags">
                      {op.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <div className="op-meta">
                      <span>{op.location}</span>
                      <span>{op.duration}</span>
                    </div>

                    <button className="text-link" onClick={() => setActiveModalItem(op)}>
                      Read example brief <ArrowRight size={18} />
                    </button>
                  </article>
                );
              })}
            </div>

            {!filteredOpportunities.length && (
              <div className="empty">
                <h2>No matching examples.</h2>
                <p>Try another search or category.</p>
                <button
                  className="action"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('All');
                    setFilterSavedOnly(false);
                  }}
                >
                  Reset filters <ArrowRight size={16} />
                </button>
              </div>
            )}

            {bookmarks.error && <p role="status">{bookmarks.error}</p>}
          </>
        )}

        {/* Ideas View */}
        {view === 'ideas' && (
          <>
            <div className="filters">
              {IDEAS.map((idea, index) => (
                <button
                  key={idea.name}
                  onClick={() => setActiveIdeaIndex(index)}
                  className={activeIdeaIndex === index ? 'active' : ''}
                  aria-pressed={activeIdeaIndex === index}
                >
                  {idea.name} / {idea.type}
                </button>
              ))}
            </div>

            <article className="idea-brief">
              <div className="brief-title">
                <span className="badge">EXAMPLE IDEA · UNVALIDATED</span>
                <h2>{activeIdea.name}</h2>
                <p>{activeIdea.solution}</p>
              </div>

              <dl>
                {Object.entries({
                  'The problem': activeIdea.problem,
                  'Target user': activeIdea.user,
                  Classification: activeIdea.type,
                  'Suggested technologies': activeIdea.tech,
                  'Prototype budget': activeIdea.budget,
                  'Validation plan': activeIdea.validation
                }).map(([dt, dd]) => (
                  <div key={dt}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>

              <h3>Your first three milestones</h3>
              <ol className="milestones">
                {activeIdea.milestones.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>

              <div className="actions">
                <Action href="/projects">Document your first prototype</Action>
                <Action href="/teams" secondary>
                  Plan your team
                </Action>
              </div>
            </article>
          </>
        )}

        {/* Teams View */}
        {view === 'teams' && (
          <>
            <div className="demo-banner">
              <p>A private planning tool, saved on this device. No public profiles or matching service are connected.</p>
            </div>

            <div className="planner">
              <div>
                <label className="form-label" htmlFor="team-name">
                  What are you building?
                </label>
                <input
                  id="team-name"
                  placeholder="Give your project a working name"
                  value={teamState.value.name}
                  onChange={(e) => teamState.save({ ...teamState.value, name: e.target.value })}
                />

                <h2>Choose complementary skills.</h2>
                <p>These are example roles, not requirements. One person can bring several skills.</p>

                <div className="role-options">
                  {availableRoles.map((role) => {
                    const isChosen = teamState.value.roles.includes(role);
                    return (
                      <button
                        key={role}
                        aria-pressed={isChosen}
                        className={isChosen ? 'chosen' : ''}
                        onClick={() => {
                          const updated = isChosen
                            ? teamState.value.roles.filter((r) => r !== role)
                            : [...teamState.value.roles, role];
                          teamState.save({ ...teamState.value, roles: updated });
                        }}
                      >
                        {role}
                        {isChosen ? <Check size={17} /> : <Plus size={17} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className="team-plan">
                <span className="eyebrow">YOUR TEAM BRIEF</span>
                <h2>{teamState.value.name || 'The next what if.'}</h2>

                {teamState.value.roles.length > 0 ? (
                  <ul>
                    {teamState.value.roles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Select the skills you want to bring together.</p>
                )}

                <p>
                  Next: share the problem with a campus club, lab or workshop community. Ask for
                  interest in a small first milestone.
                </p>

                <button
                  className="action"
                  onClick={() => {
                    const textContent = `${teamState.value.name || 'Team brief'}\n\nSkills: ${teamState.value.roles.join(', ')}\n\nFirst conversation: What problem do we want to solve? What can we test this week?`;
                    const blob = new Blob([textContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'studos-team-brief.txt';
                    link.click();
                    URL.revokeObjectURL(url);
                    setStatusMessage('Team brief downloaded.');
                  }}
                >
                  Download team brief <Download size={17} />
                </button>

                <p role="status">{statusMessage || teamState.error}</p>
              </aside>
            </div>
          </>
        )}

        {/* Projects View */}
        {view === 'projects' && (
          <>
            <div className="demo-banner">
              <p>Your portfolio drafts stay on this device. Include evidence you have permission to share.</p>
            </div>

            <div className="planner">
              <form
                className="project-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  projectsState.save([
                    ...projectsState.value,
                    {
                      name: String(formData.get('name') || ''),
                      problem: String(formData.get('problem') || ''),
                      contribution: String(formData.get('contribution') || ''),
                      tech: String(formData.get('tech') || ''),
                      url: String(formData.get('url') || ''),
                      results: String(formData.get('results') || '')
                    }
                  ]);
                  e.currentTarget.reset();
                  setStatusMessage('Project added to your portfolio on this device.');
                }}
              >
                <h2>Document something you built.</h2>

                {[
                  ['name', 'Project name', 'text'],
                  ['problem', 'Problem being solved', 'text'],
                  ['contribution', 'Your contribution', 'text'],
                  ['tech', 'Technologies or methods', 'text'],
                  ['url', 'Demo or repository URL (optional)', 'url'],
                  ['results', 'Evidence, limitations or lessons learned', 'text']
                ].map(([fieldName, label, inputType]) => (
                  <label className="form-label" key={fieldName}>
                    {label}
                    <input
                      name={fieldName}
                      type={inputType}
                      required={fieldName !== 'url'}
                      maxLength={600}
                      placeholder={fieldName === 'url' ? 'https://…' : ''}
                    />
                  </label>
                ))}

                <button className="action" type="submit">
                  Save project <Plus size={17} />
                </button>

                <p role="status">{statusMessage || projectsState.error}</p>
              </form>

              <div>
                <span className="eyebrow">YOUR WORK / {projectsState.value.length} PROJECTS</span>

                {!projectsState.value.length && (
                  <div className="empty">
                    <h3>Your story starts here.</h3>
                    <p>
                      Add a project, experiment, contribution or thoughtful reflection on an attempt
                      that didn&apos;t work.
                    </p>
                  </div>
                )}

                {projectsState.value.map((proj, idx) => (
                  <article className="saved-project" key={idx}>
                    <button
                      className="icon-btn"
                      aria-label={`Delete ${proj.name}`}
                      onClick={() =>
                        projectsState.save(projectsState.value.filter((_, i) => i !== idx))
                      }
                    >
                      <Trash2 size={17} />
                    </button>
                    <h2>{proj.name}</h2>
                    <p>{proj.problem}</p>
                    <dl>
                      <dt>Your contribution</dt>
                      <dd>{proj.contribution}</dd>
                      <dt>Technologies / methods</dt>
                      <dd>{proj.tech}</dd>
                      <dt>Evidence / lessons</dt>
                      <dd>{proj.results}</dd>
                    </dl>
                    {/^https?:\/\//.test(proj.url) && (
                      <a className="text-link" href={proj.url} target="_blank" rel="noreferrer">
                        View work <ArrowRight size={16} />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Resources View */}
        {view === 'resources' && (
          <>
            <div className="op-grid">
              {RESOURCES.map((r) => (
                <a className="op-card resource" href={r.url} target="_blank" rel="noreferrer" key={r.name}>
                  <span className="eyebrow">{r.name}</span>
                  <h2>{r.title}</h2>
                  <p>{r.text}</p>
                  <span className="text-link">
                    Open official resource <ArrowRight size={17} />
                  </span>
                </a>
              ))}
            </div>

            <div className="resource-note">
              <h2>Prepare before you apply.</h2>
              <p>
                Check official eligibility, location, deadlines and application requirements. Keep a
                concise CV, documented projects and a clear explanation of your contribution.
                Resources are starting points, not a claim that applications are open.
              </p>
            </div>
          </>
        )}

        {activeModalItem && (
          <DetailModal item={activeModalItem} close={() => setActiveModalItem(null)} />
        )}
      </main>
      <Footer />
    </>
  );
}

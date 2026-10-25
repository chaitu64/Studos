'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CodeXml,
  Cpu,
  Minus,
  PenTool,
  Plus,
  Search
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Action from './Action';
import TitleLine from './TitleLine';
import ChapterTransition from './ChapterTransition';
import { OPPORTUNITIES } from '../data/studosData';

function SectionEyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="red">{n}</span>
      <span className="tinyline" />
      {children}
    </div>
  );
}

export default function HomeExperience() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.matchMedia('(max-width: 760px)');
    const sceneElements = Array.from(document.querySelectorAll<HTMLElement>('.scene'));
    const intersectingScenes = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    const animatedOnce = new WeakSet<Element>();

    const targetElements = Array.from(
      document.querySelectorAll(
        '.title-line-inner, .benefits > div, .stages article, .project-tile, .event-list > a, .node, .pathway > span, .quote-section blockquote, .chapter .section-top, .closing > .action'
      )
    );

    let rafId = 0;
    let maxScroll = 1;

    const updateMaxScroll = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      triggerScrollCalc();
    };

    const runScrollCalc = () => {
      rafId = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      root.style.setProperty('--progress', String(progress));

      if (!reducedMotion.matches) {
        intersectingScenes.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const val = Math.max(-1, Math.min(1, -rect.top / window.innerHeight));
          el.style.setProperty('--scene', String(val));
        });
      }
    };

    function triggerScrollCalc() {
      if (!rafId) {
        rafId = requestAnimationFrame(runScrollCalc);
      }
    }

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            intersectingScenes.add(el);
          } else {
            intersectingScenes.delete(el);
          }
        });
        triggerScrollCalc();
      },
      { rootMargin: '100px 0px' }
    );

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('in-view');
            if (el.dataset.chapter) {
              root.dataset.chapter = el.dataset.chapter;
            }
          }
        });
      },
      { threshold: 0.16 }
    );

    const entranceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animatedOnce.has(entry.target) || reducedMotion.matches) {
            return;
          }
          animatedOnce.add(entry.target);
          entranceObserver.unobserve(entry.target);

          const target = entry.target as HTMLElement;
          const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
          const isTitleLine = target.classList.contains('title-line-inner');
          const order = isTitleLine
            ? Number(target.style.getPropertyValue('--order') || 0)
            : Math.max(0, siblings.indexOf(target));
          const offset = isMobile.matches ? 12 : isTitleLine ? 38 : 24;

          const anim = target.animate(
            [
              { opacity: isTitleLine ? 0.2 : 0, transform: `translate3d(0, ${offset}px, 0)` },
              { opacity: 1, transform: 'translate3d(0, 0, 0)' }
            ],
            {
              duration: isMobile.matches ? 420 : isTitleLine ? 850 : 650,
              delay: Math.min(order, 4) * (isMobile.matches ? 35 : 80),
              easing: 'cubic-bezier(.16, 1, .3, 1)',
              fill: 'backwards'
            }
          );

          animations.add(anim);
          anim.onfinish = () => {
            animations.delete(anim);
            anim.cancel();
          };
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -28px 0px' }
    );

    sceneElements.forEach((el) => sceneObserver.observe(el));
    document.querySelectorAll('[data-chapter]').forEach((el) => chapterObserver.observe(el));
    targetElements.forEach((el) => entranceObserver.observe(el));

    const resizeObserver = new ResizeObserver(updateMaxScroll);
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', triggerScrollCalc, { passive: true });
    window.addEventListener('resize', updateMaxScroll, { passive: true });
    updateMaxScroll();

    return () => {
      sceneObserver.disconnect();
      chapterObserver.disconnect();
      entranceObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', triggerScrollCalc);
      window.removeEventListener('resize', updateMaxScroll);
      cancelAnimationFrame(rafId);
      animations.forEach((a) => a.cancel());
      root.style.removeProperty('--progress');
      delete root.dataset.chapter;
    };
  }, []);

  const eventListings = OPPORTUNITIES.filter((item) =>
    ['Workshops', 'Summits'].includes(item.category)
  );

  const faqItems = [
    [
      'Do I need to know how to code?',
      'No. Research, design, hardware, communication and understanding people are all valuable. Start with a problem and learn the skills it needs.'
    ],
    [
      'Are these real opportunities?',
      'The opportunity briefs are clearly labelled demo data. No live application feed is connected. Career resources link to official organizations; check their current requirements directly.'
    ],
    [
      'Do I have to build a startup?',
      'No. Explore a field, conduct an experiment, contribute to an existing project or build something small. Choose the path that matters to you.'
    ],
    [
      'How do I take the first step?',
      'Open an opportunity brief, write down one question, or create a small project plan in the Idea hub. Your portfolio and team plans can be saved on this device.'
    ]
  ];

  return (
    <>
      <Header />
      <div className="reading-progress" />
      <main id="main">
        {/* Hero Section */}
        <section className="hero scene" data-chapter="00">
          <div className="hero-index">
            <span>
              <i className="status-dot" /> THE STUDENT OPERATING SYSTEM
            </span>
            <span>EST. FOR YOUR NEXT CHAPTER</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">LESS WAITING. MORE BECOMING.</p>
            <TitleLine level={1}>
              YOUR FUTURE
              <br />
              IS NOT A
              <br />
              <em>SYLLABUS.</em>
              <span className="headline-star" aria-hidden="true">
                ✳
              </span>
            </TitleLine>

            <div className="hero-bottom">
              <p>
                Discover opportunities. Build real skills.
                <br />
                Turn what you imagine into something that exists.
              </p>
              <div className="actions">
                <Action href="/opportunities">Explore opportunities</Action>
                <Action href="/ideas" secondary>
                  Start building
                </Action>
              </div>
            </div>
          </div>

          <div className="hero-side" aria-hidden="true">
            <span>YOUR POTENTIAL IS THE STARTING POINT</span>
            <span>00 — ∞</span>
          </div>

          <div className="hero-floor">
            <a href="#discovery">
              <ArrowDown size={15} /> SCROLL TO DISCOVER
            </a>
            <span>AN INVITATION TO DO SOMETHING THAT MATTERS</span>
            <span>01 / 08</span>
          </div>
        </section>

        {/* Narrative Strip */}
        <div className="narrative-strip">
          <span>POTENTIAL</span>
          <ArrowRight />
          <span>DISCOVERY</span>
          <ArrowRight />
          <span>EXPERIENCE</span>
          <ArrowRight />
          <span>CREATION</span>
          <ArrowRight />
          <span>IMPACT</span>
        </div>

        {/* Chapter 01: Time & Potential */}
        <section id="discovery" className="chapter time scene" data-chapter="01">
          <div className="section-top">
            <SectionEyebrow n="01">THE ONLY RESOURCE YOU CAN&apos;T GET BACK</SectionEyebrow>
            <span>TIME / POTENTIAL</span>
          </div>

          <div className="time-layout">
            <div className="time-counter" aria-hidden="true">
              <span>NOW</span>
              <span>IS A GOOD</span>
              <em>TIME.</em>
              <div className="ruler">I &nbsp; I &nbsp; I &nbsp; I &nbsp; I &nbsp; I &nbsp; I &nbsp; I &nbsp; I</div>
            </div>

            <div className="time-copy">
              <TitleLine>
                TIME WILL PASS.
                <br />
                WHAT YOU BUILD
                <br />
                IS <em>UP TO YOU.</em>
              </TitleLine>
              <p>
                Your college years can be more than semesters and examinations. They can become the
                years in which you discover what you are capable of creating.
              </p>
              <p>
                You don&apos;t need a startup. You don&apos;t need it all figured out. You just need a
                place to begin.
              </p>
              <a className="text-link" href="#hackathons">
                Find your starting point <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <div className="chapter-note">
            <span>THE FIRST STEP IS CURIOSITY.</span>
            <span>THE NEXT ONE IS YOURS.</span>
          </div>
        </section>

        <ChapterTransition number="02" title="DISCOVER." from="POTENTIAL" to="DISCOVERY" />

        {/* Chapter 02: Hackathons */}
        <section className="chapter hack scene" id="hackathons" data-chapter="02">
          <div className="section-top">
            <SectionEyebrow n="02">DISCOVERY THROUGH DOING</SectionEyebrow>
            <span>HACKATHONS</span>
          </div>

          <div className="split-heading">
            <TitleLine>
              48 HOURS.
              <br />
              A DIFFERENT
              <br />
              <em>WAY OF THINKING.</em>
            </TitleLine>
            <div>
              <p>
                A hackathon asks you to turn an idea into a working demonstration. Collaborate under
                pressure, test assumptions, and explain your solution to others.
              </p>
              <Action href="/opportunities?category=Hackathons">Explore hackathons</Action>
            </div>
          </div>

          <div className="benefits">
            {[
              'Rapid prototyping',
              'Teamwork under constraints',
              'Experimentation over assumptions',
              'A project you can actually show'
            ].map((benefit, i) => (
              <div key={benefit}>
                <span>0{i + 1}</span>
                <h3>{benefit}</h3>
                <ArrowUpRight size={21} />
              </div>
            ))}
          </div>

          <div className="editorial-card">
            <div>
              <span className="badge">DEMO DATA</span>
              <h3>
                Build for a<br />
                better campus.
              </h3>
              <p>48 hours · In person · Example event</p>
            </div>
            <div>
              <p>
                Start with a problem you see every day. Finish with something you can put in
                someone&apos;s hands.
              </p>
              <Link href="/opportunities?category=Hackathons">
                Open the example brief <ArrowUpRight size={18} />
              </Link>
            </div>
            <span className="card-watermark" aria-hidden="true">
              48<span>H</span>
            </span>
          </div>
        </section>

        {/* Chapter 03: Internships */}
        <section className="chapter internship" data-chapter="03">
          <div className="section-top">
            <SectionEyebrow n="03">EXPOSURE BECOMES EXPERIENCE</SectionEyebrow>
            <span>INTERNSHIPS</span>
          </div>

          <div className="intern-grid">
            <div className="sticky-copy">
              <TitleLine>
                KNOWING
                <br />
                IS GOOD.
                <br />
                <em>APPLYING IT</em>
                <br />
                IS DIFFERENT.
              </TitleLine>
              <p>
                Step into real workflows. Understand how teams make decisions, deliver work, and learn
                together.
              </p>
              <Action href="/opportunities?category=Internships">Find your internship</Action>
            </div>

            <div className="stack">
              {[
                ['01', 'See how work happens.', 'Experience engineering and business workflows, code reviews and professional expectations.'],
                ['02', 'Find your direction.', 'Explore a career path before graduation. Discover the work that makes you curious.'],
                ['03', 'Build evidence.', 'Develop practical skills and document your contribution, with your organization’s permission.']
              ].map(([num, heading, copy]) => (
                <article key={num}>
                  <span className="red">{num} /</span>
                  <h3>{heading}</h3>
                  <p>{copy}</p>
                </article>
              ))}

              <article className="mini-op">
                <span className="badge">DEMO DATA</span>
                <h3>
                  Frontend engineering intern <ArrowUpRight />
                </h3>
                <p>Example product studio · Remote · 8–12 weeks</p>
                <div className="tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Accessibility</span>
                </div>
                <Link className="text-link" href="/opportunities?category=Internships">
                  View eligibility &amp; example brief <ArrowRight size={16} />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Chapter 04: Research */}
        <section className="chapter research scene" data-chapter="04">
          <div className="section-top">
            <SectionEyebrow n="04">CURIOSITY, WITH A METHOD</SectionEyebrow>
            <span>RESEARCH</span>
          </div>

          <div className="research-center">
            <span className="research-symbol" aria-hidden="true">
              ?
            </span>
            <TitleLine>
              THE NEXT BREAKTHROUGH
              <br />
              BEGINS WITH <em>A QUESTION.</em>
            </TitleLine>
            <p>
              Investigate the unanswered. Work with datasets, methods and evidence. Learn to validate
              what you think you know.
            </p>
            <div className="pathway">
              {['Question', 'Investigate', 'Experiment', 'Validate', 'Share'].map((step, i) => (
                <span key={step}>
                  <small>0{i + 1}</small>
                  {step}
                  {i < 4 && <ArrowRight size={16} />}
                </span>
              ))}
            </div>
            <p className="small-copy">
              A paper isn&apos;t the only outcome. Learning to investigate a question carefully is
              valuable in itself.
            </p>
            <Action href="/opportunities?category=Research">Discover research opportunities</Action>
          </div>
        </section>

        <ChapterTransition number="05" title="MAKE IT REAL." from="CURIOSITY" to="CREATION" />

        {/* Chapter 05: Startup / Ideas */}
        <section className="chapter startup scene" data-chapter="05">
          <div className="section-top">
            <SectionEyebrow n="05">FROM WHAT IF TO WHAT&apos;S NEXT</SectionEyebrow>
            <span>IDEAS → PRODUCTS</span>
          </div>

          <p className="giant-ghost" aria-hidden="true">
            WHAT IF?
          </p>

          <div className="startup-title">
            <TitleLine>
              STOP WAITING
              <br />
              FOR THE
              <br />
              <em>PERFECT IDEA.</em>
            </TitleLine>
            <p>
              Find a problem worth solving. Build the smallest useful solution. Test it with real
              people. Improve it until it matters.
            </p>
          </div>

          <div className="stages">
            {[
              ['Discover', 'Find a problem people genuinely experience.'],
              ['Build', 'Create an initial hardware prototype, software MVP or AI tool.'],
              ['Validate', 'Talk to users. Test assumptions. Learn from feedback.'],
              ['Launch', 'Document progress, find collaborators and explore support.']
            ].map(([title, desc], idx) => (
              <article key={title}>
                <span>0{idx + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="actions">
            <Action href="/ideas">Find your idea</Action>
            <Action href="/projects" secondary>
              Build with StudOs
            </Action>
          </div>

          <p className="small-copy">
            An idea is a starting point. Real demand still needs to be validated.
          </p>
        </section>

        {/* Quote Section */}
        <section className="quote-section" data-chapter="05">
          <span className="quote-mark">“</span>
          <blockquote>
            Make something
            <br />
            people <em>want.</em>
          </blockquote>
          <a
            href="https://www.ycombinator.com/companies/y-combinator"
            target="_blank"
            rel="noreferrer"
          >
            Y COMBINATOR · ORGANIZATIONAL MOTTO <ArrowUpRight size={15} />
          </a>
        </section>

        {/* Chapter 06: Workshops & Summits */}
        <section className="chapter events" data-chapter="06">
          <div className="section-top">
            <SectionEyebrow n="06">ENTER NEW ROOMS</SectionEyebrow>
            <span>WORKSHOPS &amp; SUMMITS</span>
          </div>

          <div className="split-heading">
            <TitleLine>
              IT MIGHT BEGIN
              <br />
              WITH A
              <br />
              <em>CONVERSATION.</em>
            </TitleLine>
            <div>
              <p>
                Meet people asking different questions. Learn emerging technologies, discover
                collaborators, and practice making your ideas understood.
              </p>
              <Action href="/opportunities?category=Workshops">Explore workshops &amp; summits</Action>
            </div>
          </div>

          <div className="event-list">
            {eventListings.map((item, idx) => (
              <Link href={`/opportunities?category=${encodeURIComponent(item.category)}`} key={item.id}>
                <span className="event-no">0{idx + 1}</span>
                <div>
                  <span className="eyebrow">
                    {item.category} <span className="badge">DEMO DATA</span>
                  </span>
                  <h3>{item.title}</h3>
                  <p>
                    {item.format} · {item.duration} · No active registration
                  </p>
                </div>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </section>

        {/* Chapter 07: Projects / Showcase */}
        <section className="chapter projects" data-chapter="07">
          <div className="section-top">
            <SectionEyebrow n="07">MAKE YOUR WORK VISIBLE</SectionEyebrow>
            <span>PROOF OVER PROMISES</span>
          </div>

          <div className="split-heading">
            <TitleLine>
              DON&apos;T JUST
              <br />
              LIST YOUR SKILLS.
              <br />
              <em>SHOW THEM.</em>
            </TitleLine>
            <div>
              <p>
                A prototype. An experiment. An open-source contribution. Even an unsuccessful attempt,
                thoughtfully documented. Let your work tell the story.
              </p>
              <Action href="/projects">Build your portfolio</Action>
            </div>
          </div>

          <div className="project-grid">
            <Link href="/projects" className="project-tile">
              <div className="project-visual">
                <CodeXml size={54} strokeWidth={0.7} />
                <span>CAMPUS / LOOP</span>
                <small>01 — SOFTWARE CONCEPT</small>
              </div>
              <div className="project-caption">
                <h3>Campus Loop</h3>
                <ArrowUpRight />
              </div>
              <p>
                Reimagining how students borrow and reuse.{' '}
                <span className="badge">EXAMPLE PROJECT</span>
              </p>
            </Link>

            <Link href="/projects" className="project-tile">
              <div className="project-visual hardware">
                <Cpu size={54} strokeWidth={0.7} />
                <span>QUIET / CURRENT</span>
                <small>02 — HARDWARE CONCEPT</small>
              </div>
              <div className="project-caption">
                <h3>Quiet Current</h3>
                <ArrowUpRight />
              </div>
              <p>
                Making energy patterns easier to understand.{' '}
                <span className="badge">EXAMPLE PROJECT</span>
              </p>
            </Link>
          </div>
        </section>

        <ChapterTransition number="08" title="TOGETHER." from="YOUR WORK" to="SHARED IMPACT" />

        {/* Chapter 08: Team & Collaboration */}
        <section className="chapter team scene" data-chapter="08">
          <div className="section-top">
            <SectionEyebrow n="08">DIFFERENT MINDS. SHARED POSSIBILITY.</SectionEyebrow>
            <span>COLLABORATION → IMPACT</span>
          </div>

          <div className="team-grid">
            <div>
              <TitleLine>
                YOU DON&apos;T
                <br />
                HAVE TO
                <br />
                <em>BUILD ALONE.</em>
              </TitleLine>
              <p>
                Find people who see what you don&apos;t. Bring complementary skills to a problem you
                all care about.
              </p>
              <Action href="/teams">Find your people</Action>
            </div>

            <div className="constellation">
              <div className="constellation-core">
                ONE SHARED
                <br />
                <strong>WHAT IF?</strong>
              </div>

              {[
                { icon: Search, label: 'Researcher', className: 'node-0' },
                { icon: CodeXml, label: 'Developer', className: 'node-1' },
                { icon: Cpu, label: 'Hardware builder', className: 'node-2' },
                { icon: PenTool, label: 'Designer', className: 'node-3' },
                { icon: ArrowUpRight, label: 'Customer thinker', className: 'node-4' }
              ].map(({ icon: Icon, label, className }) => (
                <Link href="/teams" className={`node ${className}`} key={label}>
                  <Icon size={17} />
                  {label}
                </Link>
              ))}

              <span className="constellation-note">
                EXAMPLE ROLES · YOUR TEAM CAN LOOK DIFFERENT
              </span>
            </div>
          </div>
        </section>

        {/* Questions / FAQ */}
        <section className="chapter questions" data-chapter="08">
          <div>
            <SectionEyebrow n="?">BEFORE YOU BEGIN</SectionEyebrow>
            <TitleLine>
              YOUR QUESTIONS.
              <br />
              <em>A PLACE TO START.</em>
            </TitleLine>
          </div>

          <div>
            {faqItems.map(([question, answer], idx) => {
              const isExpanded = activeFaq === idx;
              return (
                <div className="faq" key={question}>
                  <button
                    onClick={() => setActiveFaq(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-${idx}`}
                  >
                    {question}
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  {isExpanded && <p id={`faq-${idx}`}>{answer}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing Section */}
        <section className="closing">
          <span className="eyebrow">THIS IS WHERE THE NEXT CHAPTER BEGINS.</span>
          <TitleLine>
            LESS <span>WHAT IF.</span>
            <br />
            MORE <em>LET&apos;S GO.</em>
          </TitleLine>
          <Action href="/opportunities">Find your next opportunity</Action>
          <p>No perfect plan required. Just a little curiosity.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

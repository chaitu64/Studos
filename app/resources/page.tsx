"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ResourceHeader } from '@/components/resources/ResourceHeader';
import { AcademicSelector } from '@/components/resources/AcademicSelector';
import { SubjectList } from '@/components/resources/SubjectList';
import { RecentResources } from '@/components/resources/RecentResources';
import { Subject, Resource } from '@/types/resource';
import { PlusCircle, Sparkles, Upload, FileText, CheckCircle2, X, BookOpen, ShieldCheck, Users, Zap } from 'lucide-react';

export default function ResourcesPage() {
  const [year, setYear] = useState('3rd Year');
  const [branch, setBranch] = useState('AIML');
  const [semester, setSemester] = useState('Semester 1');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState('VALIDATING RESOURCE...');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subjectCode: '',
    type: 'Notes',
    driveLink: '',
    authorName: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const subjectsRes = await fetch(
          `/api/resources/subjects?branch=${branch}&year=${year}&semester=${semester}`
        );

        if (!subjectsRes.ok) throw new Error('Failed to fetch subjects');

        const subjectsData: Subject[] = await subjectsRes.json();
        setSubjects(subjectsData);

        // Simulated recent high-demand resources
        const sampleRecent: Resource[] = [
          {
            id: 'res_10',
            title: 'Data Structures Unit 1 & 2 Complete Handwritten Notes',
            type: 'Notes',
            subjectId: 'subj_201',
            branch: 'AIML',
            year: '2nd Year',
            semester: 'Semester 1',
            format: 'PDF',
            url: '#',
            updatedAt: '2026-09-12',
            views: 1420
          },
          {
            id: 'res_12',
            title: 'DSA Lab Practical Manual & Master Viva Cheat Sheet',
            type: 'Practical/Viva',
            subjectId: 'subj_201',
            branch: 'AIML',
            year: '2nd Year',
            semester: 'Semester 1',
            format: 'PDF',
            url: '#',
            updatedAt: '2026-09-10',
            views: 980
          },
          {
            id: 'res_5',
            title: 'Machine Learning End-Semester Question Papers (2023-2025 Solved)',
            type: 'Previous Papers',
            subjectId: 'subj_301',
            branch: 'AIML',
            year: '3rd Year',
            semester: 'Semester 1',
            format: 'PDF',
            url: '#',
            updatedAt: '2026-09-08',
            views: 2840
          },
          {
            id: 'res_8',
            title: 'Deep Learning & CNN Lab Manual with PyTorch Code Examples',
            type: 'Lab Manuals',
            subjectId: 'subj_304',
            branch: 'AIML',
            year: '3rd Year',
            semester: 'Semester 2',
            format: 'PDF',
            url: '#',
            updatedAt: '2026-08-28',
            views: 630
          }
        ];
        setRecentResources(sampleRecent);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branch, year, semester]);

  // Client-side search filtering
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects;
    const query = searchQuery.toLowerCase();
    return subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.code.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }, [subjects, searchQuery]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadPhase('SCANNING ACADEMIC FILE STRUCTURE...');

    setTimeout(() => {
      setUploadPhase('VERIFYING ACADEMIC CREDENTIALS & INDEX...');
    }, 450);

    setTimeout(() => {
      setUploadPhase('COMMITTING TO VAULT REPOSITORY...');
    }, 900);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadForm({
          title: '',
          subjectCode: '',
          type: 'Notes',
          driveLink: '',
          authorName: ''
        });
      }, 2200);
    }, 1350);
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[450px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with Search and Tag Filters */}
      <ResourceHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTag={selectedTag}
        onTagClick={setSelectedTag}
      />

      {/* Academic Filter Pill Bar */}
      <AcademicSelector
        year={year}
        setYear={setYear}
        branch={branch}
        setBranch={setBranch}
        semester={semester}
        setSemester={setSemester}
      />

      <main className="container-s pb-24 relative z-10 pt-4">
        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
              <FileText size={16} />
            </div>
            <div>
              <div className="text-sm font-black text-white">1,400+</div>
              <div className="text-[11px] text-slate-400">Verified PDFs & Notes</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-sm font-black text-white">100% Peer Vetted</div>
              <div className="text-[11px] text-slate-400">Quality Assured</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
              <Users size={16} />
            </div>
            <div>
              <div className="text-sm font-black text-white">6 Branches</div>
              <div className="text-[11px] text-slate-400">All Semesters Covered</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </div>
            <div>
              <div className="text-sm font-black text-white">Free & Fast</div>
              <div className="text-[11px] text-slate-400">No Paywalls, Ever</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-12">
            <div className="h-8 w-48 bg-white/[0.04] rounded-lg animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 border border-white/10 rounded-2xl bg-white/[0.02] animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="py-16 text-center border border-rose-500/30 rounded-3xl bg-rose-500/5 mt-8 p-8">
            <p className="text-rose-400 font-bold mb-4">
              Couldn&apos;t load resources for {branch} {year} {semester}.
            </p>
            <button
              onClick={() => setYear(year)}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Subject List */}
            <SubjectList
              subjects={filteredSubjects}
              year={year}
              branch={branch}
              semester={semester}
              searchQuery={searchQuery}
            />

            {/* Recently Uploaded Resources */}
            <RecentResources resources={recentResources} />
          </>
        )}

        {/* Community Contribution Callout */}
        <div className="mt-14 relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0e122b] to-cyan-950/30 p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl mx-auto text-center relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
              <Upload size={22} className="text-purple-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Have Notes, Lab Solutions, or Past Papers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 mb-6 leading-relaxed">
              Help your university peers ace their mid-terms and finals. Share your clean handwritten notes, question paper solutions, or viva cheatsheets.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="cyber-btn-interactive inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <PlusCircle size={16} />
              <span>Contribute a Resource</span>
            </button>
          </div>
        </div>

        {/* Modal: Contribute Resource */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="cyber-hud-card relative w-full max-w-lg rounded-3xl border border-purple-500/40 bg-[#0d1127]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 animate-scale-in">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              {isUploading ? (
                <div className="py-10 text-center space-y-5 animate-scale-in">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400 text-purple-300 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30 animate-pulse">
                    <Upload size={30} className="animate-bounce" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-white tracking-wide">
                      Verifying Academic Contribution
                    </h4>
                    <p className="text-xs font-mono text-purple-300">
                      {uploadPhase}
                    </p>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/15 laser-progress-bar">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full w-3/4 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Validating cryptographic integrity & academic subject mapping...
                  </p>
                </div>
              ) : uploadSuccess ? (
                <div className="py-8 text-center space-y-4 animate-pop-burst">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold mb-2">
                      SUBMISSION VERIFIED
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      Resource Successfully Submitted!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                      Your contribution has been indexed and sent for peer verification. Thank you for empowering your peers across campus!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={18} className="text-purple-400" />
                    <h3 className="text-lg font-black text-white">
                      Contribute Academic Material
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-5">
                    Share helpful notes, solved PYQs, or lab manuals with fellow students.
                  </p>

                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Resource Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Data Structures Unit 2 Notes (Handwritten)"
                        value={uploadForm.title}
                        onChange={(e) =>
                          setUploadForm({ ...uploadForm, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Subject Code / Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. CS201 / Operating Systems"
                          value={uploadForm.subjectCode}
                          onChange={(e) =>
                            setUploadForm({
                              ...uploadForm,
                              subjectCode: e.target.value
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Resource Type
                        </label>
                        <select
                          value={uploadForm.type}
                          onChange={(e) =>
                            setUploadForm({ ...uploadForm, type: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#131733] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500/50"
                        >
                          <option value="Notes">Lecture / Handwritten Notes</option>
                          <option value="Previous Papers">Previous Year Papers</option>
                          <option value="Lab Manuals">Lab Manual / Code</option>
                          <option value="Important Questions">Important Questions</option>
                          <option value="Syllabus">Syllabus Copy</option>
                          <option value="Other">Other Reference</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Google Drive or File Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/file/d/..."
                        value={uploadForm.driveLink}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            driveLink: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Name / Credit (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sivan / Anonymous"
                        value={uploadForm.authorName}
                        onChange={(e) =>
                          setUploadForm({
                            ...uploadForm,
                            authorName: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowUploadModal(false)}
                        className="cyber-btn-interactive px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="cyber-btn-interactive px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/30"
                      >
                        Submit Resource
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

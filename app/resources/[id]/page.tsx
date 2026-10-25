"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Subject, Resource, ResourceType } from '@/types/resource';
import { ArrowLeft, FileText, Link2, ExternalLink, Download, Search, Filter } from 'lucide-react';

const resourceTypes: ResourceType[] = [
  'Syllabus', 'Notes', 'Previous Papers', 'Important Questions',
  'Lab Manuals', 'Assignments', 'Reference Books', 'Question Banks', 'Practical/Viva', 'Other'
];

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = typeof params?.id === 'string' ? params.id : '';
  const [subject, setSubject] = useState<Subject | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ResourceType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!subjectId) return;
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [subjectRes, resourcesRes] = await Promise.all([
          fetch(`/api/resources/subjects/${subjectId}`),
          fetch(`/api/resources/${subjectId}`)
        ]);

        if (!subjectRes.ok) throw new Error('Subject fetch failed');

        const subjectData = await subjectRes.json();
        setSubject(subjectData);

        if (resourcesRes.ok) {
          const resourcesData = await resourcesRes.json();
          setResources(resourcesData);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchType = activeFilter === 'All' || r.type === activeFilter;
      const matchQuery = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.format.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.unit && r.unit.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchQuery;
    });
  }, [resources, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A1E] p-6 text-white relative overflow-hidden">
        <div className="container-s max-w-5xl">
          <div className="h-4 w-28 bg-white/10 rounded mb-4 animate-pulse" />
          <div className="h-8 w-64 bg-white/10 rounded mb-2 animate-pulse" />
          <div className="h-4 w-48 bg-white/10 rounded mb-8 animate-pulse" />
          <div className="h-64 card-cosmic animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="min-h-screen bg-[#070A1E] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="text-center card-cosmic p-8 max-w-md">
          <h2 className="text-lg font-bold text-white mb-2">Subject Not Found</h2>
          <p className="text-slate-400 text-xs mb-6">Could not load academic materials for this subject code.</p>
          <Link href="/resources" className="btn-pill-white">
            <ArrowLeft size={14} /> Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A1E] text-slate-100 pb-20 relative overflow-hidden">
      {/* Background ambient cosmic glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-s max-w-5xl py-8 relative z-10">

        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/resources" className="hover:text-purple-400 transition-colors flex items-center gap-1 font-medium">
            <ArrowLeft size={12} /> Academic Vault
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{subject.branch}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{subject.semester}</span>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-purple-300">{subject.code}</span>
        </div>

        {/* Header Banner */}
        <div className="card-cosmic p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {subject.code}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {subject.branch} · {subject.year} · {subject.semester}
                </span>
              </div>
              <h1 className="heading-gold text-2xl sm:text-3xl font-extrabold mb-2">{subject.name}</h1>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">{subject.description}</p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-sm font-bold text-white block">
                {resources.length} Verified Files
              </span>
              <span className="text-[11px] text-slate-400">Academic campus repository</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="card-cosmic p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === 'All'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
            >
              All ({resources.length})
            </button>
            {resourceTypes.map((type) => {
              const count = resources.filter((r) => r.type === type).length;
              if (count === 0) return null;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === type
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                >
                  {type} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title or unit..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Clean Cosmic Table of Resources */}
        <div className="card-cosmic overflow-hidden p-0 border border-white/10">
          {filteredResources.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              No materials match your filter criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-white/10">
                  <tr>
                    <th className="px-5 py-3.5">Document Title</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Unit / Module</th>
                    <th className="px-5 py-3.5">Format</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredResources.map((res) => (
                    <tr key={res.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                            <FileText size={14} className="text-purple-400" />
                          </div>
                          <span className="font-semibold text-white">{res.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-purple-300 border border-white/10">
                          {res.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-300 font-medium">
                        {res.unit || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-amber-400 text-[10px] uppercase">
                          {res.format}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-[11px]">
                        {new Date(res.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <a
                          href={res.url}
                          onClick={(e) => e.preventDefault()}
                          className="btn-pill-glass text-[11px] py-1 px-3"
                        >
                          <Download size={12} />
                          <span>View</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

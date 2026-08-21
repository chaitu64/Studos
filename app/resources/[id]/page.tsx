"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Subject, Resource, ResourceType } from '@/types/resource';

const resourceTypes: ResourceType[] = [
  'Syllabus', 'Notes', 'Previous Papers', 'Important Questions',
  'Lab Manuals', 'Assignments', 'Reference Books', 'Question Banks', 'Practical/Viva', 'Other'
];

export default function SubjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [subjectId, setSubjectId] = useState('');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ResourceType | 'All'>('All');

    useEffect(() => {
        params.then(({ id }) => setSubjectId(id));
    }, [params]);

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
      if (activeFilter === 'All') return resources;
      return resources.filter(r => r.type === activeFilter);
  }, [resources, activeFilter]);

  // Group resources by type for the default view
  const groupedResources = useMemo(() => {
      const groups = new Map<string, Resource[]>();
      filteredResources.forEach(res => {
          if (!groups.has(res.type)) {
              groups.set(res.type, []);
          }
          groups.get(res.type)!.push(res);
      });
      return groups;
  }, [filteredResources]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-12 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-12"></div>

          <div className="flex gap-2 mb-8">
             {[1, 2, 3, 4].map(i => <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>)}
          </div>

           <div className="space-y-4">
               {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-900 rounded-lg"></div>)}
           </div>
        </div>
      </div>
    );
  }

  if (error || !subject) {
      return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-4">
             <div className="text-center">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subject not found</h2>
                 <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't load the resources for this subject.</p>
                 <Link href="/resources" className="text-indigo-600 hover:underline font-medium">← Back to Resources</Link>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200/80 dark:border-gray-800 py-8">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <Link href="/resources" className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to {subject.semester}
              </Link>

              <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{subject.name}</h1>
                 <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2.5 py-1 rounded">
                     {subject.code}
                 </span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                  {subject.year} &middot; {subject.branch} &middot; {subject.semester}
              </p>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{subject.description}</p>
          </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 md:px-6 mt-8">
          {/* Filters */}
          <div className="flex overflow-x-auto scrollbar-hide py-2 mb-8 gap-2 border-b border-gray-200 dark:border-gray-800">
              <button
                 onClick={() => setActiveFilter('All')}
                 className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors mb-2 ${
                     activeFilter === 'All'
                     ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                 }`}
              >
                  All Resources ({resources.length})
              </button>
              {resourceTypes.map(type => {
                  const count = resources.filter(r => r.type === type).length;
                  if (count === 0) return null;

                  return (
                      <button
                         key={type}
                         onClick={() => setActiveFilter(type)}
                         className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors mb-2 ${
                             activeFilter === type
                             ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                         }`}
                      >
                          {type} ({count})
                      </button>
                  );
              })}
          </div>

          {/* Resource Lists */}
          {resources.length === 0 ? (
               <div className="text-center py-16 border border-gray-200 dark:border-gray-800 border-dashed rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-gray-500 dark:text-gray-400">No resources available for this subject yet.</p>
               </div>
          ) : (
              <div className="space-y-12">
                  {Array.from(groupedResources.entries()).map(([type, items]) => (
                      <div key={type} className="animate-in fade-in duration-300">
                          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                              {type}
                          </h3>

                          <div className="flex flex-col gap-3">
                              {items.map(resource => (
                                  <div key={resource.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950 hover:border-indigo-300 dark:hover:border-indigo-800/60 hover:shadow-sm transition-all group">
                                      <div className="flex items-start gap-4 mb-3 sm:mb-0">
                                           <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                               {resource.format === 'PDF' ? (
                                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                  </svg>
                                               ) : (
                                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                  </svg>
                                               )}
                                           </div>
                                           <div>
                                               <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                   {resource.title}
                                               </h4>
                                               <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 mt-1.5 gap-2">
                                                   {resource.unit && <span>{resource.unit}</span>}
                                                   {resource.unit && <span>•</span>}
                                                   {resource.academicYear && <span>{resource.academicYear}</span>}
                                                   {resource.academicYear && <span>•</span>}
                                                   {resource.examType && <span>{resource.examType}</span>}
                                                   {resource.examType && <span>•</span>}
                                                   <span className="uppercase">{resource.format}</span>
                                               </div>
                                           </div>
                                      </div>

                                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-14 sm:pl-0 gap-2">
                                          <a href={resource.url} onClick={(e) => e.preventDefault()} className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-300 dark:border-gray-700 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                              Open
                                          </a>
                                          {resource.views && (
                                              <span className="text-xs text-gray-400 flex items-center">
                                                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                  </svg>
                                                  {resource.views}
                                              </span>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </main>
    </div>
  );
}

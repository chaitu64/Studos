"use client";

import React, { useState, useEffect } from 'react';
import { ResourceHeader } from '@/components/resources/ResourceHeader';
import { AcademicSelector } from '@/components/resources/AcademicSelector';
import { SubjectList } from '@/components/resources/SubjectList';
import { RecentResources } from '@/components/resources/RecentResources';
import { Subject, Resource } from '@/types/resource';

export default function ResourcesPage() {
  const [year, setYear] = useState('3rd Year');
  const [branch, setBranch] = useState('AIML');
  const [semester, setSemester] = useState('Semester 1');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [subjectsRes, recentRes] = await Promise.all([
          fetch(`/api/resources/subjects?branch=${branch}&year=${year}&semester=${semester}`),
          fetch('/api/resources/search?q=') // Hack for recent, in reality would be a separate endpoint or just done on server
        ]);

        if (!subjectsRes.ok) throw new Error('Failed to fetch');

        const subjectsData = await subjectsRes.json();
        setSubjects(subjectsData);

        // Simulated recent fetch - just grab a few from the mock list in a real app
        // Here we just use a small hardcoded timeout wrapper to simulate a real endpoint if we had one
        const simulatedRecentFetch = async () => {
            const res = await fetch('/api/resources/subjects?branch=AIML&year=3rd Year&semester=Semester 1'); // Just pinging something
            return [
              { id: 'res_10', title: 'Data Structures Unit 1 Notes', type: 'Notes' as any, subjectId: 'subj_201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2026-08-18' },
              { id: 'res_12', title: 'DSA Lab Programs', type: 'Practical/Viva' as any, subjectId: 'subj_201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2026-08-20' }
            ];
        };
        setRecentResources(await simulatedRecentFetch());

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branch, year, semester]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <ResourceHeader />
      <AcademicSelector
        year={year} setYear={setYear}
        branch={branch} setBranch={setBranch}
        semester={semester} setSemester={setSemester}
      />

      <main className="container-s pb-24">
        {loading ? (
             <div className="py-12">
               <div className="h-8 w-48 bg-surface-2 rounded animate-pulse mb-6"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {[1, 2, 3, 4, 5, 6].map(i => (
                       <div key={i} className="h-40 border border-borderline rounded-xl bg-surface animate-pulse"></div>
                   ))}
               </div>
           </div>
        ) : error ? (
             <div className="py-16 text-center border border-error/30 rounded-xl bg-error/5 mt-8">
               <p className="text-error font-medium mb-4">Couldn't load resources.</p>
               <button onClick={() => setYear(year)} className="px-4 py-2 bg-error/10 text-error rounded-lg text-sm font-medium hover:bg-error/20 transition-colors">
                   Try again
               </button>
           </div>
        ) : (
          <>
            <SubjectList subjects={subjects} year={year} branch={branch} semester={semester} />
            <RecentResources resources={recentResources} />
          </>
        )}

        <div className="mt-12 py-8 border-t border-borderline text-center">
           <p className="text-mut text-sm mb-3">Have useful study material?</p>
           <button className="text-accent font-medium text-sm hover:underline">
             Submit a resource
             </button>
        </div>
      </main>
    </div>
  );
}

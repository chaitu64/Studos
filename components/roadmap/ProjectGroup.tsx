'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectRecommendation } from '@/types/roadmap';
import { GitBranch, ArrowRight } from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';

interface ProjectGroupProps {
  projects: ProjectRecommendation[];
}

export function ProjectGroup({ projects }: ProjectGroupProps) {
  return (
    <div className="py-8 border-t border-white/[0.08]">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">Portfolio Building</span>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white">Projects Worth Building</h3>
          <p className="text-xs text-slate-300 mt-0.5">Projects that demonstrate practical problem solving to recruiters.</p>
        </div>
        <Link href="/ideas" className="btn-subtle text-xs px-4 py-2 self-start md:self-auto flex items-center gap-1.5">
          <span>Explore Idea Hub</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <Card3D key={project.id} maxTilt={6} scale={1.015} glare={true} className="cyber-hud-card h-full">
            <div className="holo-scanner-sweep" />
            <article className="glass-card p-6 rounded-2xl border border-white/[0.08] hover:border-indigo-500/40 flex flex-col justify-between group h-full preserve-3d">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 translate-z-20">
                    {project.difficulty}
                  </span>
                  <GitBranch size={16} className="text-slate-400" />
                </div>

                <h4 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {project.title}
                </h4>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-md bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-white/[0.06] pt-4 translate-z-20">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">Impact & Purpose</p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{project.whyBuildIt}</p>

                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-xs text-slate-400">
                  <span>{project.estimatedTime}</span>
                  <span className="text-indigo-300 font-semibold text-[11px]">{project.careerRelevance}</span>
                </div>
              </div>
            </article>
          </Card3D>
        ))}
      </div>
    </div>
  );
}

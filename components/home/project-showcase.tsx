'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

type ProjectCategory = 'All' | 'Web' | 'App' | 'Design';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web' | 'App' | 'Design';
  tag: string;
  imageUrl: string;
  link: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: '1',
    title: 'CampusPulse Analytics',
    subtitle: 'Real-time college portal & analytics engine',
    category: 'Web',
    tag: 'Web Platform',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: '/ideas',
  },
  {
    id: '2',
    title: 'Finance Tracker App',
    subtitle: 'iOS & Android application',
    category: 'App',
    tag: 'Mobile App',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    link: '/ideas',
  },
  {
    id: '3',
    title: 'StudOS Design System',
    subtitle: 'Brand assets, typography & component kit',
    category: 'Design',
    tag: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    link: '/resources',
  },
  {
    id: '4',
    title: 'Telemetry Cloud Dashboard',
    subtitle: 'High-frequency metrics & server visualizer',
    category: 'Web',
    tag: 'Web App',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: '/ideas',
  },
  {
    id: '5',
    title: 'PocketIDE Dev Studio',
    subtitle: 'Mobile code editing & rapid deployment',
    category: 'App',
    tag: 'Mobile App',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    link: '/ideas',
  },
  {
    id: '6',
    title: 'Immersive 3D Motion Art',
    subtitle: 'Motion graphics & creative 3D web shaders',
    category: 'Design',
    tag: 'Creative Suite',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    link: '/resources',
  },
];

const CATEGORIES: ProjectCategory[] = ['All', 'Web', 'App', 'Design'];

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 relative border-t border-white/5 bg-[#06080F]/50 backdrop-blur-[2px] overflow-hidden">

      {/* Ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="container-s relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={13} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Featured Innovations & Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Discover real-world applications, interactive systems, and design projects crafted by students across the network.
          </p>
        </div>

        {/* Category Filter Pills (Exact Match to Reference Screenshot) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                  ${isActive
                    ? 'bg-[#1E74FD] text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Portfolio Grid (6 Cards Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-blue-500/50"
            >
              {/* Background Project Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-95"
                />
              </div>

              {/* Dark Gradient Overlay for Readability (Always visible on card 2, on hover for all) */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent
                  flex flex-col justify-end p-6 transition-opacity duration-300
                  ${idx === 1 ? 'opacity-95' : 'opacity-85 group-hover:opacity-100'}
                `}
              >
                {/* Category Pill Tag */}
                <div className="mb-2.5">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0D6EFD]/80 text-white backdrop-blur-md shadow-sm">
                    {project.tag}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
                  {project.subtitle}
                </p>

                {/* "View Details →" Action Link (Matching Screenshot Card 2) */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </Link>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Ideas & Project Showcase */}
        <div className="mt-14 text-center">
          <Link
            href="/ideas"
            className="btn-pill-white text-xs sm:text-sm py-3 px-7 inline-flex items-center gap-2"
          >
            <span>Explore All Student Projects in Idea Hub</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>

    </section>
  );
}

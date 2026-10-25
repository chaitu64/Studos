'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="header">
        <Link href="/" className="brand" aria-label="StudOs home">
          stud<span>os</span><i></i>
        </Link>
        <nav aria-label="Main navigation" className={isOpen ? 'nav open' : 'nav'}>
          <Link href="/#discovery" onClick={() => setIsOpen(false)}>The experience</Link>
          <Link href="/opportunities" onClick={() => setIsOpen(false)}>Opportunities</Link>
          <Link href="/ideas" onClick={() => setIsOpen(false)}>Idea hub</Link>
          <Link href="/teams" onClick={() => setIsOpen(false)}>Team finder</Link>
          <Link href="/projects" onClick={() => setIsOpen(false)}>Showcase</Link>
          <Link href="/resources" onClick={() => setIsOpen(false)}>Resources</Link>
        </nav>
        <Link href="/opportunities" className="nav-cta">
          Find your next <ArrowUpRight size={14} />
        </Link>
        <button
          className="menu"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
    </>
  );
}

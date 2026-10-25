import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link href="/" className="brand">
          stud<span>os</span><i></i>
        </Link>
        <p>A world beyond your syllabus.</p>
        <a href="#main">Back to top ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StudOs</span>
        <span>For the curious. For the doers. For what comes next.</span>
        <span>Built with intention.</span>
      </div>
    </footer>
  );
}

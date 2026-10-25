import React from 'react';

interface ChapterTransitionProps {
  number: string;
  title: string;
  from: string;
  to: string;
}

export default function ChapterTransition({ number, title, from, to }: ChapterTransitionProps) {
  return (
    <div className="chapter-transition" aria-label={`${from} to ${to}`}>
      <div className="transition-meta">
        <span>{from}</span>
        <span>{number} / THE NEXT CHAPTER</span>
        <span>{to}</span>
      </div>
      <div className="transition-word" aria-hidden="true">
        {title}
        <span>{title}</span>
      </div>
      <div className="transition-rule" aria-hidden="true">
        <i />
      </div>
    </div>
  );
}

'use client';

import { Send, Eye, Handshake, Wrench, Rocket } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: <Send size={14} />,
    title: 'Submit',
    text: 'Tell us what you\u2019re building.',
  },
  {
    n: '02',
    icon: <Eye size={14} />,
    title: 'Review',
    text: 'The StudOS web team reviews your idea.',
  },
  {
    n: '03',
    icon: <Handshake size={14} />,
    title: 'Connect',
    text: 'We help you find teammates, mentors or resources.',
  },
  {
    n: '04',
    icon: <Wrench size={14} />,
    title: 'Build',
    text: 'Turn the idea into a working project.',
  },
  {
    n: '05',
    icon: <Rocket size={14} />,
    title: 'Showcase',
    text: 'Present your project to the student community and beyond.',
  },
];

/**
 * The StudOS idea process — horizontal on desktop with a connecting line,
 * vertical timeline on mobile.
 */
export function HowItWorks() {
  return (
    <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
      {/* desktop connector */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-[21px] hidden border-t border-borderline lg:block"
      />
      {STEPS.map((s, i) => (
        <li key={s.n} className="relative pl-14 lg:pl-0">
          {/* mobile rail segment */}
          {i < STEPS.length - 1 && (
            <span
              aria-hidden
              className="absolute bottom-[-2rem] left-[21px] top-12 w-px border-l border-borderline lg:hidden"
            />
          )}
          <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-borderline bg-surface font-mono text-[13px] text-accent">
            {s.n}
          </span>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-fg">
            {s.title}
            <span className="text-accent">{s.icon}</span>
          </p>
          <p className="mt-1 max-w-[26ch] text-[13px] leading-relaxed text-mut">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

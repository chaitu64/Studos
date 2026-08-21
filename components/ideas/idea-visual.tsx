import type { IdeaVisual } from '@/types/idea';

/**
 * Abstract, technology-oriented project visuals for Idea Hub.
 * Deterministic line-art motifs drawn with StudOS tokens — no stock photos,
 * no decorative blobs. Each idea renders a consistent framed figure.
 */

const ACCENT = 'var(--accent)';
const MUTED = 'var(--muted)';
const BORDER = '#2a2e36';

function Frame({ children, tag }: { children: React.ReactNode; tag: string }) {
  return (
    <svg
      viewBox="0 0 400 180"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={tag}
    >
      <rect width="400" height="180" fill="var(--surface-2)" />
      {/* faint dot grid */}
      {Array.from({ length: 10 }).map((_, r) =>
        Array.from({ length: 21 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 19} cy={9 + r * 18} r="1" fill="#22262d" />
        ))
      )}
      {children}
      {/* figure tag */}
      <text x="14" y="168" fontSize="9" fontFamily="monospace" letterSpacing="2" fill="var(--muted)" opacity="0.7">
        {tag}
      </text>
    </svg>
  );
}

function AiMotif() {
  const l = [
    [70, 55],
    [70, 90],
    [70, 125],
  ];
  const m = [
    [170, 40],
    [170, 75],
    [170, 110],
    [170, 145],
  ];
  const r = [
    [290, 70],
    [290, 115],
  ];
  return (
    <g>
      {l.map(([x, y], i) =>
        m.map(([mx, my], j) => (
          <line key={`a${i}-${j}`} x1={x} y1={y} x2={mx} y2={my} stroke={ACCENT} strokeWidth="1" opacity="0.25" />
        ))
      )}
      {m.map(([x, y], j) =>
        r.map(([rx, ry], k) => (
          <line key={`b${j}-${k}`} x1={x} y1={y} x2={rx} y2={ry} stroke={ACCENT} strokeWidth="1" opacity="0.35" />
        ))
      )}
      {l.map(([x, y], i) => (
        <circle key={`l${i}`} cx={x} cy={y} r="5" fill="var(--surface-2)" stroke={MUTED} strokeWidth="1.5" />
      ))}
      {m.map(([x, y], j) => (
        <circle key={`m${j}`} cx={x} cy={y} r="5" fill="var(--surface-2)" stroke={ACCENT} strokeWidth="1.5" />
      ))}
      {r.map(([x, y], k) => (
        <circle key={`r${k}`} cx={x} cy={y} r="6" fill={ACCENT} opacity="0.9" />
      ))}
    </g>
  );
}

function IotMotif() {
  return (
    <g fill="none" strokeLinecap="round">
      {/* central chip */}
      <rect x="165" y="65" width="70" height="50" rx="6" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      <rect x="185" y="82" width="30" height="16" rx="2" stroke={MUTED} strokeWidth="1" />
      {/* pins */}
      {[78, 92, 106].map((y) => (
        <g key={y}>
          <line x1="150" y1={y} x2="165" y2={y} stroke={MUTED} strokeWidth="1.5" />
          <line x1="235" y1={y} x2="250" y2={y} stroke={MUTED} strokeWidth="1.5" />
        </g>
      ))}
      {/* traces */}
      <path d="M150 78 H120 V45 H70" stroke={ACCENT} strokeWidth="1.25" opacity="0.6" />
      <path d="M150 106 H110 V140 H60" stroke={ACCENT} strokeWidth="1.25" opacity="0.6" />
      <path d="M250 78 H285 V50 H330" stroke={ACCENT} strokeWidth="1.25" opacity="0.6" />
      <path d="M250 106 H300 V135 H340" stroke={ACCENT} strokeWidth="1.25" opacity="0.6" />
      {/* pads */}
      {[
        [70, 45],
        [60, 140],
        [330, 50],
        [340, 135],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      ))}
      {/* signal */}
      <path d="M310 95 q10 -12 20 0" stroke={MUTED} strokeWidth="1.25" opacity="0.8" />
      <path d="M305 88 q15 -18 30 0" stroke={MUTED} strokeWidth="1.25" opacity="0.5" />
    </g>
  );
}

function AgricultureMotif() {
  return (
    <g fill="none" strokeLinecap="round">
      {/* field rows in perspective */}
      <path d="M40 160 L150 100" stroke={BORDER} strokeWidth="1.5" />
      <path d="M130 160 L172 100" stroke={BORDER} strokeWidth="1.5" />
      <path d="M270 160 L228 100" stroke={BORDER} strokeWidth="1.5" />
      <path d="M360 160 L250 100" stroke={BORDER} strokeWidth="1.5" />
      <line x1="20" y1="100" x2="380" y2="100" stroke={BORDER} strokeWidth="1" opacity="0.7" />
      {/* crops */}
      {[
        [90, 138],
        [152, 128],
        [248, 128],
        [308, 140],
      ].map(([x, y]) => (
        <g key={x} stroke={ACCENT} strokeWidth="1.5" opacity="0.85">
          <line x1={x} y1={y} x2={x} y2={y - 16} />
          <path d={`M${x} ${y - 8} q-8 -4 -9 -12`} />
          <path d={`M${x} ${y - 8} q8 -4 9 -12`} />
        </g>
      ))}
      {/* sensor stake */}
      <g stroke={ACCENT} strokeWidth="1.5">
        <line x1="200" y1="98" x2="200" y2="58" />
        <rect x="192" y="48" width="16" height="10" rx="2" fill="var(--surface-2)" />
      </g>
      <path d="M188 42 q12 -12 24 0" stroke={MUTED} strokeWidth="1.25" />
      <path d="M182 34 q18 -18 36 0" stroke={MUTED} strokeWidth="1.25" opacity="0.5" />
    </g>
  );
}

function CampusMotif() {
  return (
    <g fill="none">
      {/* buildings */}
      <rect x="60" y="70" width="55" height="90" stroke={MUTED} strokeWidth="1.5" fill="var(--surface-2)" />
      <rect x="125" y="45" width="70" height="115" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      <rect x="205" y="85" width="50" height="75" stroke={MUTED} strokeWidth="1.5" fill="var(--surface-2)" />
      <rect x="265" y="60" width="65" height="100" stroke={MUTED} strokeWidth="1.5" fill="var(--surface-2)" />
      {/* windows */}
      {[80, 96, 112].map((y) => (
        <rect key={y} x="72" y={y} width="10" height="8" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
      ))}
      {[60, 76, 92, 108, 124].map((y) => (
        <g key={y}>
          <rect x="137" y={y} width="12" height="9" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
          <rect x="157" y={y} width="12" height="9" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
        </g>
      ))}
      {[100, 116, 132].map((y) => (
        <rect key={y} x="216" y={y} width="10" height="8" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
      ))}
      {[78, 94, 110, 126].map((y) => (
        <rect key={y} x="278" y={y} width="11" height="8" stroke={ACCENT} strokeWidth="1" opacity="0.8" />
      ))}
      {/* antenna + signal */}
      <line x1="297" y1="60" x2="297" y2="38" stroke={MUTED} strokeWidth="1.5" />
      <path d="M289 34 q8 -10 16 0" stroke={ACCENT} strokeWidth="1.25" />
      {/* ground */}
      <line x1="40" y1="160" x2="360" y2="160" stroke={BORDER} strokeWidth="1.5" />
    </g>
  );
}

function WebMotif() {
  return (
    <g fill="none">
      <rect x="80" y="40" width="240" height="105" rx="8" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      <line x1="80" y1="64" x2="320" y2="64" stroke={BORDER} strokeWidth="1.5" />
      {[
        [96, 52],
        [112, 52],
        [128, 52],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="3.5" stroke={MUTED} strokeWidth="1.25" />
      ))}
      {/* hero block */}
      <rect x="96" y="76" width="120" height="14" rx="3" stroke={ACCENT} strokeWidth="1.25" opacity="0.9" />
      <rect x="96" y="98" width="86" height="8" rx="3" stroke={MUTED} strokeWidth="1" />
      <rect x="96" y="112" width="104" height="8" rx="3" stroke={MUTED} strokeWidth="1" />
      {/* sidebar cards */}
      <rect x="236" y="76" width="68" height="24" rx="4" stroke={ACCENT} strokeWidth="1.25" opacity="0.7" />
      <rect x="236" y="108" width="68" height="24" rx="4" stroke={ACCENT} strokeWidth="1.25" opacity="0.7" />
    </g>
  );
}

function AccessibilityMotif() {
  return (
    <g fill="none" strokeLinecap="round">
      {/* person */}
      <circle cx="200" cy="72" r="10" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      <path d="M182 122 v-18 a18 18 0 0 1 36 0 v18" stroke={ACCENT} strokeWidth="1.5" fill="var(--surface-2)" />
      {/* speech waves left */}
      <path d="M158 84 a42 42 0 0 1 0 -36" stroke={MUTED} strokeWidth="1.25" />
      <path d="M144 92 a60 60 0 0 1 0 -52" stroke={MUTED} strokeWidth="1.25" opacity="0.5" />
      {/* text waves right */}
      <path d="M242 66 a42 42 0 0 1 0 36" stroke={MUTED} strokeWidth="1.25" />
      <path d="M256 58 a60 60 0 0 1 0 52" stroke={MUTED} strokeWidth="1.25" opacity="0.5" />
      {/* hands */}
      <path d="M120 118 l14 -10 6 8 -12 10 z" stroke={ACCENT} strokeWidth="1.25" opacity="0.8" />
      <path d="M280 118 l-14 -10 -6 8 12 10 z" stroke={ACCENT} strokeWidth="1.25" opacity="0.8" />
    </g>
  );
}

function ArMotif() {
  return (
    <g fill="none" strokeLinecap="round">
      {/* viewfinder brackets */}
      <path d="M70 46 v-14 h14" stroke={MUTED} strokeWidth="1.5" />
      <path d="M330 46 v-14 h-14" stroke={MUTED} strokeWidth="1.5" />
      <path d="M70 134 v14 h14" stroke={MUTED} strokeWidth="1.5" />
      <path d="M330 134 v14 h-14" stroke={MUTED} strokeWidth="1.5" />
      {/* cube */}
      <path
        d="M200 52 L248 74 V126 L200 148 L152 126 V74 Z"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="var(--surface-2)"
      />
      <path d="M152 74 L200 96 L248 74 M200 96 V148" stroke={ACCENT} strokeWidth="1.25" />
      {/* floating layers */}
      <ellipse cx="200" cy="40" rx="34" ry="9" stroke={MUTED} strokeWidth="1.25" opacity="0.8" />
      <line x1="166" y1="40" x2="166" y2="52" stroke={MUTED} strokeWidth="1" opacity="0.6" />
      <line x1="234" y1="40" x2="234" y2="52" stroke={MUTED} strokeWidth="1" opacity="0.6" />
    </g>
  );
}

const MOTIFS: Record<IdeaVisual, () => React.ReactElement> = {
  ai: AiMotif,
  iot: IotMotif,
  agriculture: AgricultureMotif,
  campus: CampusMotif,
  web: WebMotif,
  accessibility: AccessibilityMotif,
  ar: ArMotif,
};

export function IdeaVisual({
  visual,
  tag,
  className = '',
}: {
  visual: IdeaVisual;
  tag?: string;
  className?: string;
}) {
  const Motif = MOTIFS[visual];
  return (
    <div className={`overflow-hidden border-b border-borderline ${className}`} aria-hidden>
      <Frame tag={tag ?? 'STUDOS.IDEA'}>
        <Motif />
      </Frame>
    </div>
  );
}

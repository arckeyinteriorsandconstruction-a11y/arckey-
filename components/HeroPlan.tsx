import type { CSSProperties } from "react";

type Delay = CSSProperties & { "--d": string };
const d = (s: number): Delay => ({ "--d": `${s}s` });

/**
 * Decorative floor plan that draws itself once on page load.
 * Pure SVG + CSS (see .plan in globals.css); no JavaScript, and it renders
 * fully drawn when the visitor prefers reduced motion.
 */
export default function HeroPlan() {
  const furniture = "fill-none stroke-chalk/70";
  return (
    <svg
      viewBox="0 0 540 440"
      className="plan h-auto w-full text-chalk"
      role="img"
      aria-label="Floor plan of an apartment being drawn"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Living and dining highlight, fades in at the end */}
      <rect x="40" y="40" width="260" height="210" className="fade fill-chalk/[0.05] stroke-none" style={d(3.3)} />

      {/* Outer walls (open at the front door) */}
      <path
        d="M265 420 H520 V40 H40 V420 H215"
        pathLength={1}
        className="draw stroke-chalk"
        strokeWidth={4}
        style={d(0)}
      />

      {/* Inner walls */}
      <g className="stroke-chalk" strokeWidth={3}>
        <path d="M300 40 V100 M300 150 V350 M300 405 V420" pathLength={1} className="draw" style={d(0.6)} />
        <path d="M40 250 H205 M265 250 H300" pathLength={1} className="draw" style={d(0.8)} />
        <path d="M190 250 V310 M190 360 V420" pathLength={1} className="draw" style={d(1.0)} />
        <path d="M300 230 H330 M375 230 H520" pathLength={1} className="draw" style={d(1.1)} />
        <path d="M410 230 V355 M410 405 V420" pathLength={1} className="draw" style={d(1.3)} />
        <path d="M300 330 H410" pathLength={1} className="draw" style={d(1.4)} />
      </g>

      {/* Door leaves and swings */}
      <g className="stroke-chalk/60" strokeWidth={1.5}>
        <path d="M215 420 V370 M215 370 A50 50 0 0 1 265 420" pathLength={1} className="draw" style={d(1.9)} />
        <path d="M300 100 H350 M350 100 A50 50 0 0 1 300 150" pathLength={1} className="draw" style={d(2.0)} />
        <path d="M190 310 H240 M240 310 A50 50 0 0 1 190 360" pathLength={1} className="draw" style={d(2.1)} />
        <path d="M330 230 V275 M330 275 A45 45 0 0 0 375 230" pathLength={1} className="draw" style={d(2.2)} />
        <path d="M410 405 H460 M460 405 A50 50 0 0 0 410 355" pathLength={1} className="draw" style={d(2.3)} />
      </g>

      {/* Furniture: living and dining */}
      <g strokeWidth={1.5}>
        <rect x="62" y="62" width="130" height="44" rx="8" pathLength={1} className={`draw ${furniture} stroke-marigold!`} style={d(2.2)} />
        <rect x="62" y="106" width="44" height="70" rx="8" pathLength={1} className={`draw ${furniture} stroke-marigold!`} style={d(2.3)} />
        <rect x="128" y="130" width="58" height="44" rx="6" pathLength={1} className={`draw ${furniture}`} style={d(2.4)} />
        <circle cx="232" cy="190" r="26" pathLength={1} className={`draw ${furniture}`} style={d(2.5)} />
        <circle cx="232" cy="150" r="8" pathLength={1} className={`draw ${furniture}`} style={d(2.6)} />
        <circle cx="232" cy="230" r="8" pathLength={1} className={`draw ${furniture}`} style={d(2.6)} />
        <circle cx="192" cy="190" r="8" pathLength={1} className={`draw ${furniture}`} style={d(2.7)} />
        <circle cx="272" cy="190" r="8" pathLength={1} className={`draw ${furniture}`} style={d(2.7)} />
      </g>

      {/* Furniture: kitchen */}
      <g strokeWidth={1.5}>
        <path d="M56 268 H176 V290 H78 V404 H56 Z" pathLength={1} className={`draw ${furniture}`} style={d(2.4)} />
        <circle cx="120" cy="279" r="6" pathLength={1} className={`draw ${furniture}`} style={d(2.8)} />
        <circle cx="146" cy="279" r="6" pathLength={1} className={`draw ${furniture}`} style={d(2.8)} />
        <rect x="60" y="330" width="14" height="30" rx="3" pathLength={1} className={`draw ${furniture}`} style={d(2.8)} />
      </g>

      {/* Furniture: bedroom */}
      <g strokeWidth={1.5}>
        <rect x="372" y="58" width="104" height="116" rx="6" pathLength={1} className={`draw ${furniture}`} style={d(2.5)} />
        <rect x="380" y="66" width="38" height="18" rx="4" pathLength={1} className={`draw ${furniture}`} style={d(2.8)} />
        <rect x="430" y="66" width="38" height="18" rx="4" pathLength={1} className={`draw ${furniture}`} style={d(2.8)} />
        <path d="M372 112 H476" pathLength={1} className={`draw ${furniture}`} style={d(2.9)} />
        <rect x="346" y="62" width="20" height="20" rx="3" pathLength={1} className={`draw ${furniture}`} style={d(2.9)} />
        <rect x="482" y="62" width="20" height="20" rx="3" pathLength={1} className={`draw ${furniture}`} style={d(2.9)} />
        <rect x="440" y="198" width="70" height="22" rx="2" pathLength={1} className={`draw ${furniture}`} style={d(3.0)} />
      </g>

      {/* Furniture: bath */}
      <g strokeWidth={1.5}>
        <ellipse cx="326" cy="304" rx="11" ry="15" pathLength={1} className={`draw ${furniture}`} style={d(2.9)} />
        <rect x="366" y="284" width="36" height="38" rx="2" pathLength={1} className={`draw ${furniture}`} style={d(3.0)} />
        <circle cx="394" cy="252" r="9" pathLength={1} className={`draw ${furniture}`} style={d(3.0)} />
      </g>

      {/* Furniture: second bedroom */}
      <g strokeWidth={1.5}>
        <rect x="436" y="246" width="70" height="84" rx="6" pathLength={1} className={`draw ${furniture}`} style={d(3.0)} />
        <rect x="442" y="252" width="24" height="14" rx="3" pathLength={1} className={`draw ${furniture}`} style={d(3.1)} />
        <rect x="476" y="252" width="24" height="14" rx="3" pathLength={1} className={`draw ${furniture}`} style={d(3.1)} />
        <rect x="486" y="352" width="24" height="60" rx="2" pathLength={1} className={`draw ${furniture}`} style={d(3.1)} />
      </g>

      {/* Dimension lines */}
      <g className="stroke-chalk/40" strokeWidth={1}>
        <path d="M40 20 H520 M40 14 V26 M520 14 V26" pathLength={1} className="draw" style={d(3.2)} />
        <path d="M18 40 V420 M12 40 H24 M12 420 H24" pathLength={1} className="draw" style={d(3.3)} />
      </g>

      {/* Room names */}
      <g className="fade fill-chalk/80 stroke-none font-sans" fontSize={12} letterSpacing="0.03em" style={d(3.5)}>
        <text x="62" y="236">Living and dining</text>
        <text x="100" y="346">Kitchen</text>
        <text x="316" y="214">Bedroom</text>
        <text x="340" y="320">Bath</text>
        <text x="434" y="346">Bedroom</text>
      </g>
    </svg>
  );
}

/**
 * Anel estilo painel técnico (inspirado no hero do animejs.com):
 * marcações girando devagar, arcos em tons de roxo e um texto correndo na borda.
 * Só SVG + CSS (classes .hud-* em globals.css).
 */
export function HudRing({ className }: { className?: string }) {
  const ticks = Array.from({ length: 120 }, (_, i) => i);
  const arcs = [
    { start: -80, end: -10, color: "#c4b5fd" },
    { start: 0, end: 70, color: "#8b5cf6" },
    { start: 80, end: 170, color: "#6d28d9" },
    { start: 180, end: 260, color: "#a78bfa" },
  ];

  const R = 230;
  const arc = (a0: number, a1: number, r: number) => {
    const rad = (a: number) => ((a - 90) * Math.PI) / 180;
    const p = (a: number) => `${250 + r * Math.cos(rad(a))} ${250 + r * Math.sin(rad(a))}`;
    return `M ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`;
  };

  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true">
      <defs>
        <path id="hud-text-path" d="M 250 250 m -192 0 a 192 192 0 1 1 384 0 a 192 192 0 1 1 -384 0" />
      </defs>

      {/* Arcos coloridos que se desenham ao carregar */}
      <g className="hud-arcs">
        {arcs.map((a, i) => (
          <path
            key={i}
            d={arc(a.start, a.end, R)}
            stroke={a.color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            pathLength={100}
            className="hud-arc"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </g>

      {/* Marcações (a cada 10, uma maior) */}
      <g className="hud-ticks">
        {ticks.map((i) => (
          <line
            key={i}
            x1="250"
            y1={250 - 218}
            x2="250"
            y2={250 - (i % 10 === 0 ? 206 : 212)}
            stroke={i % 10 === 0 ? "#c4b5fd" : "#3b2f5c"}
            strokeWidth={i % 10 === 0 ? 1.6 : 1}
            transform={`rotate(${i * 3} 250 250)`}
          />
        ))}
      </g>

      {/* Texto correndo pela borda, no sentido contrário */}
      <g className="hud-label">
        <text fill="#6b6385" fontSize="10.5" letterSpacing="3.2" fontFamily="var(--font-geist-mono), monospace">
          <textPath href="#hud-text-path">
            HYDRA LABS · ESTÚDIO INDEPENDENTE · DO PIXEL AO DEPLOY · HYDRA LABS · ESTÚDIO INDEPENDENTE ·
          </textPath>
        </text>
      </g>

      {/* Anel interno pontilhado */}
      <circle cx="250" cy="250" r="176" fill="none" stroke="#261e3a" strokeDasharray="2 6" className="hud-inner" />
    </svg>
  );
}

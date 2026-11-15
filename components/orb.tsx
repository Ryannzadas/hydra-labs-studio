"use client";

import { useEffect, useRef } from "react";

/**
 * Esfera de partículas roxa girando em 3D (inspirada no hero do motion.dev).
 * Canvas 2D puro: pausa fora da tela ou com a aba escondida, segue o mouse de leve
 * e desenha um quadro parado quando o usuário pede menos movimento.
 */
export function Orb({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;

    // Pontos numa esfera de Fibonacci + uma faixa mais densa no equador (o "anel").
    type P = { x: number; y: number; z: number; band: boolean };
    const points: P[] = [];
    const total = small ? 900 : 1600;
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      points.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, band: false });
    }
    const bandCount = small ? 380 : 700;
    for (let i = 0; i < bandCount; i++) {
      const t = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.22;
      const rr = 1.0 + (Math.random() - 0.5) * 0.06;
      points.push({ x: Math.cos(t) * rr, y: spread, z: Math.sin(t) * rr, band: true });
    }

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let angle = 0;
    let tiltX = 0.35;
    let targetTilt = 0.35;
    let targetSpin = 0;
    let spinBoost = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const radius = Math.min(w, h) * 0.34;
      const cx = w / 2;
      const cy = h / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);
      // A faixa fica inclinada como um anel de planeta.
      const bandTilt = -0.42;
      const cosB = Math.cos(bandTilt);
      const sinB = Math.sin(bandTilt);

      for (const p of points) {
        let x = p.x;
        let y = p.y;
        const z = p.z;
        if (p.band) {
          const yb = y * cosB - x * sinB;
          const xb = y * sinB + x * cosB;
          x = xb;
          y = yb;
        }
        // Gira no eixo Y e inclina no eixo X.
        const x1 = x * cosA - z * sinA;
        const z1 = x * sinA + z * cosA;
        const y2 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;

        const persp = 2.6 / (2.6 + z2);
        const sx = cx + x1 * radius * persp;
        const sy = cy + y2 * radius * persp;
        const depth = (z2 + 1) / 2; // 0 = atrás, 1 = na frente
        const alpha = p.band ? 0.4 + depth * 0.6 : 0.12 + depth * 0.65;
        const size = (p.band ? 1.25 : 1) * (0.6 + depth * 1.1);

        // Atrás: violeta escuro. Na frente: lilás quase branco.
        const r = Math.round(124 + depth * (233 - 124));
        const g = Math.round(58 + depth * (213 - 58));
        const b = Math.round(237 + depth * (255 - 237));
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(sx, sy, size, size);
      }
    };

    if (reduce) {
      draw();
      return;
    }

    let raf = 0;
    let running = false;
    const tick = () => {
      spinBoost += (targetSpin - spinBoost) * 0.05;
      angle += 0.0032 + spinBoost;
      tiltX += (targetTilt - tiltX) * 0.04;
      draw();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetTilt = 0.35 + ny * 0.5;
      targetSpin = nx * 0.006;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

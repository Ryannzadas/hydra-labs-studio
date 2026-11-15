"use client";

import { useEffect } from "react";

/**
 * Efeitos globais da página, num só lugar e sem bibliotecas:
 * - [data-reveal] ganha .is-visible ao entrar na tela;
 * - [data-spotlight] recebe --mx/--my com a posição do cursor (luz que segue o mouse);
 * - <html data-scrolled> quando a página já rolou (o header encolhe).
 */
export function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (reduce) el.classList.add("is-visible");
      else io.observe(el);
    });

    // Vídeos que só começam quando aparecem na tela (uma vez).
    const videoIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLVideoElement).play().catch(() => {});
          videoIo.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    if (!reduce) document.querySelectorAll("video[data-play-on-view]").forEach((v) => videoIo.observe(v));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const onScroll = () => {
      document.documentElement.toggleAttribute("data-scrolled", window.scrollY > 24);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      videoIo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

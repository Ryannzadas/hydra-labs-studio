"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Sem permissão de área de transferência: o código continua visível para copiar à mão.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-violet hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
      aria-live="polite"
    >
      {copied ? "Copiado!" : label}
    </button>
  );
}

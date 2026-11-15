import { useId } from "react";

/** Símbolo da Hydra Labs (versão para fundo escuro). */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="386 386 1160 1160" aria-hidden="true" className={className}>
      <rect x="530" y="483" width="292" height="964" rx="146" fill="#8b5cf6" />
      <rect x="1110" y="483" width="292" height="964" rx="146" fill="#8b5cf6" />
      <g id={id}>
        <path
          d="M822 947 V1003 C700 995 565 1040 530 1150 V1140 C560 1000 680 947 820 947 Z"
          fill="#6d28d9"
        />
        <path
          d="M530 1060 C534 1010 556 975 580 950 L720 810 C748 782 780 772 820 772 H965 L853 947 H820 C680 947 560 1000 530 1140 Z"
          fill="#e9d5ff"
        />
        <path d="M965 772 L1077 947 H853 Z" fill="#c4b5fd" />
      </g>
      <use href={`#${id}`} transform="rotate(180 966 966)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-7" />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">Hydra Labs</span>
    </span>
  );
}

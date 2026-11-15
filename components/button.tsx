import { Magnetic } from "./magnetic";

type Variant = "primary" | "outline";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  /** Seta que desliza no hover. */
  arrow?: "right" | "down" | "out";
  magnetic?: boolean;
  size?: "md" | "sm";
};

const arrows = {
  right: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6",
  out: "M7 17 17 7M9 7h8v8",
};

/**
 * Botão-link com texto que rola, brilho passando (primário) ou preenchimento que sobe (contorno).
 * Os estilos ficam em globals.css (.btn).
 */
export function ButtonLink({
  variant = "primary",
  arrow,
  magnetic = true,
  size = "md",
  children,
  className = "",
  ...props
}: Props) {
  const link = (
    <a className={`btn btn-${variant} btn-${size} ${className}`} {...props}>
      <span className="btn-label" data-text={typeof children === "string" ? children : undefined}>
        <span>{children}</span>
      </span>
      {arrow && (
        <svg className={`btn-arrow btn-arrow-${arrow}`} viewBox="0 0 24 24" aria-hidden="true">
          <path d={arrows[arrow]} />
        </svg>
      )}
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

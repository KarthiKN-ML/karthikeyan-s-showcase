import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string | undefined;
  /** max rotation in degrees */
  max?: number;
  /** lift toward viewer in px on hover */
  lift?: number;
  as?: "div" | "article" | "a" | "section";
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  id?: string | undefined;
};

export function Tilt({
  children,
  className = "",
  max = 8,
  lift = 10,
  as = "div",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(
      2,
    )}deg) translateZ(${lift}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-3d ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Mouse-driven parallax for hero layers. */
export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", String(px));
    el.style.setProperty("--my", String(py));
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/** Scroll-linked progress (0 → 1) for a section. */
export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);

  const bind = (el: HTMLElement | null) => {
    if (!el) return;
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;

    const update = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress while section is in view
      const raw = 1 - (rect.bottom / (viewH + rect.height));
      const progress = Math.min(1, Math.max(0, raw));
      node.style.setProperty("--scroll-progress", String(progress));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  };

  return { ref, bind };
}

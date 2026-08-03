import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string | undefined;
  /** stagger delay in ms */
  delay?: number;
  /** motion variant */
  variant?: "up" | "left" | "right" | "scale" | "blur" | "fade";
  as?: "div" | "section" | "article" | "h2" | "h3" | "p" | "span" | "footer" | "header";
  /** once (default) or keep observing */
  once?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as = "div",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-revealed");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-revealed");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${variant} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

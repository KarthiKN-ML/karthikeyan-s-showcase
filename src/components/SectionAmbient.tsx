import { useEffect, useRef } from "react";

type Variant = "light" | "warm" | "dark" | "ink";

/** Soft animated orbs + optional particle drift — decorative only. */
export function SectionAmbient({
  variant = "light",
  particles = true,
}: {
  variant?: Variant;
  particles?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!particles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let reduced = false;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const pts: P[] = [];

    const colors =
      variant === "ink" || variant === "dark"
        ? { fill: "255, 170, 100", line: "255, 150, 80" }
        : variant === "warm"
          ? { fill: "220, 100, 50", line: "200, 90, 40" }
          : { fill: "180, 90, 40", line: "160, 80, 35" };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      pts.length = 0;
      const n = Math.min(36, Math.floor((w * h) / 28000) + 14);
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.8 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          a: 0.15 + Math.random() * 0.35,
        });
      }
    };

    let last = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (reduced) return;
      const dt = Math.min(32, now - last) / 16;
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 120) continue;
          const alpha = (1 - d / 120) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${colors.line}, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of pts) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${colors.fill}, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced = mq.matches;
    const onMq = () => {
      reduced = mq.matches;
      if (!reduced) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    mq.addEventListener("change", onMq);

    resize();
    seed();
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", onMq);
    };
  }, [particles, variant]);

  const orbTone =
    variant === "ink" || variant === "dark"
      ? "ambient-orb--ink"
      : variant === "warm"
        ? "ambient-orb--warm"
        : "ambient-orb--light";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft mesh blobs */}
      <div className={`ambient-orb ambient-orb--a ${orbTone}`} />
      <div className={`ambient-orb ambient-orb--b ${orbTone}`} />
      <div className={`ambient-orb ambient-orb--c ${orbTone}`} />

      {/* Fine grid */}
      <div
        className={`absolute inset-0 ambient-grid ${
          variant === "ink" || variant === "dark" ? "ambient-grid--dark" : "ambient-grid--light"
        }`}
      />

      {particles && (
        <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-80" />
      )}
    </div>
  );
}

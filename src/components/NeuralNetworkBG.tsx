import { useEffect, useRef } from "react";

type Tone = "light" | "dark";

/** Lightweight neurons + links. Pauses when off-screen for smooth scrolling. */
export function NeuralNetworkBG({ tone = "light" }: { tone?: Tone }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let reduced = false;
    let visible = true;
    let last = performance.now();

    type Neuron = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; speed: number };
    const neurons: Neuron[] = [];

    const isDark = tone === "dark";
    const nodeRGB = isDark ? "120, 200, 255" : "40, 100, 180";
    const lineRGB = isDark ? "80, 170, 255" : "60, 120, 200";
    const coreRGB = isDark ? "180, 230, 255" : "30, 80, 160";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      neurons.length = 0;
      const count = Math.min(28, Math.floor((w * h) / 45000) + 14);
      for (let i = 0; i < count; i++) {
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: 1.6 + Math.random() * 1.8,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.015 + Math.random() * 0.02,
        });
      }
    };

    const onResize = () => {
      resize();
      seed();
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (reduced || !visible) return;
      if (now - last < 32) return;
      const dt = Math.min(48, now - last) / 16;
      last = now;

      ctx.clearRect(0, 0, w, h);

      for (const n of neurons) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.pulse += n.speed * dt;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 140 * 140) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / 140) * (isDark ? 0.22 : 0.15);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of neurons) {
        const glow = 0.5 + 0.3 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${nodeRGB}, ${0.12 * glow})`;
        ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${coreRGB}, ${0.7 + 0.2 * glow})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced = mq.matches;
    const onMq = () => {
      reduced = mq.matches;
      if (!reduced && visible) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    };
    mq.addEventListener("change", onMq);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !reduced) {
          last = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "80px", threshold: 0.01 },
    );
    io.observe(canvas);

    resize();
    seed();
    window.addEventListener("resize", onResize, { passive: true });
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMq);
      io.disconnect();
    };
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 size-full"
      style={{ opacity: tone === "dark" ? 0.5 : 0.35 }}
      aria-hidden
    />
  );
}

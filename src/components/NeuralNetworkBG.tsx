import { useEffect, useRef } from "react";

type Tone = "light" | "dark";

/** Animated neurons + synaptic links for section backgrounds. */
export function NeuralNetworkBG({ tone = "light" }: { tone?: Tone }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let reduced = false;

    type Neuron = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
      speed: number;
    };

    const neurons: Neuron[] = [];
    const pulses: { a: number; b: number; p: number; speed: number }[] = [];

    const isDark = tone === "dark";
    const nodeRGB = isDark ? "120, 200, 255" : "40, 100, 180";
    const lineRGB = isDark ? "80, 170, 255" : "60, 120, 200";
    const coreRGB = isDark ? "180, 230, 255" : "30, 80, 160";
    const pulseRGB = isDark ? "255, 180, 80" : "220, 120, 40";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      neurons.length = 0;
      pulses.length = 0;
      const count = Math.min(55, Math.floor((w * h) / 22000) + 22);
      for (let i = 0; i < count; i++) {
        neurons.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 2 + Math.random() * 2.5,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.03,
        });
      }
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          if (dx * dx + dy * dy < 160 * 160 && Math.random() < 0.18) {
            pulses.push({
              a: i,
              b: j,
              p: Math.random(),
              speed: 0.004 + Math.random() * 0.008,
            });
          }
        }
      }
    };

    const onResize = () => {
      resize();
      seed();
    };

    let last = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (reduced) return;
      const dt = Math.min(32, now - last) / 16;
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
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 150) continue;
          const alpha = (1 - d / 150) * (isDark ? 0.28 : 0.2);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const s of pulses) {
        s.p += s.speed * dt;
        if (s.p > 1) s.p -= 1;
        const a = neurons[s.a];
        const b = neurons[s.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * s.p;
        const y = a.y + (b.y - a.y) * s.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, `rgba(${pulseRGB}, 0.9)`);
        g.addColorStop(1, `rgba(${pulseRGB}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of neurons) {
        const glow = 0.45 + 0.35 * Math.sin(n.pulse);
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `rgba(${nodeRGB}, ${0.35 * glow})`);
        g.addColorStop(1, `rgba(${nodeRGB}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${coreRGB}, ${0.75 + 0.2 * glow})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * glow})`;
        ctx.arc(n.x - n.r * 0.3, n.y - n.r * 0.3, n.r * 0.35, 0, Math.PI * 2);
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
    window.addEventListener("resize", onResize);
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMq);
    };
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 size-full"
      style={{ opacity: tone === "dark" ? 0.55 : 0.4 }}
      aria-hidden
    />
  );
}

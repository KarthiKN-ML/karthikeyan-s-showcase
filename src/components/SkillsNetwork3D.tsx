import { useEffect, useRef } from "react";

const LABELS = [
  "Python",
  "SQL",
  "DSA",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Generative AI",
  "PyTorch",
  "RAG",
  "Transformers",
  "XGBoost",
  "LangChain",
];

type Node3 = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  label?: string;
  r: number;
};

/** Perspective-projected neural network of skill nodes — pure canvas, no deps. */
export function SkillsNetwork3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let mx = 0;
    let my = 0;
    let reduced = false;

    const nodes: Node3[] = [];
    const NODE_COUNT = 48;
    const FOCAL = 420;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        const isLabel = i < LABELS.length;
        nodes.push({
          x: (Math.random() - 0.5) * 520,
          y: (Math.random() - 0.5) * 360,
          z: Math.random() * 500 + 80,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          vz: (Math.random() - 0.5) * 0.12,
          label: isLabel ? LABELS[i] : undefined,
          r: isLabel ? 2.4 : 1.2 + Math.random() * 1.4,
        });
      }
    };

    const project = (n: Node3, rotY: number, rotX: number) => {
      // rotate around origin for gentle 3D motion
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      let x = n.x;
      let y = n.y;
      let z = n.z;

      // yaw
      const xz = x * cosY - z * sinY;
      z = x * sinY + z * cosY;
      x = xz;
      // pitch
      const yz = y * cosX - z * sinX;
      z = y * sinX + z * cosX;
      y = yz;

      const scale = FOCAL / (FOCAL + z);
      return {
        sx: w / 2 + x * scale,
        sy: h / 2 + y * scale,
        scale,
        depth: z,
      };
    };

    let t0 = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (reduced) return;

      const dt = Math.min(32, now - t0) / 16;
      t0 = now;

      const rotY = (now * 0.00012) + mx * 0.35;
      const rotX = my * 0.25;

      ctx.clearRect(0, 0, w, h);

      // update
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;
        if (n.x < -280 || n.x > 280) n.vx *= -1;
        if (n.y < -200 || n.y > 200) n.vy *= -1;
        if (n.z < 60 || n.z > 580) n.vz *= -1;
      }

      const projected = nodes.map((n) => ({ n, p: project(n, rotY, rotX) }));
      projected.sort((a, b) => b.p.depth - a.p.depth);

      // connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.n.x - b.n.x;
          const dy = a.n.y - b.n.y;
          const dz = a.n.z - b.n.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist > 140) continue;
          const alpha = (1 - dist / 140) * 0.22 * Math.min(a.p.scale, b.p.scale);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 160, 90, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.p.sx, a.p.sy);
          ctx.lineTo(b.p.sx, b.p.sy);
          ctx.stroke();
        }
      }

      // nodes + labels
      for (const { n, p } of projected) {
        const r = n.r * p.scale * 1.6;
        const glow = n.label ? 0.55 : 0.35;

        const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4);
        g.addColorStop(0, `rgba(255, 140, 60, ${glow * p.scale})`);
        g.addColorStop(1, "rgba(255, 140, 60, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = n.label
          ? `rgba(255, 200, 140, ${0.85 * p.scale})`
          : `rgba(255, 180, 120, ${0.55 * p.scale})`;
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();

        if (n.label && p.scale > 0.55) {
          ctx.font = `${Math.max(9, 11 * p.scale)}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.fillStyle = `rgba(255, 235, 210, ${0.55 * p.scale})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          ctx.fillText(n.label, p.sx, p.sy - r - 4);
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onLeave = () => {
      mx = 0;
      my = 0;
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced = mq.matches;
    const onMq = () => {
      reduced = mq.matches;
      if (!reduced) {
        t0 = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    mq.addEventListener("change", onMq);

    resize();
    seed();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-[1] size-full opacity-70"
      aria-hidden
    />
  );
}

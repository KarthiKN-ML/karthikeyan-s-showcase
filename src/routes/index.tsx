import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Tilt, useParallax } from "@/components/Tilt";
import { Reveal } from "@/components/Reveal";
import heroOrb from "@/assets/hero-orb.jpg";
import flower from "@/assets/flower-mono.jpg";
import dither from "@/assets/dither.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karthikeyan Y — ML, DL & Generative AI" },
      {
        name: "description",
        content:
          "Karthikeyan Y builds machine learning, deep learning, NLP and generative AI systems with Python and SQL. Selected projects, skills and contact.",
      },
      { property: "og:title", content: "Karthikeyan Y — ML, DL & Generative AI" },
      {
        property: "og:description",
        content: "Selected ML, DL, NLP and generative AI projects by Karthikeyan Y.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { code: "S/01", name: "Python", note: "Core language for data, modelling and tooling." },
  { code: "S/02", name: "SQL", note: "Query design, joins, window functions, warehousing." },
  { code: "S/03", name: "DSA", note: "Data structures and algorithms for clean, fast code." },
  { code: "S/04", name: "Machine Learning", note: "Regression, trees, boosting, evaluation." },
  { code: "S/05", name: "Deep Learning", note: "CNNs, RNNs, transfer learning with PyTorch." },
  { code: "S/06", name: "NLP", note: "Text pipelines, embeddings, transformers." },
  { code: "S/07", name: "Generative AI", note: "LLM apps, prompting, RAG, agents." },
];

const PROJECTS = [
  {
    id: "01",
    title: "Customer Churn Predictor",
    stack: "Python · scikit-learn · XGBoost",
    body: "End-to-end ML pipeline that scores subscription customers on churn risk, with feature engineering on usage logs and SHAP-based explanations for retention teams.",
  },
  {
    id: "02",
    title: "Medical Image Classifier",
    stack: "PyTorch · CNN · Transfer Learning",
    body: "Deep learning model for chest X-ray classification using a fine-tuned ResNet backbone, augmentation and Grad-CAM heatmaps to surface where the model looks.",
  },
  {
    id: "03",
    title: "Resume Screening NLP Engine",
    stack: "spaCy · Transformers · FastAPI",
    body: "NLP service that parses resumes, extracts entities and ranks candidates against a job description using sentence embeddings and cosine similarity.",
  },
  {
    id: "04",
    title: "RAG Knowledge Assistant",
    stack: "LangChain · Vector DB · LLM",
    body: "Generative AI assistant that answers questions over private documents with chunked retrieval, citation of sources and streaming responses.",
  },
  {
    id: "05",
    title: "Sales Forecasting System",
    stack: "Pandas · Prophet · SQL",
    body: "Time-series forecasting on multi-store retail data with holiday effects, backtesting and a SQL warehouse feeding scheduled retraining.",
  },
  {
    id: "06",
    title: "Sentiment Intelligence Dashboard",
    stack: "NLP · BERT · Streamlit",
    body: "Fine-tuned BERT classifier over product reviews with aspect-level sentiment, topic clustering and a live dashboard for trend monitoring.",
  },
];

function Arrow() {
  return (
    <span className="inline-flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground shadow-sm">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function IconEmail({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconLinkedIn({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGitHub({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`nav-glass fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3.5 sm:px-8 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <a
        href="#top"
        className="flex items-center gap-2.5 text-ink-foreground mix-blend-difference"
      >
        <span className="grid size-7 place-items-center rounded-md bg-ink-foreground text-[11px] font-bold tracking-tight text-ink shadow-sm">
          KY
        </span>
        <span className="hidden text-[11px] font-medium tracking-wide sm:inline">
          Karthikeyan Y
        </span>
      </a>

      <nav className="flex items-center gap-0.5 rounded-full bg-ink/80 p-1 shadow-lg shadow-black/20 backdrop-blur-xl">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-ink-foreground/70 transition-all duration-300 hover:bg-ink-foreground hover:text-ink hover:shadow-sm"
          >
            {n.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="btn-press flex items-center gap-2 rounded-xl bg-ink/85 p-1 pr-3.5 text-[10px] font-medium text-ink-foreground shadow-lg shadow-black/15 backdrop-blur-xl"
      >
        <Arrow />
        Get in touch
      </a>
    </header>
  );
}

function Index() {
  const parallax = useParallax();

  return (
    <main id="top" className="overflow-x-hidden">
      <Nav />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={parallax.ref}
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
        className="scene-3d relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-ink [--mx:0] [--my:0]"
      >
        {/* Background image with mouse + subtle scale */}
        <img
          src={heroOrb}
          alt="Silhouette facing a glowing ring of light"
          width={1920}
          height={1088}
          className="animate-glow absolute inset-0 size-full object-cover transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform:
              "scale(1.14) translate3d(calc(var(--mx) * -28px), calc(var(--my) * -22px), 0)",
          }}
        />

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/50" />

        {/* Centered focus skills */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center">
          <p className="eyebrow animate-rise mb-5 text-ink-foreground/50">Karthikeyan Y</p>
          <h1
            className="animate-rise max-w-4xl text-[1.65rem] font-light leading-[1.2] tracking-tight text-ink-foreground drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] sm:text-[2.4rem] md:text-[2.85rem] lg:text-[3.25rem]"
            style={{
              transform:
                "rotateX(calc(var(--my) * -2deg)) rotateY(calc(var(--mx) * 2.5deg)) translateZ(24px)",
            }}
          >
            <span className="block sm:inline">Machine Learning</span>
            <span className="mx-2 hidden text-ink-foreground/30 sm:inline">·</span>
            <span className="block sm:inline">Deep Learning</span>
            <span className="mx-2 hidden text-ink-foreground/30 sm:inline">·</span>
            <span className="block sm:inline">Generative AI</span>
          </h1>
          <p className="animate-rise mt-6 max-w-md text-[12px] leading-relaxed text-ink-foreground/60 sm:text-[13px]">
            I build models and AI systems that turn raw data into decisions — from classical ML to
            LLM-powered products.
          </p>
          <div className="animate-rise mt-8 flex gap-3">
            <a
              href="#projects"
              className="btn-press flex items-center gap-2.5 rounded-xl bg-ink-foreground p-1.5 pr-5 text-[11px] font-medium text-ink shadow-xl shadow-black/30"
            >
              <Arrow />
              View projects
            </a>
            <a
              href="#contact"
              className="btn-press flex items-center gap-2 rounded-xl border border-ink-foreground/25 bg-ink/40 px-4 py-2.5 text-[11px] font-medium text-ink-foreground backdrop-blur-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom signature line */}
        <div className="relative z-10 flex items-center justify-between px-6 pb-10 sm:px-10 lg:px-14">
          <span className="signature text-2xl text-ink-foreground/80 sm:text-3xl">Karthikeyan Y</span>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[9px] tracking-[0.25em] text-ink-foreground/35 uppercase">
              Scroll
            </span>
            <div className="h-6 w-px animate-pulse bg-gradient-to-b from-ink-foreground/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="relative overflow-hidden bg-background">
        <Reveal variant="scale" className="pointer-events-none ml-auto w-[72%] max-w-2xl opacity-90">
          <img
            src={flower}
            alt="Monochrome x-ray style flower"
            width={1200}
            height={1200}
            loading="lazy"
            className="animate-float w-full object-contain mix-blend-multiply"
          />
        </Reveal>

        <div className="relative z-10 grid gap-14 px-6 pt-2 pb-28 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
          <Reveal
            as="h2"
            variant="left"
            className="text-[1.85rem] leading-[1.2] font-light tracking-tight sm:text-[2.15rem] lg:text-[2.35rem]"
          >
            <span className="signature mr-2 text-[2.9rem] text-foreground sm:text-[3.5rem]">
              Karthikeyan Y
            </span>
            <br />
            I turn <span className="text-muted-foreground">messy data</span> into models that hold
            up in production
          </Reveal>

          <Reveal
            as="p"
            variant="right"
            delay={140}
            className="self-end max-w-md text-right text-[15px] leading-relaxed font-light tracking-tight text-foreground/80 sm:text-[1.05rem]"
          >
            Python and SQL as the foundation, strong{" "}
            <span className="text-muted-foreground">DSA</span> fundamentals, and hands-on work
            across ML, deep learning, NLP and generative AI.
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ SKILLS ═══════════════ */}
      <section id="skills" className="border-t border-border bg-secondary px-6 py-24 sm:px-10 lg:px-14">
        <Reveal as="p" className="eyebrow">
          Skills
        </Reveal>
        <Reveal
          as="h2"
          variant="blur"
          delay={80}
          className="mt-4 max-w-lg text-2xl font-light tracking-tight sm:text-[1.85rem]"
        >
          Tools I use to ship reliable models
        </Reveal>

        <div className="scene-3d mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.code} variant="scale" delay={i * 65} className="h-full">
              <Tilt
                as="article"
                max={8}
                lift={18}
                className="group flex h-full min-h-[11rem] flex-col justify-between bg-card p-6 transition-colors hover:bg-background"
              >
                <span className="text-[10px] tracking-wider text-muted-foreground">{s.code}</span>
                <div className="layer-lift">
                  <h3 className="text-lg font-light tracking-tight transition-colors group-hover:text-accent">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{s.note}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}

          <Reveal variant="scale" delay={SKILLS.length * 65} className="h-full">
            <Tilt
              as="article"
              max={8}
              lift={18}
              className="relative flex h-full min-h-[11rem] items-end overflow-hidden bg-ink p-6"
            >
              <img
                src={dither}
                alt="Dithered halftone texture"
                width={1024}
                height={768}
                loading="lazy"
                className="animate-glow absolute inset-0 size-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <p className="layer-lift relative text-[11px] leading-relaxed text-ink-foreground/90">
                Always learning — currently deepening LLM evaluation and agentic workflows.
              </p>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section id="projects" className="bg-ink px-6 py-28 sm:px-10 lg:px-14">
        <Reveal as="p" className="eyebrow text-ink-foreground/45">
          Selected work
        </Reveal>
        <Reveal
          as="h2"
          variant="blur"
          delay={100}
          className="mt-5 max-w-2xl text-[1.85rem] leading-snug font-light tracking-tight text-ink-foreground sm:text-[2.15rem]"
        >
          Machine learning projects that solve real problems
        </Reveal>

        <div className="scene-3d mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink-foreground/10 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.id}
              variant={i % 2 === 0 ? "left" : "right"}
              delay={(i % 2) * 100}
              className="h-full"
            >
              <Tilt
                as="article"
                max={6}
                lift={16}
                className="card-shine group h-full bg-ink p-8 transition-colors hover:bg-ink-foreground/[0.04]"
              >
                <div className="flex items-baseline justify-between layer-lift">
                  <span className="text-3xl font-extralight text-ink-foreground/20">{p.id}</span>
                  <span className="rounded-full border border-ink-foreground/15 px-2.5 py-0.5 text-[9px] tracking-wide text-accent">
                    {p.stack}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-light tracking-tight text-ink-foreground transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-[12px] leading-relaxed text-ink-foreground/55">
                  {p.body}
                </p>
                <a
                  href="https://github.com/karthikeyan-y"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2.5 text-[11px] text-ink-foreground/60 transition-all duration-300 group-hover:gap-3 group-hover:text-ink-foreground"
                >
                  <Arrow />
                  View code
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="border-t border-border bg-background px-6 py-28 sm:px-10 lg:px-14">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>
        <Reveal
          as="h2"
          variant="blur"
          delay={100}
          className="mt-5 max-w-2xl text-[1.85rem] leading-snug font-light tracking-tight sm:text-[2.2rem]"
        >
          Open to ML / AI roles and interesting collaborations
        </Reveal>

        <div className="scene-3d mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
          {[
            {
              label: "Email",
              value: "karthikeyan.y@email.com",
              href: "mailto:karthikeyan.y@email.com",
              icon: IconEmail,
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/karthikeyan-y",
              href: "https://linkedin.com/in/karthikeyan-y",
              icon: IconLinkedIn,
            },
            {
              label: "GitHub",
              value: "github.com/karthikeyan-y",
              href: "https://github.com/karthikeyan-y",
              icon: IconGitHub,
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.label} variant="scale" delay={i * 90} className="h-full">
                <Tilt
                  as="a"
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  max={7}
                  lift={16}
                  className="group flex h-full min-h-36 flex-col justify-between bg-card p-6 transition-colors hover:bg-secondary"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-wider text-muted-foreground">{c.label}</span>
                    <span className="text-muted-foreground transition-colors group-hover:text-accent">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <span className="layer-lift flex items-center gap-2.5 text-[12px] transition-colors group-hover:text-accent">
                    <Arrow />
                    {c.value}
                  </span>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          as="footer"
          className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-[10px] text-muted-foreground"
        >
          <span className="flex items-center gap-2.5">
            <span className="signature text-2xl text-foreground">Karthikeyan Y</span>
            <span className="opacity-60">— ML / AI Engineer</span>
          </span>
          <span>© {new Date().getFullYear()}</span>
        </Reveal>
      </section>
    </main>
  );
}

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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

        <div className="flex-1" />

        <div
          className="relative z-10 flex flex-col gap-8 px-6 pb-16 transition-transform duration-500 ease-out sm:flex-row sm:items-end sm:justify-between sm:px-10 lg:px-14 [transform-style:preserve-3d]"
          style={{
            transform:
              "rotateX(calc(var(--my) * -3.5deg)) rotateY(calc(var(--mx) * 4.5deg)) translateZ(36px)",
          }}
        >
          <div className="max-w-xl">
            <p className="eyebrow animate-rise text-ink-foreground/55">
              Machine Learning · Deep Learning · Generative AI
            </p>
            <h1 className="signature animate-sign mt-2 pb-1 text-[2.6rem] leading-[1.05] text-ink-foreground drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)] sm:text-[3.4rem] lg:text-[3.8rem]">
              Karthikeyan Y
            </h1>
            <p className="animate-rise mt-4 max-w-sm text-[12px] leading-relaxed text-ink-foreground/65 sm:text-[13px]">
              I build models and AI systems that turn raw data into decisions — from classical ML to
              LLM-powered products.
            </p>
          </div>

          <div className="animate-rise flex shrink-0 gap-3">
            <a
              href="#projects"
              className="btn-press flex items-center gap-2.5 rounded-xl bg-ink-foreground p-1.5 pr-5 text-[11px] font-medium text-ink shadow-xl shadow-black/30"
            >
              <Arrow />
              View projects
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[9px] tracking-[0.25em] text-ink-foreground/40 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-ink-foreground/50 to-transparent" />
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
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/karthikeyan-y",
              href: "https://linkedin.com/in/karthikeyan-y",
            },
            {
              label: "GitHub",
              value: "github.com/karthikeyan-y",
              href: "https://github.com/karthikeyan-y",
            },
          ].map((c, i) => (
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
                <span className="text-[10px] tracking-wider text-muted-foreground">{c.label}</span>
                <span className="layer-lift flex items-center gap-2.5 text-[12px] transition-colors group-hover:text-accent">
                  <Arrow />
                  {c.value}
                </span>
              </Tilt>
            </Reveal>
          ))}
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

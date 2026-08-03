import { createFileRoute } from "@tanstack/react-router";
import { Tilt, useParallax } from "@/components/Tilt";
import { Reveal } from "@/components/Reveal";
import heroOrb from "@/assets/hero-orb.jpg";
import flower from "@/assets/flower-mono.jpg";
import dither from "@/assets/dither.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karthikeyan Y — ML, DL & Generative AI Portfolio" },
      {
        name: "description",
        content:
          "Karthikeyan Y builds machine learning, deep learning, NLP and generative AI systems with Python and SQL. Selected projects, skills and contact details.",
      },
      { property: "og:title", content: "Karthikeyan Y — ML, DL & Generative AI Portfolio" },
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
    <span className="inline-flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4">
      <a href="#top" className="flex items-center gap-2 text-ink-foreground mix-blend-difference">
        <span className="grid size-6 place-items-center rounded-sm bg-ink-foreground text-[10px] font-bold text-ink">
          KY
        </span>
      </a>
      <nav className="flex items-center gap-1 rounded-full bg-ink/85 p-1 backdrop-blur">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="rounded-full px-3 py-1 text-[10px] tracking-wide text-ink-foreground/65 transition-colors hover:bg-ink-foreground hover:text-ink"
          >
            {n.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="flex items-center gap-2 rounded-lg bg-ink/85 p-1 pr-3 text-[10px] text-ink-foreground backdrop-blur"
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
    <main id="top">
      {/* HERO */}
      <Nav />
      <section
        ref={parallax.ref}
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
        className="scene-3d relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink [--mx:0] [--my:0]"
      >
        <img
          src={heroOrb}
          alt="Silhouette facing a glowing ring of light"
          width={1920}
          height={1088}
          className="animate-glow absolute inset-0 size-full scale-110 object-cover transition-transform duration-300 ease-out"
          style={{
            transform:
              "scale(1.12) translate3d(calc(var(--mx) * -22px), calc(var(--my) * -22px), 0)",
          }}
        />
        <div className="flex-1" />
        <div
          className="relative flex flex-col gap-6 px-6 pb-8 transition-transform duration-300 ease-out sm:flex-row sm:items-end sm:justify-between [transform-style:preserve-3d]"
          style={{
            transform:
              "rotateX(calc(var(--my) * -4deg)) rotateY(calc(var(--mx) * 5deg)) translateZ(30px)",
          }}
        >
          <div>
            <p className="eyebrow animate-rise text-ink-foreground/60">
              Machine Learning · Deep Learning · Generative AI
            </p>
            <h1 className="signature animate-sign mt-1 text-[2.6rem] leading-none text-ink-foreground drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:text-[3.4rem]">
              Karthikeyan Y
            </h1>
          </div>
          <p className="animate-rise max-w-xs text-[11px] leading-relaxed text-ink-foreground/70">
            I build models and AI systems that turn raw data into decisions — from classical ML to
            LLM-powered products.
          </p>
          <div className="animate-rise flex gap-2">
            <a
              href="#projects"
              className="flex items-center gap-2.5 rounded-lg bg-ink-foreground p-1 pr-4 text-[11px] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              <Arrow />
              View projects
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-background">
        <Reveal variant="scale" className="ml-auto w-[70%] max-w-2xl">
          <img
            src={flower}
            alt="Monochrome x-ray style flower"
            width={1200}
            height={1200}
            loading="lazy"
            className="animate-float pointer-events-none w-full object-contain mix-blend-multiply"
          />
        </Reveal>
        <div className="grid gap-12 px-6 pt-4 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-24">
          <Reveal
            as="h2"
            variant="left"
            className="text-2xl leading-snug font-light tracking-tight sm:text-[1.9rem]"
          >
            <span className="signature mr-2 text-[2.6rem] sm:text-[3.2rem]">Karthikeyan Y</span>
            <br />I turn{" "}
            <span className="text-muted-foreground">messy data</span> into models that hold up in
            production
          </Reveal>
          <Reveal
            as="p"
            variant="right"
            delay={120}
            className="self-end text-right text-base leading-snug font-light tracking-tight sm:text-[1.15rem]"
          >
            Python and SQL as the foundation, strong <span className="text-muted-foreground">DSA</span>{" "}
            fundamentals, and hands-on work across ML, deep learning, NLP and generative AI.
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-border bg-secondary px-6 py-20 sm:px-10">
        <Reveal as="p" className="eyebrow">
          Skills
        </Reveal>
        <div className="scene-3d mt-10 grid gap-px rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.code} variant="scale" delay={i * 70} className="h-full">
            <Tilt
              as="article"
              max={9}
              lift={16}
              className="flex h-full min-h-40 flex-col justify-between bg-card p-5 hover:bg-background hover:shadow-2xl"
            >
              <span className="text-[10px] text-muted-foreground">{s.code}</span>
              <div className="layer-lift">
                <h3 className="text-lg font-light tracking-tight">{s.name}</h3>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{s.note}</p>
              </div>
            </Tilt>
            </Reveal>
          ))}
          <Reveal variant="scale" delay={SKILLS.length * 70} className="h-full">
          <Tilt
            as="article"
            max={9}
            lift={16}
            className="relative flex h-full min-h-40 items-end overflow-hidden bg-ink p-5"
          >
            <img
              src={dither}
              alt="Dithered halftone texture"
              width={1024}
              height={768}
              loading="lazy"
              className="animate-glow absolute inset-0 size-full object-cover"
            />
            <p className="layer-lift relative text-[10px] leading-relaxed text-ink-foreground">
              Always learning — currently deepening LLM evaluation and agentic workflows.
            </p>
          </Tilt>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-ink px-6 py-24 sm:px-10">
        <Reveal as="p" className="eyebrow text-ink-foreground/50">
          Projects
        </Reveal>
        <Reveal
          as="h2"
          variant="blur"
          delay={100}
          className="mt-5 max-w-2xl text-2xl leading-snug font-light tracking-tight text-ink-foreground sm:text-[1.9rem]"
        >
          Selected machine learning work
        </Reveal>
        <div className="scene-3d mt-12 grid gap-px rounded-xl bg-ink-foreground/12 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} variant={i % 2 === 0 ? "left" : "right"} delay={(i % 2) * 90} className="h-full">
            <Tilt
              as="article"
              max={7}
              lift={14}
              className="group h-full bg-ink p-7 hover:bg-ink-foreground/[0.05] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-baseline justify-between layer-lift">
                <span className="text-2xl font-light text-ink-foreground/25">{p.id}</span>
                <span className="text-[10px] text-accent">{p.stack}</span>
              </div>
              <h3 className="mt-6 text-lg font-light tracking-tight text-ink-foreground">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-[11px] leading-relaxed text-ink-foreground/60">
                {p.body}
              </p>
              <a
                href="https://github.com/karthikeyan-y"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[10px] text-ink-foreground/70 transition-colors group-hover:text-ink-foreground"
              >
                <Arrow />
                View code
              </a>
            </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-background px-6 py-24 sm:px-10">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>
        <Reveal
          as="h2"
          variant="blur"
          delay={100}
          className="mt-5 max-w-3xl text-2xl leading-snug font-light tracking-tight sm:text-[2rem]"
        >
          Open to ML / AI roles and collaborations
        </Reveal>
        <div className="scene-3d mt-10 grid gap-px rounded-xl bg-border sm:grid-cols-3">
          {[
            { label: "Email", value: "karthikeyan.y@email.com", href: "mailto:karthikeyan.y@email.com" },
            { label: "LinkedIn", value: "linkedin.com/in/karthikeyan-y", href: "https://linkedin.com/in/karthikeyan-y" },
            { label: "GitHub", value: "github.com/karthikeyan-y", href: "https://github.com/karthikeyan-y" },
          ].map((c, i) => (
            <Reveal key={c.label} variant="scale" delay={i * 100} className="h-full">
            <Tilt
              as="a"
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              max={8}
              lift={14}
              className="flex h-full min-h-32 flex-col justify-between bg-card p-5 hover:bg-secondary hover:shadow-xl"
            >
              <span className="text-[10px] text-muted-foreground">{c.label}</span>
              <span className="layer-lift flex items-center gap-2.5 text-[11px]">
                <Arrow />
                {c.value}
              </span>
            </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal
          as="footer"
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[10px] text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="signature text-xl text-foreground">Karthikeyan Y</span> — ML / AI Engineer
          </span>
          <span>© {new Date().getFullYear()}</span>
        </Reveal>
      </section>
    </main>
  );
}

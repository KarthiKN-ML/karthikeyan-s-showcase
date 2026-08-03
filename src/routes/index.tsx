import { createFileRoute } from "@tanstack/react-router";
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
        <span className="grid size-7 place-items-center rounded-sm bg-ink-foreground text-[11px] font-bold text-ink">
          KY
        </span>
      </a>
      <nav className="flex items-center gap-1 rounded-full bg-ink/85 p-1 backdrop-blur">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="rounded-full px-3.5 py-1.5 text-[11px] tracking-wide text-ink-foreground/65 transition-colors hover:bg-ink-foreground hover:text-ink"
          >
            {n.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="flex items-center gap-2 rounded-lg bg-ink/85 p-1 pr-3.5 text-[11px] text-ink-foreground backdrop-blur"
      >
        <Arrow />
        Get in touch
      </a>
    </header>
  );
}

function Index() {
  return (
    <main id="top">
      {/* HERO */}
      <Nav />
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink">
        <img
          src={heroOrb}
          alt="Silhouette facing a glowing ring of light"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-90"
        />
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
          <p className="eyebrow animate-rise text-ink-foreground/70">
            Machine Learning · Deep Learning · Generative AI
          </p>
          <h1 className="animate-rise mt-6 text-[13vw] leading-[0.95] font-light tracking-tight text-ink-foreground sm:text-[8vw] lg:text-[6.5rem]">
            Karthikeyan Y
          </h1>
        </div>
        <div className="relative flex flex-col gap-6 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-ink-foreground/70">
            I build models and AI systems that turn raw data into decisions — from classical ML to
            LLM-powered products.
          </p>
          <div className="flex gap-2">
            <a
              href="#projects"
              className="flex items-center gap-2.5 rounded-lg bg-ink-foreground p-1 pr-4 text-xs font-medium text-ink"
            >
              <Arrow />
              View projects
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-background">
        <img
          src={flower}
          alt="Monochrome x-ray style flower"
          width={1200}
          height={1200}
          loading="lazy"
          className="pointer-events-none ml-auto w-[70%] max-w-2xl object-contain mix-blend-multiply"
        />
        <div className="grid gap-12 px-6 pt-4 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-24">
          <h2 className="text-3xl leading-snug font-light tracking-tight sm:text-[2.6rem]">
            Karthikeyan Y. I turn{" "}
            <span className="text-muted-foreground">messy data</span> into models that hold up in
            production
          </h2>
          <p className="self-end text-right text-xl leading-snug font-light tracking-tight sm:text-[1.6rem]">
            Python and SQL as the foundation, strong <span className="text-muted-foreground">DSA</span>{" "}
            fundamentals, and hands-on work across ML, deep learning, NLP and generative AI.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-t border-border bg-secondary px-6 py-20 sm:px-10">
        <p className="eyebrow">Skills</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s) => (
            <article
              key={s.code}
              className="flex min-h-44 flex-col justify-between bg-card p-6 transition-colors hover:bg-background"
            >
              <span className="text-xs text-muted-foreground">{s.code}</span>
              <div>
                <h3 className="text-2xl font-light tracking-tight">{s.name}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{s.note}</p>
              </div>
            </article>
          ))}
          <article className="relative flex min-h-44 items-end overflow-hidden bg-ink p-6">
            <img
              src={dither}
              alt="Dithered halftone texture"
              width={1024}
              height={768}
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-70"
            />
            <p className="relative text-xs leading-relaxed text-ink-foreground">
              Always learning — currently deepening LLM evaluation and agentic workflows.
            </p>
          </article>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-ink px-6 py-24 sm:px-10">
        <p className="eyebrow text-ink-foreground/50">Projects</p>
        <h2 className="mt-6 max-w-2xl text-3xl leading-snug font-light tracking-tight text-ink-foreground sm:text-[2.6rem]">
          Selected machine learning work
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-ink-foreground/12 lg:grid-cols-2">
          {PROJECTS.map((p) => (
            <article key={p.id} className="group bg-ink p-8 transition-colors hover:bg-ink-foreground/[0.04]">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-light text-ink-foreground/25">{p.id}</span>
                <span className="text-[11px] text-accent">{p.stack}</span>
              </div>
              <h3 className="mt-8 text-2xl font-light tracking-tight text-ink-foreground">
                {p.title}
              </h3>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-ink-foreground/60">{p.body}</p>
              <a
                href="https://github.com/karthikeyan-y"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[11px] text-ink-foreground/70 transition-colors group-hover:text-ink-foreground"
              >
                <Arrow />
                View code
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-background px-6 py-24 sm:px-10">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-6 max-w-3xl text-3xl leading-snug font-light tracking-tight sm:text-[3rem]">
          Open to ML / AI roles and collaborations
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3">
          {[
            { label: "Email", value: "karthikeyan.y@email.com", href: "mailto:karthikeyan.y@email.com" },
            { label: "LinkedIn", value: "linkedin.com/in/karthikeyan-y", href: "https://linkedin.com/in/karthikeyan-y" },
            { label: "GitHub", value: "github.com/karthikeyan-y", href: "https://github.com/karthikeyan-y" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex min-h-36 flex-col justify-between bg-card p-6 transition-colors hover:bg-secondary"
            >
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <span className="flex items-center gap-2.5 text-sm">
                <Arrow />
                {c.value}
              </span>
            </a>
          ))}
        </div>
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[11px] text-muted-foreground">
          <span>Karthikeyan Y — ML / AI Engineer</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}

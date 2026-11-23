import Link from "next/link";

// Key Dataset Metrics
const TOTAL_STUDENTS = 32593;
const TOTAL_MODULES = 7;
const TOTAL_PRESENTATIONS = 4;
const COMPLETION_RATE = 47.2;
const AVG_WITHDRAWAL_RATE = 31.2;

const HIGHLIGHTS = [
  {
    title: "Early Warning System (FR-7)",
    description: "Flags students with <10 VLE clicks in first 2 weeks to increase completion by +23 pp (~1,500 students).",
    tag: "Predictive",
    href: "/dashboard",
  },
  {
    title: "6 Core Charts & Takeaways (FR-3)",
    description: "Multi-dimensional performance analysis across all 7 STEM and Social Science modules answering 5 key questions.",
    tag: "Analytics",
    href: "/dashboard",
  },
  {
    title: "At-Risk Demographics & Equity (FR-9)",
    description: "Disaggregation across IMD deprivation deciles (-15.8 pp gap), age bands, and education levels.",
    tag: "Equity",
    href: "/dashboard",
  },
  {
    title: "What-If Simulation (FR-10)",
    description: "Interactive slider simulating +10% to +30% early completion gains in introductory modules.",
    tag: "Simulation",
    href: "/dashboard",
  },
  {
    title: "Numbers-Check Audit Page (FR-6)",
    description: "Transparent cleaning log of 360 removed rows, missing IMD values handling, and 6 core assumptions.",
    tag: "Provenance",
    href: "/dashboard",
  },
  {
    title: "UK Regional Map & Geography",
    description: "Interactive schematic and ranking of 13 UK regions highlighting local attrition hotspots.",
    tag: "Geographic",
    href: "/dashboard",
  },
  {
    title: "One-Page Strategic Memo (FR-7)",
    description: "Concise executive memo for the Head of Learning with three actionable, high-ROI recommendations.",
    tag: "Strategy",
    href: "/dashboard",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-background text-foreground py-16 px-6 min-h-screen">
      <div className="flex flex-col items-center gap-8 max-w-5xl w-full text-center">
        {/* Top Badge */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            EasySkillOS Project 1 • OULAD Analytics Portal
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground">
            Where Do Learners Drop Off?
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Actionable learning analytics turning 10.6M student interaction logs into an executive dashboard and high-impact interventions across{" "}
            <span className="font-bold text-foreground">{TOTAL_STUDENTS.toLocaleString()} students</span> and{" "}
            <span className="font-bold text-foreground">{TOTAL_MODULES} modules</span>.
          </p>
        </div>

        {/* Key KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl my-2">
          <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{TOTAL_STUDENTS.toLocaleString()}</p>
            <p className="text-xs text-muted font-medium mt-1">Total Cleaned Records</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl sm:text-3xl font-extrabold text-success">{COMPLETION_RATE}%</p>
            <p className="text-xs text-muted font-medium mt-1">Baseline Completion</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">{TOTAL_MODULES}</p>
            <p className="text-xs text-muted font-medium mt-1">Modules ({TOTAL_PRESENTATIONS} Cohorts)</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <p className="text-2xl sm:text-3xl font-extrabold text-error">{AVG_WITHDRAWAL_RATE}%</p>
            <p className="text-xs text-muted font-medium mt-1">Average Withdrawal</p>
          </div>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm sm:text-base font-bold transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-95"
          >
            Launch Interactive Dashboard →
          </Link>
          <Link
            href="/api/health"
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all bg-card border border-border text-foreground hover:bg-border/40 shadow-sm active:scale-95"
          >
            API Health Endpoint
          </Link>
        </div>

        {/* Feature Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-6 text-left">
          {HIGHLIGHTS.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10">
                  {h.tag}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-foreground mt-3 group-hover:text-primary transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">{h.description}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-border/50 text-xs font-semibold text-primary inline-flex items-center gap-1">
                Explore feature →
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Credit */}
        <div className="text-xs text-muted pt-8 border-t border-border/60 w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Open University Learning Analytics Dataset (OULAD) • EasySkillOS Project 1</span>
          <span>Compliant with FR-1 through FR-10</span>
        </div>
      </div>
    </main>
  );
}

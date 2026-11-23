import Link from "next/link";

// Key Dataset Metrics
const TOTAL_STUDENTS = 32593;
const TOTAL_MODULES = 7;
const TOTAL_PRESENTATIONS = 4;
const COMPLETION_RATE = 47.2;
const AVG_WITHDRAWAL_RATE = 31.2;

const HIGHLIGHTS = [
  {
    title: "Early Warning Predictive Engine (FR-7)",
    description: "Identifies students logging <10 VLE clicks in first 2 weeks to trigger interventions that increase completion by +23 pp (~1,500 students).",
    tag: "Predictive",
    color: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-200/80",
    badge: "text-primary bg-orange-50",
    href: "/dashboard",
  },
  {
    title: "6 Core Charts with Takeaways (FR-3)",
    description: "Multi-dimensional performance analysis across all 7 STEM and Social Science modules answering the 5 mandatory research questions.",
    tag: "Analytics",
    color: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200/80",
    badge: "text-blue-600 bg-blue-50",
    href: "/dashboard",
  },
  {
    title: "UK Regional Distribution Map",
    description: "Interactive geographic attrition schematic across 13 UK regions comparing local deprivation to student retention.",
    tag: "Geographic",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200/80",
    badge: "text-emerald-700 bg-emerald-50",
    href: "/dashboard",
  },
  {
    title: "At-Risk Demographics & Equity (FR-9)",
    description: "Disaggregation across IMD deprivation deciles (-15.8 pp equity gap), age bands, and prior educational qualifications.",
    tag: "Equity",
    color: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-200/80",
    badge: "text-purple-700 bg-purple-50",
    href: "/dashboard",
  },
  {
    title: "What-If Simulation Engine (FR-10)",
    description: "Interactive real-time slider (+0% to +30%) modeling retention gains and graduate yields from early module onboarding support.",
    tag: "Simulation",
    color: "from-rose-500/10 to-orange-500/10",
    border: "border-rose-200/80",
    badge: "text-rose-700 bg-rose-50",
    href: "/dashboard",
  },
  {
    title: "Numbers-Check Audit Page (FR-1 & FR-6)",
    description: "Complete data provenance log: 360 rows removed, handling of 1,111 '?' IMD entries, and 6 core analytic assumptions.",
    tag: "Provenance",
    color: "from-slate-500/10 to-slate-400/10",
    border: "border-slate-200",
    badge: "text-slate-700 bg-slate-100",
    href: "/dashboard",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 min-h-screen hero-gradient font-sans">
      <div className="flex flex-col items-center gap-10 max-w-6xl w-full text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold text-slate-700">
            EasySkillOS Project 1 • OULAD Intelligence Portal
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200/60">
            v2.0 Live
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="space-y-5 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-slate-950 text-balance">
            Where Do Learners Drop Off?
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Turning <span className="font-bold text-slate-900">10.6M student interaction logs</span> into an executive intelligence dashboard and targeted interventions across{" "}
            <span className="font-bold text-slate-900">{TOTAL_STUDENTS.toLocaleString()} learners</span> and{" "}
            <span className="font-bold text-slate-900">{TOTAL_MODULES} modules</span>.
          </p>
        </div>

        {/* Executive Headline Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-4xl my-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-card hover:shadow-card-hover transition-all">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tabular-nums">
              {TOTAL_STUDENTS.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Cleaned Learners</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-card hover:shadow-card-hover transition-all">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 tabular-nums">
              {COMPLETION_RATE}%
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Baseline Completion</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-card hover:shadow-card-hover transition-all">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tabular-nums">
              {TOTAL_MODULES}
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Modules ({TOTAL_PRESENTATIONS} Cohorts)</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-card hover:shadow-card-hover transition-all">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-rose-600 tabular-nums">
              {AVG_WITHDRAWAL_RATE}%
            </p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Average Withdrawal</p>
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex gap-3.5 flex-wrap justify-center items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm sm:text-base font-black transition-all bg-primary text-white hover:bg-orange-600 shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Launch Interactive Dashboard</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/api/health"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold transition-all bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>API Health Check</span>
          </Link>
        </div>

        {/* Feature Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-4 text-left">
          {HIGHLIGHTS.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className={`rounded-2xl border ${h.border} bg-white p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group hover:-translate-y-1 duration-200`}
            >
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${h.badge}`}>
                  {h.tag}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-4 group-hover:text-primary transition-colors leading-snug">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{h.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-bold text-primary inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>Explore in dashboard</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Credit & Badges */}
        <div className="text-xs text-slate-500 pt-10 border-t border-slate-200/80 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Open University Learning Analytics Dataset (OULAD)</span>
            <span>•</span>
            <span>EasySkillOS Project 1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200">
              FR-1 through FR-10 Full Compliance
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

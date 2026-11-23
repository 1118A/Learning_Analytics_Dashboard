"use client";

import React from "react";

export interface TopbarProps {
  course: string;
  onCourseChange: (course: string) => void;
  term: string;
  onTermChange: (term: string) => void;
  learnerGroup: string;
  onLearnerGroupChange: (group: string) => void;
  whatIf: number;
  onWhatIfChange: (pct: number) => void;
  onResetFilters: () => void;
  onExportCSV: () => void;
  onToggleMobileMenu: () => void;
  isFiltered?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  course,
  onCourseChange,
  term,
  onTermChange,
  learnerGroup,
  onLearnerGroupChange,
  whatIf,
  onWhatIfChange,
  onResetFilters,
  onExportCSV,
  onToggleMobileMenu,
  isFiltered = false,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-col gap-2.5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle + Title Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Open navigation menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              OULAD Executive Intelligence
            </span>
            {isFiltered && (
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200/80">
                Filtered Cohort
              </span>
            )}
          </div>
        </div>

        {/* Right: What-If Slider & Export */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {/* FR-10 What-if control */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs shadow-sm">
            <span className="font-semibold text-slate-500 hidden sm:inline whitespace-nowrap">
              What-If AAA:
            </span>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={whatIf}
              onChange={(e) => onWhatIfChange(parseInt(e.target.value))}
              className="w-16 sm:w-20 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              title={`Simulate +${whatIf}% completion impact`}
            />
            <span
              className={`font-black tabular-nums text-xs px-1.5 py-0.5 rounded ${
                whatIf > 0 ? "bg-emerald-50 text-emerald-600 font-extrabold" : "text-slate-400"
              }`}
            >
              +{whatIf}%
            </span>
          </div>

          {/* Export Report CSV */}
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-sm active:scale-95"
            title="Download CSV report of current view"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* FR-5: Unified Filter Controls Row (Course, Term, Learner Group, Reset) */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1 text-xs font-medium border-t border-slate-100">
        <span className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider hidden sm:inline">
          Filter By:
        </span>

        {/* 1. Course Filter */}
        <label className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <span className="text-slate-400 font-semibold text-[11px]">Course:</span>
          <select
            value={course}
            onChange={(e) => onCourseChange(e.target.value)}
            className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
          >
            <option value="All">All Modules (7)</option>
            <option value="AAA">AAA - Humanities (748)</option>
            <option value="BBB">BBB - Social Sci (7,909)</option>
            <option value="CCC">CCC - Computing (4,434)</option>
            <option value="DDD">DDD - Science (6,272)</option>
            <option value="EEE">EEE - Environment (2,934)</option>
            <option value="FFF">FFF - STEM Found (7,762)</option>
            <option value="GGG">GGG - Comm Dynamics (2,534)</option>
          </select>
        </label>

        {/* 2. Term / Presentation Filter */}
        <label className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <span className="text-slate-400 font-semibold text-[11px]">Term:</span>
          <select
            value={term}
            onChange={(e) => onTermChange(e.target.value)}
            className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
          >
            <option value="All">All Presentations (4)</option>
            <option value="2013B">2013B (Feb 2013)</option>
            <option value="2013J">2013J (Oct 2013)</option>
            <option value="2014B">2014B (Feb 2014)</option>
            <option value="2014J">2014J (Oct 2014)</option>
          </select>
        </label>

        {/* 3. Learner Group Filter (FR-5) */}
        <label className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <span className="text-slate-400 font-semibold text-[11px]">Group:</span>
          <select
            value={learnerGroup}
            onChange={(e) => onLearnerGroupChange(e.target.value)}
            className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer text-xs"
          >
            <option value="All">All Learners</option>
            <option value="gender">Gender (Male vs Female)</option>
            <option value="age">Age Band (Under 35, 35-55, 55+)</option>
            <option value="imd">IMD Deprivation Deciles</option>
            <option value="disability">Disability Declared (Y/N)</option>
            <option value="education">Education Level (A-Level / No Formal)</option>
            <option value="prior_attempts">Prior Attempts History</option>
          </select>
        </label>

        {/* Reset / Clear Filters button */}
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shadow-sm"
            title="Reset all filters to defaults"
          >
            Clear Filters ✕
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;

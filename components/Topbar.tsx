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
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle + Title Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-border/60 text-foreground transition-colors"
            aria-label="Open navigation menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            <span className="text-xs font-semibold text-foreground">
              OULAD Live Analytics Portal
            </span>
            {isFiltered && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Filtered View
              </span>
            )}
          </div>
        </div>

        {/* Right: What-If Slider & Export */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {/* FR-10 What-if control */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-card border border-border shadow-sm text-xs">
            <span className="font-semibold text-muted hidden sm:inline whitespace-nowrap">
              What-If AAA/Early:
            </span>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={whatIf}
              onChange={(e) => onWhatIfChange(parseInt(e.target.value))}
              className="w-16 sm:w-20 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              title={`Simulate +${whatIf}% completion impact`}
            />
            <span className={`font-bold ${whatIf > 0 ? "text-success" : "text-muted"}`}>
              +{whatIf}%
            </span>
          </div>

          {/* Export Report CSV */}
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-all shadow-sm active:scale-95"
            title="Download CSV report of current view"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* FR-5: Unified Filter Controls Row (Course, Term, Learner Group, Reset) */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1 text-xs font-medium border-t border-border/50">
        <span className="text-muted font-bold text-[11px] uppercase tracking-wider hidden sm:inline">
          Filters:
        </span>

        {/* 1. Course Filter */}
        <label className="flex items-center gap-1 bg-card px-2.5 py-1 rounded-lg border border-border">
          <span className="text-muted">Course:</span>
          <select
            value={course}
            onChange={(e) => onCourseChange(e.target.value)}
            className="bg-transparent text-foreground font-semibold outline-none cursor-pointer text-xs"
          >
            <option value="All">All Courses (7)</option>
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
        <label className="flex items-center gap-1 bg-card px-2.5 py-1 rounded-lg border border-border">
          <span className="text-muted">Term:</span>
          <select
            value={term}
            onChange={(e) => onTermChange(e.target.value)}
            className="bg-transparent text-foreground font-semibold outline-none cursor-pointer text-xs"
          >
            <option value="All">All Presentations (4)</option>
            <option value="2013B">2013B (Feb 2013)</option>
            <option value="2013J">2013J (Oct 2013)</option>
            <option value="2014B">2014B (Feb 2014)</option>
            <option value="2014J">2014J (Oct 2014)</option>
          </select>
        </label>

        {/* 3. Learner Group Filter (FR-5) */}
        <label className="flex items-center gap-1 bg-card px-2.5 py-1 rounded-lg border border-border">
          <span className="text-muted">Group:</span>
          <select
            value={learnerGroup}
            onChange={(e) => onLearnerGroupChange(e.target.value)}
            className="bg-transparent text-foreground font-semibold outline-none cursor-pointer text-xs"
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
            className="px-2.5 py-1 rounded-lg bg-border hover:bg-border-dark text-foreground font-semibold text-xs transition-colors"
            title="Reset all filters to defaults"
          >
            Reset Filters
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;

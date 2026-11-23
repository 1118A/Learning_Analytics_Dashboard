"use client";

import React from "react";
import Link from "next/link";

export interface NavSection {
  key: string;
  label: string;
  frBadge?: string;
  icon: (className?: string) => React.ReactNode;
}

export interface SidebarProps {
  activeSection: string;
  onSectionSelect: (sectionKey: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "overview",
    label: "Executive Overview",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "charts",
    label: "6 Core Charts",
    frBadge: "FR-3",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    key: "modules",
    label: "Modules & Cohorts",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    key: "regions",
    label: "Regional Map",
    frBadge: "Map",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    key: "demographics",
    label: "At-Risk Groups",
    frBadge: "Equity",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "recommendations",
    label: "Strategic Memo",
    frBadge: "FR-7",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15 2a6 6 0 0 0-6 6c0 2 1 3.5 2 4.5v1.5h6v-1.5c1-1 2-2.5 2-4.5a6 6 0 0 0-4-6z" />
      </svg>
    ),
  },
  {
    key: "numbers",
    label: "Numbers Check",
    frBadge: "FR-6",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    key: "definitions",
    label: "Plain Definitions",
    frBadge: "FR-2",
    icon: (c = "h-4 w-4") => (
      <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionSelect,
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Aside Container */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col font-sans ${
          mobileOpen ? "translate-x-0 w-[270px]" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-[72px]" : "md:w-[280px]"}`}
      >
        <div className="flex h-full flex-col">
          {/* Header & Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border bg-sidebar flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className={`flex flex-col min-w-0 ${collapsed ? "md:hidden" : "block"}`}>
                <span className="text-sm font-bold tracking-tight text-sidebar-foreground leading-tight">
                  OULAD Analytics
                </span>
                <span className="text-[10px] text-sidebar-text">EasySkillOS Project 1</span>
              </div>
            </Link>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex p-1.5 rounded-lg hover:bg-sidebar-hover-bg text-sidebar-text hover:text-sidebar-text-hover transition-colors"
                aria-label="Toggle sidebar width"
              >
                {collapsed ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="11 17 6 12 11 7" />
                    <polyline points="18 17 13 12 18 7" />
                  </svg>
                )}
              </button>
            )}

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg hover:bg-sidebar-hover-bg text-sidebar-text"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-4 px-2.5 overflow-y-auto space-y-1 scrollbar-hide">
            <div className={`px-2.5 pb-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-text/80 ${collapsed ? "md:hidden" : "block"}`}>
              Navigation
            </div>
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => {
                    onSectionSelect(section.key);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  title={collapsed ? section.label : undefined}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-text hover:bg-sidebar-hover-bg hover:text-sidebar-text-hover"
                  } ${collapsed ? "md:justify-center" : ""}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-shrink-0">{section.icon("h-4 w-4")}</span>
                    <span className={`${collapsed ? "md:hidden" : "block"} truncate`}>
                      {section.label}
                    </span>
                  </div>

                  {section.frBadge && !collapsed && (
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-sidebar-accent text-sidebar-text group-hover:text-white"
                      }`}
                    >
                      {section.frBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="p-3 border-t border-sidebar-border bg-sidebar flex-shrink-0">
            <div className={`flex items-center gap-2.5 p-2 rounded-xl bg-sidebar-accent/50 ${collapsed ? "md:justify-center" : ""}`}>
              <div className="h-2 w-2 rounded-full bg-success flex-shrink-0 animate-pulse" />
              <div className={`min-w-0 ${collapsed ? "md:hidden" : "block"}`}>
                <p className="text-xs font-bold text-sidebar-foreground truncate">32,593 Students</p>
                <p className="text-[10px] text-sidebar-text">Inter Font • 7 Modules • 13 Regions</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

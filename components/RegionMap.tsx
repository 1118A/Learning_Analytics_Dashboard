"use client";

import React, { useState, useMemo } from "react";

export interface RegionData {
  region: string;
  shortName: string;
  enrolled: number;
  withdrawalRate: number;
  completionRate: number;
  risk: "Low" | "Moderate" | "High";
  x: number; // SVG center position
  y: number;
  code: string;
  pathD: string; // SVG landmass polygon path
  rank: number; // Rank by attrition
}

export const REGIONS_DATA: RegionData[] = [
  {
    region: "Scotland",
    shortName: "Scotland",
    enrolled: 3446,
    withdrawalRate: 26.3,
    completionRate: 49.0,
    risk: "Low",
    x: 270,
    y: 110,
    code: "SCT",
    pathD: "M 220 50 Q 260 30 300 45 Q 345 80 325 125 Q 345 155 320 185 L 255 195 Q 215 185 205 145 Q 200 95 220 50 Z",
    rank: 11,
  },
  {
    region: "North Region",
    shortName: "North",
    enrolled: 1823,
    withdrawalRate: 31.5,
    completionRate: 50.5,
    risk: "Moderate",
    x: 270,
    y: 220,
    code: "NTH",
    pathD: "M 220 195 L 285 195 Q 315 210 310 245 L 255 255 L 215 240 Q 215 215 220 195 Z",
    rank: 6,
  },
  {
    region: "North Western Region",
    shortName: "North West",
    enrolled: 2906,
    withdrawalRate: 35.6,
    completionRate: 40.2,
    risk: "High",
    x: 215,
    y: 280,
    code: "NW",
    pathD: "M 215 240 L 255 255 L 250 305 L 195 295 Q 195 265 215 240 Z",
    rank: 1,
  },
  {
    region: "Yorkshire Region",
    shortName: "Yorkshire",
    enrolled: 2006,
    withdrawalRate: 32.8,
    completionRate: 44.9,
    risk: "Moderate",
    x: 295,
    y: 280,
    code: "YRK",
    pathD: "M 255 255 Q 315 240 335 270 L 315 315 L 250 305 Z",
    rank: 5,
  },
  {
    region: "West Midlands Region",
    shortName: "West Mids",
    enrolled: 2582,
    withdrawalRate: 35.4,
    completionRate: 43.3,
    risk: "High",
    x: 225,
    y: 345,
    code: "WM",
    pathD: "M 195 295 L 250 305 L 245 365 L 180 355 Q 185 320 195 295 Z",
    rank: 2,
  },
  {
    region: "East Midlands Region",
    shortName: "East Mids",
    enrolled: 2365,
    withdrawalRate: 34.8,
    completionRate: 45.7,
    risk: "High",
    x: 295,
    y: 345,
    code: "EM",
    pathD: "M 250 305 L 315 315 L 325 365 L 265 375 L 245 365 Z",
    rank: 3,
  },
  {
    region: "Wales",
    shortName: "Wales",
    enrolled: 2086,
    withdrawalRate: 25.1,
    completionRate: 45.2,
    risk: "Low",
    x: 155,
    y: 350,
    code: "WAL",
    pathD: "M 175 300 Q 190 315 175 350 L 170 395 Q 120 390 110 360 Q 120 315 145 300 Z",
    rank: 12,
  },
  {
    region: "East Anglian Region",
    shortName: "East Anglia",
    enrolled: 3340,
    withdrawalRate: 30.1,
    completionRate: 49.0,
    risk: "Moderate",
    x: 375,
    y: 375,
    code: "EA",
    pathD: "M 325 365 Q 395 350 405 390 Q 380 430 335 420 L 305 390 L 325 365 Z",
    rank: 9,
  },
  {
    region: "South West Region",
    shortName: "South West",
    enrolled: 2436,
    withdrawalRate: 31.1,
    completionRate: 49.8,
    risk: "Moderate",
    x: 135,
    y: 460,
    code: "SW",
    pathD: "M 170 395 L 225 400 L 210 460 L 145 470 Q 75 515 45 530 Q 45 505 85 480 L 140 435 Z",
    rank: 7,
  },
  {
    region: "South Region",
    shortName: "South",
    enrolled: 3092,
    withdrawalRate: 30.0,
    completionRate: 52.4,
    risk: "Moderate",
    x: 255,
    y: 425,
    code: "STH",
    pathD: "M 225 400 L 285 400 L 275 460 L 210 460 Z",
    rank: 10,
  },
  {
    region: "London Region",
    shortName: "London",
    enrolled: 3216,
    withdrawalRate: 34.5,
    completionRate: 42.4,
    risk: "High",
    x: 315,
    y: 415,
    code: "LDN",
    pathD: "M 285 400 L 330 400 L 330 435 L 285 435 Z",
    rank: 4,
  },
  {
    region: "South East Region",
    shortName: "South East",
    enrolled: 2111,
    withdrawalRate: 30.7,
    completionRate: 51.5,
    risk: "Moderate",
    x: 350,
    y: 465,
    code: "SE",
    pathD: "M 285 435 L 330 435 Q 385 435 395 460 Q 355 505 285 485 L 275 460 Z",
    rank: 8,
  },
  {
    region: "Ireland",
    shortName: "Ireland",
    enrolled: 1184,
    withdrawalRate: 23.1,
    completionRate: 54.9,
    risk: "Low",
    x: 85,
    y: 255,
    code: "IRL",
    pathD: "M 65 210 Q 105 190 125 210 Q 145 240 135 280 Q 115 320 85 330 Q 55 315 50 265 Z",
    rank: 13,
  },
];

export const RegionMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS_DATA[2]); // North Western default (High Risk)
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [riskFilter, setRiskFilter] = useState<"All" | "High" | "Moderate" | "Low">("All");
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  const getRiskColor = (risk: "Low" | "Moderate" | "High") => {
    switch (risk) {
      case "High":
        return "#ef4444";
      case "Moderate":
        return "#f59e0b";
      case "Low":
        return "#10b981";
    }
  };

  const filteredRegions = useMemo(() => {
    if (riskFilter === "All") return REGIONS_DATA;
    return REGIONS_DATA.filter((r) => r.risk === riskFilter);
  }, [riskFilter]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-card space-y-6 font-sans">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              UK Regional Distribution & Attrition Map
            </h3>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200">
              13 UK Regions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Spatial analysis across 32,593 learners identifying retention disparities and regional drop-off clusters
          </p>
        </div>

        {/* View Mode & Risk Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-auto">
          {/* Risk Level Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] font-bold">
            {(["All", "High", "Moderate", "Low"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setRiskFilter(tier)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  riskFilter === tier
                    ? "bg-white text-slate-900 shadow-sm font-extrabold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tier === "All" ? "All (13)" : tier}
              </button>
            ))}
          </div>

          {/* Map vs Grid Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] font-bold">
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === "map"
                  ? "bg-white text-slate-900 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Rankings Table
            </button>
          </div>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Authentic SVG Geographic Map */}
          <div className="lg:col-span-7 flex flex-col items-center bg-gradient-to-b from-slate-50 via-slate-50/80 to-blue-50/20 rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-inner relative overflow-hidden">
            {/* Quick Region Selector Dropdown */}
            <div className="w-full flex items-center justify-between mb-2 z-10 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Region on Map:
              </span>
              <select
                value={selectedRegion.region}
                onChange={(e) => {
                  const found = REGIONS_DATA.find((r) => r.region === e.target.value);
                  if (found) setSelectedRegion(found);
                }}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {REGIONS_DATA.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region} ({r.withdrawalRate}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full max-w-[440px] relative">
              <svg
                viewBox="0 0 450 560"
                className="w-full h-auto select-none overflow-visible font-sans drop-shadow-sm"
              >
                <defs>
                  {/* Subtle ocean grid pattern */}
                  <pattern id="oceanGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.8" fill="#cbd5e1" opacity="0.4" />
                  </pattern>

                  {/* Regional Glow Filters */}
                  <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Ocean Background */}
                <rect width="450" height="560" fill="url(#oceanGrid)" rx="16" />

                {/* 13 UK Geographic Polygons */}
                {REGIONS_DATA.map((reg) => {
                  const isSelected = selectedRegion.region === reg.region;
                  const isHovered = hoveredRegion?.region === reg.region;
                  const matchesFilter = riskFilter === "All" || reg.risk === riskFilter;
                  const baseColor = getRiskColor(reg.risk);

                  return (
                    <g
                      key={`poly-${reg.region}`}
                      onClick={() => setSelectedRegion(reg)}
                      onMouseEnter={() => setHoveredRegion(reg)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className="cursor-pointer transition-all duration-200"
                    >
                      {/* Region Territory Path */}
                      <path
                        d={reg.pathD}
                        fill={baseColor}
                        fillOpacity={
                          !matchesFilter
                            ? 0.15
                            : isSelected
                            ? 0.88
                            : isHovered
                            ? 0.72
                            : 0.42
                        }
                        stroke={isSelected ? "#0f172a" : "#ffffff"}
                        strokeWidth={isSelected ? 3 : 1.8}
                        strokeLinejoin="round"
                        className="transition-all duration-200 hover:brightness-105"
                        filter={isSelected ? "url(#glow-selected)" : undefined}
                      />
                    </g>
                  );
                })}

                {/* 13 Non-Overlapping Interactive Pins */}
                {REGIONS_DATA.map((reg) => {
                  const isSelected = selectedRegion.region === reg.region;
                  const isHovered = hoveredRegion?.region === reg.region;
                  const matchesFilter = riskFilter === "All" || reg.risk === riskFilter;
                  const baseColor = getRiskColor(reg.risk);

                  return (
                    <g
                      key={`pin-${reg.region}`}
                      onClick={() => setSelectedRegion(reg)}
                      onMouseEnter={() => setHoveredRegion(reg)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className={`cursor-pointer transition-all duration-200 ${
                        !matchesFilter ? "opacity-30" : "opacity-100"
                      }`}
                    >
                      {/* Outer pulse circle for selected region */}
                      {isSelected && (
                        <circle
                          cx={reg.x}
                          cy={reg.y}
                          r={21}
                          fill="none"
                          stroke={baseColor}
                          strokeWidth="2.5"
                          className="animate-ping"
                          opacity="0.6"
                        />
                      )}

                      {/* Pin Container Capsule */}
                      <rect
                        x={reg.x - 22}
                        y={reg.y - 12}
                        width={44}
                        height={24}
                        rx={12}
                        fill={isSelected ? "#0f172a" : "#ffffff"}
                        stroke={baseColor}
                        strokeWidth={isSelected ? 2 : 1.5}
                        className="drop-shadow-md transition-all duration-200 hover:scale-110 origin-center"
                      />

                      {/* Pin Label (Code) */}
                      <text
                        x={reg.x}
                        y={reg.y + 4}
                        textAnchor="middle"
                        fontSize="9.5"
                        fill={isSelected ? "#ffffff" : "#0f172a"}
                        fontWeight="800"
                        className="pointer-events-none tabular-nums font-sans"
                      >
                        {reg.code}
                      </text>

                      {/* Hover Tooltip (Appears right above pin when hovered) */}
                      {isHovered && !isSelected && (
                        <g className="transition-all pointer-events-none">
                          <rect
                            x={reg.x - 55}
                            y={reg.y - 36}
                            width={110}
                            height={20}
                            rx={5}
                            fill="#0f172a"
                            className="drop-shadow-lg"
                          />
                          <text
                            x={reg.x}
                            y={reg.y - 23}
                            textAnchor="middle"
                            fontSize="9"
                            fill="#ffffff"
                            fontWeight="700"
                          >
                            {reg.shortName} • {reg.withdrawalRate}%
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Legend */}
            <div className="w-full flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/60 mt-3 font-semibold">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Risk Tier:
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm" />
                  <span>&lt;28% Low</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm" />
                  <span>28–33% Med</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-sm" />
                  <span>&gt;33% High Risk</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Inspector Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-white shadow-card space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Region Profile #{selectedRegion.rank}
                    </span>
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${getRiskColor(selectedRegion.risk)}15`,
                        color: getRiskColor(selectedRegion.risk),
                      }}
                    >
                      {selectedRegion.risk} Risk
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    {selectedRegion.region}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black tabular-nums" style={{ color: getRiskColor(selectedRegion.risk) }}>
                    {selectedRegion.withdrawalRate}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-bold">Withdrawal Rate</span>
                </div>
              </div>

              {/* 4 KPI Grid Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">Enrolled Size</span>
                  <span className="text-lg font-black text-slate-900 tabular-nums">
                    {selectedRegion.enrolled.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {((selectedRegion.enrolled / 32593) * 100).toFixed(1)}% of total cohort
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">National Delta</span>
                  <span
                    className="text-lg font-black tabular-nums"
                    style={{ color: getRiskColor(selectedRegion.risk) }}
                  >
                    {selectedRegion.withdrawalRate > 31.2
                      ? `+${(selectedRegion.withdrawalRate - 31.2).toFixed(1)} pp`
                      : `${(selectedRegion.withdrawalRate - 31.2).toFixed(1)} pp`}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                    vs UK benchmark (31.2%)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">Pass & Distinction</span>
                  <span className="text-lg font-black text-emerald-600 tabular-nums">
                    {selectedRegion.completionRate}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                    Completion Rate
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">Estimated Dropouts</span>
                  <span className="text-lg font-black text-rose-600 tabular-nums">
                    {Math.round((selectedRegion.enrolled * selectedRegion.withdrawalRate) / 100).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                    students lost
                  </span>
                </div>
              </div>

              {/* Progress meter: Completion vs Withdrawal */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">Cohort Outcome Split</span>
                  <span className="text-slate-400 font-medium">100% Total</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex shadow-inner">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${selectedRegion.completionRate}%` }}
                    title={`Completion: ${selectedRegion.completionRate}%`}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${selectedRegion.withdrawalRate}%` }}
                    title={`Withdrawal: ${selectedRegion.withdrawalRate}%`}
                  />
                  <div
                    className="bg-amber-400 h-full transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        0,
                        100 - selectedRegion.completionRate - selectedRegion.withdrawalRate
                      )}%`,
                    }}
                    title="Fail / Incomplete"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold pt-0.5">
                  <span className="text-emerald-700">{selectedRegion.completionRate}% Pass</span>
                  <span className="text-rose-700">{selectedRegion.withdrawalRate}% Withdrawn</span>
                  <span className="text-amber-700">
                    {(100 - selectedRegion.completionRate - selectedRegion.withdrawalRate).toFixed(1)}% Fail
                  </span>
                </div>
              </div>

              {/* Geographic Insight takeaway */}
              <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs">
                <span className="font-black text-primary block text-[11px] uppercase tracking-wider mb-1">
                  Regional Retention Insight:
                </span>
                <p className="text-slate-700 leading-relaxed font-normal">
                  {selectedRegion.withdrawalRate > 34
                    ? `${selectedRegion.region} ranks #${selectedRegion.rank} in attrition (${selectedRegion.withdrawalRate}%). Heavy drop-off correlates with higher concentrations of IMD-deprived postal areas and technical connectivity barriers.`
                    : `${selectedRegion.region} ranks #${selectedRegion.rank} in retention (${selectedRegion.withdrawalRate}%). Consistently outperforms national averages due to established regional tutor cohorts and peer study groups.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid / Rankings View */
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[10.5px] font-extrabold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Region Name</th>
                <th className="py-3 px-3 text-right">Enrolled</th>
                <th className="py-3 px-3 text-right">Cohort Share</th>
                <th className="py-3 px-3 text-right">Completion %</th>
                <th className="py-3 px-3 text-right">Withdrawal %</th>
                <th className="py-3 px-3 text-center">Risk Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRegions
                .sort((a, b) => b.withdrawalRate - a.withdrawalRate)
                .map((r, index) => (
                  <tr
                    key={r.region}
                    onClick={() => {
                      setSelectedRegion(r);
                      setViewMode("map");
                    }}
                    className={`hover:bg-slate-50/90 cursor-pointer transition-colors ${
                      selectedRegion.region === r.region ? "bg-orange-50/50 font-bold" : ""
                    }`}
                  >
                    <td className="py-3.5 px-3 font-extrabold text-slate-400 tabular-nums">#{index + 1}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{r.region}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-slate-700 tabular-nums">
                      {r.enrolled.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-500 tabular-nums">
                      {((r.enrolled / 32593) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-emerald-600 tabular-nums">
                      {r.completionRate}%
                    </td>
                    <td
                      className="py-3.5 px-3 text-right font-black tabular-nums"
                      style={{ color: getRiskColor(r.risk) }}
                    >
                      {r.withdrawalRate}%
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${getRiskColor(r.risk)}15`,
                          color: getRiskColor(r.risk),
                          borderColor: `${getRiskColor(r.risk)}30`,
                          borderWidth: 1,
                        }}
                      >
                        {r.risk}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Takeaway */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="inline-flex items-center gap-2 text-slate-700 font-medium">
          <span className="font-black text-[10px] uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-orange-50 border border-orange-200/60">
            Takeaway
          </span>
          <span>
            North Western (35.6%) and West Midlands (35.4%) face the highest attrition rates, while Ireland (23.1%) and Wales (25.1%) remain the most resilient.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionMap;

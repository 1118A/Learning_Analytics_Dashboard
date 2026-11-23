"use client";

import React, { useState } from "react";

export interface RegionData {
  region: string;
  shortName: string;
  enrolled: number;
  withdrawalRate: number;
  completionRate: number;
  risk: "Low" | "Moderate" | "High";
  x: number; // SVG schematic position
  y: number;
  code: string;
}

export const REGIONS_DATA: RegionData[] = [
  { region: "Scotland", shortName: "Scotland", enrolled: 3446, withdrawalRate: 26.3, completionRate: 49.0, risk: "Low", x: 190, y: 70, code: "SCT" },
  { region: "North Region", shortName: "North", enrolled: 1823, withdrawalRate: 31.5, completionRate: 50.5, risk: "Moderate", x: 215, y: 145, code: "NTH" },
  { region: "North Western Region", shortName: "North West", enrolled: 2906, withdrawalRate: 35.6, completionRate: 40.2, risk: "High", x: 175, y: 195, code: "NW" },
  { region: "Yorkshire Region", shortName: "Yorkshire", enrolled: 2006, withdrawalRate: 32.8, completionRate: 44.9, risk: "Moderate", x: 235, y: 195, code: "YRK" },
  { region: "East Midlands Region", shortName: "East Midlands", enrolled: 2365, withdrawalRate: 34.8, completionRate: 45.7, risk: "High", x: 235, y: 245, code: "EM" },
  { region: "West Midlands Region", shortName: "West Midlands", enrolled: 2582, withdrawalRate: 35.4, completionRate: 43.3, risk: "High", x: 175, y: 255, code: "WM" },
  { region: "Wales", shortName: "Wales", enrolled: 2086, withdrawalRate: 25.1, completionRate: 45.2, risk: "Low", x: 130, y: 285, code: "WAL" },
  { region: "East Anglian Region", shortName: "East Anglia", enrolled: 3340, withdrawalRate: 30.1, completionRate: 49.0, risk: "Moderate", x: 280, y: 275, code: "EA" },
  { region: "South Region", shortName: "South", enrolled: 3092, withdrawalRate: 30.0, completionRate: 52.4, risk: "Moderate", x: 210, y: 310, code: "STH" },
  { region: "London Region", shortName: "London", enrolled: 3216, withdrawalRate: 34.5, completionRate: 42.4, risk: "High", x: 255, y: 325, code: "LDN" },
  { region: "South East Region", shortName: "South East", enrolled: 2111, withdrawalRate: 30.7, completionRate: 51.5, risk: "Moderate", x: 280, y: 345, code: "SE" },
  { region: "South West Region", shortName: "South West", enrolled: 2436, withdrawalRate: 31.1, completionRate: 49.8, risk: "Moderate", x: 135, y: 355, code: "SW" },
  { region: "Ireland", shortName: "Ireland", enrolled: 1184, withdrawalRate: 23.1, completionRate: 54.9, risk: "Low", x: 75, y: 230, code: "IRL" },
];

export const RegionMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS_DATA[0]);
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  const getRiskColor = (risk: "Low" | "Moderate" | "High") => {
    switch (risk) {
      case "High":
        return "#ef4444";
      case "Moderate":
        return "#f59e0b";
      case "Low":
        return "#22c55e";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card space-y-5">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              UK Regional Distribution & Attrition Map
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              13 UK Regions
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Geographic analysis of 32,593 learners identifying regional retention disparities
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-soft border border-border text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode("map")}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewMode === "map"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted hover:text-foreground"
            }`}
          >
            Geographic Map
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted hover:text-foreground"
            }`}
          >
            Regional Rankings
          </button>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Schematic UK Map */}
          <div className="lg:col-span-7 flex justify-center bg-brand-soft rounded-2xl p-4 border border-border/60">
            <svg
              viewBox="0 0 380 410"
              className="w-full max-w-[380px] h-auto select-none overflow-visible"
            >
              {/* Subtle background UK geography outline hints */}
              <path
                d="M170 30 Q 210 20 230 50 Q 200 90 220 120 Q 240 160 250 200 Q 290 250 310 290 Q 290 350 260 370 Q 180 390 120 370 Q 100 340 140 310 Q 110 260 140 220 Q 160 160 170 110 Z"
                fill="none"
                stroke="var(--border, #e2e8f0)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Ireland outline hint */}
              <circle
                cx="75"
                cy="230"
                r="45"
                fill="none"
                stroke="var(--border, #e2e8f0)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Region Nodes */}
              {REGIONS_DATA.map((reg) => {
                const isSelected = selectedRegion.region === reg.region;
                const color = getRiskColor(reg.risk);
                const radius = Math.max(Math.sqrt(reg.enrolled) * 0.42, 12);

                return (
                  <g
                    key={reg.region}
                    onClick={() => setSelectedRegion(reg)}
                    className="cursor-pointer transition-all duration-200 group"
                  >
                    {/* Pulsing selection ring */}
                    {isSelected && (
                      <circle
                        cx={reg.x}
                        cy={reg.y}
                        r={radius + 6}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}

                    {/* Node bubble */}
                    <circle
                      cx={reg.x}
                      cy={reg.y}
                      r={radius}
                      fill={color}
                      fillOpacity={isSelected ? 0.95 : 0.75}
                      stroke={isSelected ? "#ffffff" : "var(--card, #ffffff)"}
                      strokeWidth="2.5"
                      className="group-hover:scale-110 transition-transform origin-center shadow-md"
                    />

                    {/* Short code label */}
                    <text
                      x={reg.x}
                      y={reg.y + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="800"
                      className="pointer-events-none"
                    >
                      {reg.code}
                    </text>

                    {/* Hover text label */}
                    <text
                      x={reg.x}
                      y={reg.y - radius - 4}
                      textAnchor="middle"
                      fill="var(--foreground, #0f172a)"
                      fontSize="9"
                      fontWeight={isSelected ? "800" : "600"}
                      className={`pointer-events-none transition-all ${
                        isSelected ? "opacity-100" : "opacity-75 group-hover:opacity-100"
                      }`}
                    >
                      {reg.shortName} ({reg.withdrawalRate}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detailed Inspector Panel for Selected Region */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted">
                    Region Inspector
                  </span>
                  <h4 className="text-xl font-black text-foreground">
                    {selectedRegion.region}
                  </h4>
                </div>

                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: `${getRiskColor(selectedRegion.risk)}15`,
                    color: getRiskColor(selectedRegion.risk),
                    borderColor: `${getRiskColor(selectedRegion.risk)}30`,
                    borderWidth: 1,
                  }}
                >
                  {selectedRegion.risk} Risk
                </span>
              </div>

              {/* Stat breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-brand-soft border border-border/70">
                  <span className="text-[10px] text-muted block font-semibold">Total Registered</span>
                  <span className="text-lg font-black text-foreground">
                    {selectedRegion.enrolled.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    {((selectedRegion.enrolled / 32593) * 100).toFixed(1)}% of cohort
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-brand-soft border border-border/70">
                  <span className="text-[10px] text-muted block font-semibold">Withdrawal Rate</span>
                  <span
                    className="text-lg font-black"
                    style={{ color: getRiskColor(selectedRegion.risk) }}
                  >
                    {selectedRegion.withdrawalRate}%
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    {selectedRegion.withdrawalRate > 31.2
                      ? `+${(selectedRegion.withdrawalRate - 31.2).toFixed(1)} pp vs avg`
                      : `${(selectedRegion.withdrawalRate - 31.2).toFixed(1)} pp vs avg`}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-brand-soft border border-border/70">
                  <span className="text-[10px] text-muted block font-semibold">Completion Rate</span>
                  <span className="text-lg font-black text-success">
                    {selectedRegion.completionRate}%
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    Distinction + Pass
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-brand-soft border border-border/70">
                  <span className="text-[10px] text-muted block font-semibold">Dropout Total</span>
                  <span className="text-lg font-black text-error">
                    {Math.round((selectedRegion.enrolled * selectedRegion.withdrawalRate) / 100).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-muted block mt-0.5">
                    withdrawn students
                  </span>
                </div>
              </div>

              {/* Geographic Insight takeaway */}
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                <span className="font-bold text-primary block text-[11px] mb-0.5">
                  Regional Retentive Insight:
                </span>
                <p className="text-muted leading-relaxed">
                  {selectedRegion.withdrawalRate > 34
                    ? `${selectedRegion.region} displays significant early-semester drop-off (${selectedRegion.withdrawalRate}%), primarily tied to higher concentrations of IMD-deprived postal areas.`
                    : `${selectedRegion.region} demonstrates stronger-than-average retention (${selectedRegion.withdrawalRate}%), benefiting from established regional study centers.`}
                </p>
              </div>
            </div>

            {/* Quick legend */}
            <div className="flex items-center justify-between text-xs text-muted px-2">
              <span className="font-semibold text-[11px]">Risk Levels:</span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="h-2 w-2 rounded-full bg-success" /> &lt;28% Low
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="h-2 w-2 rounded-full bg-warning" /> 28-33% Med
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="h-2 w-2 rounded-full bg-error" /> &gt;33% High
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid / Rankings View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-muted uppercase tracking-wider">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Region Name</th>
                <th className="pb-3 text-right">Enrolled</th>
                <th className="pb-3 text-right">Cohort Share</th>
                <th className="pb-3 text-right">Completion %</th>
                <th className="pb-3 text-right">Withdrawal %</th>
                <th className="pb-3 text-center">Risk Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...REGIONS_DATA]
                .sort((a, b) => b.withdrawalRate - a.withdrawalRate)
                .map((r, index) => (
                  <tr
                    key={r.region}
                    onClick={() => {
                      setSelectedRegion(r);
                      setViewMode("map");
                    }}
                    className="hover:bg-brand-soft/80 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 font-bold text-muted">#{index + 1}</td>
                    <td className="py-2.5 font-semibold text-foreground">{r.region}</td>
                    <td className="py-2.5 text-right font-medium">{r.enrolled.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-muted">
                      {((r.enrolled / 32593) * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 text-right font-bold text-success">{r.completionRate}%</td>
                    <td className="py-2.5 text-right font-bold" style={{ color: getRiskColor(r.risk) }}>
                      {r.withdrawalRate}%
                    </td>
                    <td className="py-2.5 text-center">
                      <span
                        className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${getRiskColor(r.risk)}15`,
                          color: getRiskColor(r.risk),
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
      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
        <div className="inline-flex items-center gap-1.5 text-primary font-semibold">
          <span className="font-extrabold text-[10px] uppercase tracking-wider">Takeaway:</span>
          <span>
            North Western (35.6%) and West Midlands (35.4%) face the highest withdrawal rates, while Ireland (23.1%) and Wales (25.1%) are lowest.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionMap;

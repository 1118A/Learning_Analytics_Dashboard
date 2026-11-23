"use client";

import React from "react";

export interface BarChartItem {
  label: string;
  value: number;
  color?: string;
  subLabel?: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  className?: string;
  height?: number;
  barWidth?: number;
  showValues?: boolean;
  valueSuffix?: string;
  benchmark?: {
    value: number;
    label: string;
    color?: string;
  };
}

export const BarChart: React.FC<BarChartProps> = ({
  data = [],
  className = "",
  height = 230,
  barWidth = 34,
  showValues = true,
  valueSuffix = "%",
  benchmark,
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-muted text-sm border border-dashed border-border rounded-xl ${className}`}
        style={{ height }}
      >
        No chart data available
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const maxDataVal = Math.max(...values, benchmark ? benchmark.value : 0, 1);
  // Add 15% headroom for top labels
  const maxValue = maxDataVal * 1.15;

  const barGap = 20;
  const paddingX = 24;
  const totalWidth = Math.max(data.length * (barWidth + barGap) - barGap + paddingX * 2, 320);
  const chartHeight = height;
  const topPadding = 26;
  const bottomPadding = 32;
  const usableHeight = chartHeight - topPadding - bottomPadding;

  const formatVal = (v: number) => {
    if (valueSuffix === "%") {
      return `${v}%`;
    }
    if (v >= 1000) {
      return v.toLocaleString();
    }
    return `${v}${valueSuffix || ""}`;
  };

  return (
    <div className={`w-full overflow-x-auto scrollbar-hide ${className}`}>
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${totalWidth} ${chartHeight}`}
        className="overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Baseline grid */}
        <line
          x1={paddingX - 8}
          y1={chartHeight - bottomPadding}
          x2={totalWidth - paddingX + 8}
          y2={chartHeight - bottomPadding}
          stroke="var(--border, #e2e8f0)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Optional Benchmark Line (e.g. Average) */}
        {benchmark && (
          <g className="transition-all duration-300">
            {(() => {
              const benchY = chartHeight - bottomPadding - (benchmark.value / maxValue) * usableHeight;
              return (
                <>
                  <line
                    x1={paddingX - 6}
                    y1={benchY}
                    x2={totalWidth - paddingX + 6}
                    y2={benchY}
                    stroke={benchmark.color || "#94a3b8"}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={totalWidth - paddingX + 8}
                    y={benchY - 4}
                    textAnchor="end"
                    fontSize="10"
                    fill={benchmark.color || "#64748b"}
                    fontWeight="600"
                  >
                    {benchmark.label} ({benchmark.value}%)
                  </text>
                </>
              );
            })()}
          </g>
        )}

        {/* Data Bars */}
        {data.map((item, index) => {
          const barHeight = Math.max((item.value / maxValue) * usableHeight, 3);
          const x = paddingX + index * (barWidth + barGap);
          const y = chartHeight - bottomPadding - barHeight;
          const barColor = item.color || "#ff6b35";

          return (
            <g key={item.label || index} className="group cursor-default">
              {/* Bar Rect */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                rx={6}
                className="transition-all duration-200 group-hover:opacity-80"
              />

              {/* Top Value */}
              {showValues && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--foreground, #0f172a)"
                  fontWeight="700"
                  className="transition-all"
                >
                  {formatVal(item.value)}
                </text>
              )}

              {/* Bottom Label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 12}
                textAnchor="middle"
                fontSize="11"
                fill="var(--muted, #64748b)"
                fontWeight="600"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;

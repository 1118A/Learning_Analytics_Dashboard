"use client";

import React from "react";

export interface LineChartPoint {
  x: string | number;
  y: number;
  label?: string;
  subLabel?: string;
}

export interface LineChartProps {
  data: LineChartPoint[];
  className?: string;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  area?: boolean;
  strokeWidth?: number;
  valueSuffix?: string;
  valuePrefix?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data = [],
  className = "",
  height = 220,
  strokeColor = "#ff5722",
  fillColor,
  area = true,
  strokeWidth = 2.5,
  valueSuffix = "%",
  valuePrefix = "",
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl ${className}`}
        style={{ height }}
      >
        No chart data available
      </div>
    );
  }

  const viewBoxWidth = 440;
  const viewBoxHeight = height;
  const paddingLeft = 46;
  const paddingRight = 46;
  const paddingTop = 36;
  const paddingBottom = 48; // Ample room for 2-line x-labels (Code + Term)

  const usableW = viewBoxWidth - paddingLeft - paddingRight;
  const usableH = viewBoxHeight - paddingTop - paddingBottom;

  const yValues = data.map((d) => d.y);
  const rawMinY = Math.min(...yValues);
  const rawMaxY = Math.max(...yValues);
  // Add 40% visual headroom so points and top labels never clip
  const ySpan = rawMaxY - rawMinY || 2;
  const paddingY = ySpan * 0.45;
  const minY = Math.max(0, parseFloat((rawMinY - paddingY).toFixed(1)));
  const maxY = parseFloat((rawMaxY + paddingY).toFixed(1));
  const rangeY = maxY - minY || 1;

  const points = data.map((pt, i) => {
    const x =
      data.length === 1
        ? viewBoxWidth / 2
        : paddingLeft + (i / (data.length - 1)) * usableW;
    const y =
      viewBoxHeight - paddingBottom - ((pt.y - minY) / rangeY) * usableH;
    return { x, y, pt };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? "M" : "L"} ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(2)} ${viewBoxHeight - paddingBottom} L ${points[0].x.toFixed(2)} ${viewBoxHeight - paddingBottom} Z`;

  return (
    <div className={`w-full overflow-x-auto scrollbar-hide ${className}`}>
      <svg
        width="100%"
        height={viewBoxHeight}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="overflow-visible select-none font-sans"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor || strokeColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={fillColor || strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Subtle Horizontal Guide Lines */}
        {[0.25, 0.5, 0.75].map((fraction) => {
          const y = viewBoxHeight - paddingBottom - fraction * usableH;
          return (
            <line
              key={fraction}
              x1={paddingLeft - 10}
              y1={y}
              x2={viewBoxWidth - paddingRight + 10}
              y2={y}
              stroke="#f1f5f9"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Baseline Axis */}
        <line
          x1={paddingLeft - 10}
          y1={viewBoxHeight - paddingBottom}
          x2={viewBoxWidth - paddingRight + 10}
          y2={viewBoxHeight - paddingBottom}
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Area Fill */}
        {area && <path d={areaD} fill="url(#lineAreaGradient)" />}

        {/* Path Curve */}
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Points and Hover Indicators */}
        {points.map((p, i) => {
          const formattedVal = `${valuePrefix}${p.pt.y}${valueSuffix}`;
          const pillWidth = Math.max(formattedVal.length * 7.5 + 10, 42);

          return (
            <g key={i} className="group">
              {/* Outer Glow Ring on Hover */}
              <circle
                cx={p.x}
                cy={p.y}
                r="7"
                fill={strokeColor}
                fillOpacity="0.15"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Point Circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth="2.5"
                className="group-hover:scale-125 transition-transform origin-center cursor-pointer shadow-sm"
              />

              {/* Value Callout with Pill Background */}
              <g className="transition-all">
                <rect
                  x={p.x - pillWidth / 2}
                  y={p.y - 23}
                  width={pillWidth}
                  height={16}
                  rx={4}
                  fill="#ffffff"
                  fillOpacity="0.95"
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                  className="shadow-sm"
                />
                <text
                  x={p.x}
                  y={p.y - 11}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#090d16"
                  fontWeight="800"
                  className="tabular-nums font-sans"
                >
                  {formattedVal}
                </text>
              </g>

              {/* Two-line X-axis Label (Code + Term) */}
              <g className="transition-all">
                <text
                  x={p.x}
                  y={viewBoxHeight - paddingBottom + 16}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="#1e293b"
                  fontWeight="700"
                  className="font-sans group-hover:fill-primary transition-colors"
                >
                  {p.pt.x}
                </text>
                {p.pt.subLabel && (
                  <text
                    x={p.x}
                    y={viewBoxHeight - paddingBottom + 29}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#64748b"
                    fontWeight="500"
                    className="font-sans"
                  >
                    {p.pt.subLabel}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default LineChart;

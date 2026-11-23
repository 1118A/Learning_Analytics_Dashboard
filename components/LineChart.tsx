"use client";

import React from "react";

export interface LineChartPoint {
  x: string | number;
  y: number;
  label?: string;
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
}

export const LineChart: React.FC<LineChartProps> = ({
  data = [],
  className = "",
  height = 200,
  strokeColor = "#ff6b35",
  fillColor,
  area = true,
  strokeWidth = 2.5,
  valueSuffix = "%",
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

  const viewBoxWidth = 360;
  const viewBoxHeight = 160;
  const paddingLeft = 32;
  const paddingRight = 24;
  const paddingTop = 20;
  const paddingBottom = 30;

  const usableW = viewBoxWidth - paddingLeft - paddingRight;
  const usableH = viewBoxHeight - paddingTop - paddingBottom;

  const yValues = data.map((d) => d.y);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const rangeY = maxY === minY ? 1 : maxY - minY;

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
    <div className={`w-full ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="overflow-visible select-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor || strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={fillColor || strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Base Grid Line */}
        <line
          x1={paddingLeft - 8}
          y1={viewBoxHeight - paddingBottom}
          x2={viewBoxWidth - paddingRight + 8}
          y2={viewBoxHeight - paddingBottom}
          stroke="var(--border, #e2e8f0)"
          strokeWidth="1"
        />

        {/* Area fill */}
        {area && <path d={areaD} fill="url(#lineAreaGrad)" />}

        {/* Stroke Line */}
        <path
          d={pathD}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Data Circles and Labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="var(--background, #ffffff)"
              stroke={strokeColor}
              strokeWidth="2"
              className="hover:scale-125 transition-transform"
            />
            {/* Value on point */}
            <text
              x={p.x}
              y={p.y - 7}
              textAnchor="middle"
              fontSize="9"
              fill="var(--foreground, #0f172a)"
              fontWeight="700"
            >
              {p.pt.y}
              {valueSuffix}
            </text>
            {/* X label */}
            <text
              x={p.x}
              y={viewBoxHeight - 12}
              textAnchor="middle"
              fontSize="9"
              fill="var(--muted, #64748b)"
              fontWeight="500"
            >
              {p.pt.label || p.pt.x}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default LineChart;

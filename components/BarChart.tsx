"use client";

import React from "react";

export interface BarChartItem {
  label: string;
  subLabel?: string;
  value: number;
  color?: string;
  formattedValue?: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  className?: string;
  height?: number;
  barWidth?: number;
  layout?: "vertical" | "horizontal";
  showValues?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  rotateLabels?: boolean;
  benchmark?: {
    value: number;
    label: string;
    color?: string;
  };
}

/**
 * Intelligent helper to split long labels into main label and subLabel
 * to prevent text clipping and overlapping.
 */
function splitLabel(label: string, subLabel?: string): { main: string; sub?: string } {
  if (subLabel) {
    return { main: label, sub: subLabel };
  }
  if (label.includes("\n")) {
    const parts = label.split("\n");
    return { main: parts[0], sub: parts.slice(1).join(" ") };
  }
  if (label.length > 8 && label.includes(" ")) {
    const words = label.trim().split(/\s+/);
    if (words.length === 2) {
      return { main: words[0], sub: words[1] };
    }
    const mid = Math.ceil(words.length / 2);
    return {
      main: words.slice(0, mid).join(" "),
      sub: words.slice(mid).join(" "),
    };
  }
  return { main: label };
}

export const BarChart: React.FC<BarChartProps> = ({
  data = [],
  className = "",
  height = 240,
  barWidth,
  layout = "vertical",
  showValues = true,
  valuePrefix = "",
  valueSuffix = "%",
  rotateLabels,
  benchmark,
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

  const values = data.map((d) => d.value);
  const maxDataVal = Math.max(...values, benchmark ? benchmark.value : 0, 1);
  const maxValue = maxDataVal * 1.25;

  const formatVal = (v: number) => {
    let formatted = "";
    if (valueSuffix === "%") {
      formatted = `${v}%`;
    } else if (v >= 1000) {
      formatted = `${valuePrefix}${v.toLocaleString()}${valueSuffix ? ` ${valueSuffix}` : ""}`;
    } else {
      formatted = `${valuePrefix}${v}${valueSuffix ? ` ${valueSuffix}` : ""}`;
    }
    return formatted.trim();
  };

  // =========================================================================
  // HORIZONTAL LAYOUT (Perfect for categorical ranking and long labels)
  // =========================================================================
  if (layout === "horizontal") {
    const rowHeight = 36;
    const topPadding = 30;
    const bottomPadding = 20;
    const labelWidth = 145;
    const paddingRight = 68;
    const chartHeight = Math.max(data.length * rowHeight + topPadding + bottomPadding, height);
    const totalWidth = 520;
    const usableWidth = totalWidth - labelWidth - paddingRight;

    return (
      <div className={`w-full overflow-x-auto scrollbar-hide ${className}`}>
        <svg
          width="100%"
          height={chartHeight}
          viewBox={`0 0 ${totalWidth} ${chartHeight}`}
          className="overflow-visible select-none font-sans"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {data.map((item, i) => {
              const baseColor = item.color || "#ff5722";
              return (
                <linearGradient
                  key={`h-grad-${i}`}
                  id={`h-bar-grad-${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={baseColor} stopOpacity="0.88" />
                  <stop offset="100%" stopColor={baseColor} stopOpacity="1" />
                </linearGradient>
              );
            })}
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1.0].map((fraction) => {
            const x = labelWidth + fraction * usableWidth;
            return (
              <line
                key={fraction}
                x1={x}
                y1={topPadding - 8}
                x2={x}
                y2={chartHeight - bottomPadding}
                stroke="#f1f5f9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Benchmark Line */}
          {benchmark && (
            <g className="transition-all duration-300">
              {(() => {
                const benchX = labelWidth + (benchmark.value / maxValue) * usableWidth;
                return (
                  <>
                    <line
                      x1={benchX}
                      y1={topPadding - 14}
                      x2={benchX}
                      y2={chartHeight - bottomPadding + 4}
                      stroke={benchmark.color || "#64748b"}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <rect
                      x={benchX - 32}
                      y={topPadding - 24}
                      width={64}
                      height={16}
                      rx={4}
                      fill="#ffffff"
                      stroke={benchmark.color || "#cbd5e1"}
                      strokeWidth="1"
                      className="shadow-sm"
                    />
                    <text
                      x={benchX}
                      y={topPadding - 12}
                      textAnchor="middle"
                      fontSize="9"
                      fill={benchmark.color || "#475569"}
                      fontWeight="700"
                    >
                      {benchmark.label}
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {/* Left Baseline Axis */}
          <line
            x1={labelWidth}
            y1={topPadding - 8}
            x2={labelWidth}
            y2={chartHeight - bottomPadding}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Horizontal Rows */}
          {data.map((item, index) => {
            const y = topPadding + index * rowHeight;
            const hBarWidth = Math.max((item.value / maxValue) * usableWidth, 6);
            const actualBarHeight = barWidth || 18;
            const formattedVal = item.formattedValue || formatVal(item.value);

            return (
              <g key={item.label || index} className="group cursor-default">
                {/* Background row highlight on hover */}
                <rect
                  x={4}
                  y={y - 4}
                  width={totalWidth - 8}
                  height={rowHeight - 2}
                  rx={6}
                  fill="#f8fafc"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />

                {/* Y-Axis Label (Left) */}
                <text
                  x={labelWidth - 12}
                  y={y + actualBarHeight / 2 + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#1e293b"
                  fontWeight="700"
                  className="group-hover:fill-primary transition-colors font-sans"
                >
                  {item.label}
                  {item.subLabel ? ` (${item.subLabel})` : ""}
                </text>

                {/* Horizontal Bar */}
                <rect
                  x={labelWidth}
                  y={y}
                  width={hBarWidth}
                  height={actualBarHeight}
                  fill={`url(#h-bar-grad-${index})`}
                  rx={5}
                  className="transition-all duration-200 group-hover:brightness-105"
                />

                {/* Value Label (Right of bar) */}
                {showValues && (
                  <text
                    x={labelWidth + hBarWidth + 8}
                    y={y + actualBarHeight / 2 + 4}
                    textAnchor="start"
                    fontSize="10.5"
                    fill="#0f172a"
                    fontWeight="800"
                    className="tabular-nums font-sans"
                  >
                    {formattedVal}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // =========================================================================
  // VERTICAL LAYOUT (With Angled X-Labels to Prevent Merging)
  // =========================================================================
  // Determine if x-labels should be angled/rotated:
  // Auto-rotate if rotateLabels is explicitly true OR if data has 5+ items with multi-char labels
  const isRotated =
    rotateLabels !== undefined
      ? rotateLabels
      : data.length >= 5 || data.some((d) => d.label.length > 7);

  const topPadding = 38;
  // Use ample bottom padding when rotated so labels never get cut off
  const bottomPadding = isRotated ? 76 : 48;
  const chartHeight = isRotated ? Math.max(height, 260) : height;
  const paddingLeft = isRotated ? 32 : 24;
  const paddingRight = benchmark ? 76 : 24;
  const usableHeight = chartHeight - topPadding - bottomPadding;

  // Compute slot width and total chart width
  const minSlotWidth = isRotated ? 60 : 48;
  const calculatedWidth = Math.max(data.length * minSlotWidth + paddingLeft + paddingRight, 420);
  const totalWidth = calculatedWidth;
  const usableWidth = totalWidth - paddingLeft - paddingRight;
  const slotWidth = usableWidth / data.length;

  // Determine optimal bar width
  const optimalBarWidth = barWidth
    ? Math.min(barWidth, slotWidth * 0.70)
    : Math.min(Math.max(slotWidth * 0.52, 22), 46);

  return (
    <div className={`w-full overflow-x-auto scrollbar-hide ${className}`}>
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${totalWidth} ${chartHeight}`}
        className="overflow-visible select-none font-sans"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {data.map((item, i) => {
            const baseColor = item.color || "#ff5722";
            return (
              <linearGradient
                key={`grad-${i}`}
                id={`bar-grad-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={baseColor} stopOpacity="1" />
                <stop offset="100%" stopColor={baseColor} stopOpacity="0.82" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Subtle Horizontal Grid Guidelines */}
        {[0.25, 0.5, 0.75].map((fraction) => {
          const y = chartHeight - bottomPadding - fraction * usableHeight;
          return (
            <line
              key={fraction}
              x1={paddingLeft - 8}
              y1={y}
              x2={totalWidth - paddingRight + 8}
              y2={y}
              stroke="#f1f5f9"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Baseline Axis */}
        <line
          x1={paddingLeft - 8}
          y1={chartHeight - bottomPadding}
          x2={totalWidth - paddingRight + 8}
          y2={chartHeight - bottomPadding}
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Optional Benchmark Line (e.g. National Average) */}
        {benchmark && (
          <g className="transition-all duration-300">
            {(() => {
              const benchY = chartHeight - bottomPadding - (benchmark.value / maxValue) * usableHeight;
              return (
                <>
                  <line
                    x1={paddingLeft - 8}
                    y1={benchY}
                    x2={totalWidth - paddingRight + 6}
                    y2={benchY}
                    stroke={benchmark.color || "#64748b"}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Clean benchmark pill placed in the designated right margin */}
                  <rect
                    x={totalWidth - paddingRight + 8}
                    y={benchY - 9}
                    width={64}
                    height={18}
                    rx={4}
                    fill="#ffffff"
                    stroke={benchmark.color || "#cbd5e1"}
                    strokeWidth="1"
                    className="shadow-sm"
                  />
                  <text
                    x={totalWidth - paddingRight + 40}
                    y={benchY + 3.5}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={benchmark.color || "#475569"}
                    fontWeight="700"
                    className="font-sans"
                  >
                    {benchmark.label}
                  </text>
                </>
              );
            })()}
          </g>
        )}

        {/* Data Bars */}
        {data.map((item, index) => {
          const barHeight = Math.max((item.value / maxValue) * usableHeight, 4);
          const slotX = paddingLeft + index * slotWidth;
          const x = slotX + (slotWidth - optimalBarWidth) / 2;
          const y = chartHeight - bottomPadding - barHeight;

          const labelInfo = splitLabel(item.label, item.subLabel);
          const formattedVal = item.formattedValue || formatVal(item.value);

          // Top value pill width
          const charLen = formattedVal.length;
          const pillWidth = Math.max(charLen * 7.2 + 10, optimalBarWidth + 4);

          return (
            <g key={item.label || index} className="group cursor-default">
              {/* Background slot subtle highlight on hover */}
              <rect
                x={slotX + 2}
                y={topPadding - 4}
                width={slotWidth - 4}
                height={usableHeight + 8}
                rx={8}
                fill="#f8fafc"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {/* Bar Rect with Gradient */}
              <rect
                x={x}
                y={y}
                width={optimalBarWidth}
                height={barHeight}
                fill={`url(#bar-grad-${index})`}
                rx={6}
                className="transition-all duration-200 group-hover:brightness-105"
              />

              {/* Top Value Pill & Text (Data Label) */}
              {showValues && (
                <g className="transition-all">
                  <rect
                    x={x + optimalBarWidth / 2 - pillWidth / 2}
                    y={y - 20}
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
                    x={x + optimalBarWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="#090d16"
                    fontWeight="800"
                    className="tabular-nums font-sans"
                  >
                    {formattedVal}
                  </text>
                </g>
              )}

              {/* Bottom X-Labels (Separated with Angled Rotation or Two-Line Layout) */}
              {isRotated ? (
                <g
                  transform={`translate(${x + optimalBarWidth / 2}, ${chartHeight - bottomPadding + 14}) rotate(-35)`}
                  className="transition-all"
                >
                  <text
                    x={0}
                    y={0}
                    textAnchor="end"
                    fontSize="10.5"
                    fill="#1e293b"
                    fontWeight="700"
                    className="font-sans group-hover:fill-primary transition-colors select-none"
                  >
                    {labelInfo.main}
                  </text>
                  {labelInfo.sub && (
                    <text
                      x={0}
                      y={12}
                      textAnchor="end"
                      fontSize="9"
                      fill="#64748b"
                      fontWeight="600"
                      className="font-sans select-none"
                    >
                      {labelInfo.sub}
                    </text>
                  )}
                </g>
              ) : (
                <g className="transition-all">
                  <text
                    x={x + optimalBarWidth / 2}
                    y={chartHeight - bottomPadding + 16}
                    textAnchor="middle"
                    fontSize="10.5"
                    fill="#1e293b"
                    fontWeight="700"
                    className="font-sans group-hover:fill-primary transition-colors"
                  >
                    {labelInfo.main}
                  </text>
                  {labelInfo.sub && (
                    <text
                      x={x + optimalBarWidth / 2}
                      y={chartHeight - bottomPadding + 29}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748b"
                      fontWeight="500"
                      className="font-sans"
                    >
                      {labelInfo.sub}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;

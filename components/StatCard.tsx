"use client";

import React, { ReactNode } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendLabel?: string;
  icon?: ReactNode | React.ComponentType<{ className?: string }>;
  variant?: "primary" | "secondary" | "success" | "error" | "warning";
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  variant = "primary",
  className = "",
}) => {
  const variantStyles = {
    primary: {
      badge: "text-primary border-primary/20 bg-primary/10",
      iconColor: "text-primary",
      valueColor: "text-slate-900",
    },
    secondary: {
      badge: "text-blue-600 border-blue-200 bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-slate-900",
    },
    success: {
      badge: "text-emerald-700 border-emerald-200 bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-600",
    },
    error: {
      badge: "text-rose-700 border-rose-200 bg-rose-50",
      iconColor: "text-rose-600",
      valueColor: "text-rose-600",
    },
    warning: {
      badge: "text-amber-700 border-amber-200 bg-amber-50",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
    },
  };

  const style = variantStyles[variant] || variantStyles.primary;

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "function") {
      const IconComponent = icon as React.ComponentType<{ className?: string }>;
      return <IconComponent className="h-5 w-5" />;
    }
    return null;
  };

  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 bg-white border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-tight">{title}</p>
          {icon && (
            <div
              className={`p-2.5 rounded-xl border ${style.badge} group-hover:scale-110 transition-transform duration-200 flex items-center justify-center flex-shrink-0`}
            >
              {renderIcon()}
            </div>
          )}
        </div>

        <div className="mb-1.5">
          <p className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight tabular-nums ${style.valueColor}`}>
            {value}
          </p>
        </div>

        {subtitle && <p className="text-xs text-slate-500 leading-snug">{subtitle}</p>}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] ${
              isNegative && variant !== "error"
                ? "bg-rose-50 text-rose-600"
                : isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {isPositive && "↑"}
            {isNegative && "↓"}
            {trend}
          </span>
          {trendLabel && <span className="text-slate-500 font-medium truncate">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;

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
      value: "text-foreground",
    },
    secondary: {
      badge: "text-secondary border-secondary/20 bg-secondary/10",
      value: "text-foreground",
    },
    success: {
      badge: "text-success border-success/20 bg-success/10",
      value: "text-success",
    },
    error: {
      badge: "text-error border-error/20 bg-error/10",
      value: "text-error",
    },
    warning: {
      badge: "text-warning border-warning/20 bg-warning/10",
      value: "text-warning",
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
      return <IconComponent className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div
      className={`rounded-2xl p-5 bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs sm:text-sm font-medium text-muted">{title}</p>
          {icon && (
            <div
              className={`p-2 rounded-xl border ${style.badge} group-hover:scale-105 transition-transform duration-200 flex items-center justify-center`}
            >
              {renderIcon()}
            </div>
          )}
        </div>
        <div className="mb-1.5">
          <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${style.value}`}>
            {value}
          </p>
        </div>
        {subtitle && <p className="text-xs text-muted leading-tight">{subtitle}</p>}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs">
          <span
            className={`font-bold ${trend.startsWith("-") && variant !== "error"
              ? "text-error"
              : trend.startsWith("+")
                ? "text-success"
                : "text-muted"
              }`}
          >
            {trend}
          </span>
          {trendLabel && <span className="text-muted">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;

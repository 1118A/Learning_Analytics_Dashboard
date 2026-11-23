"use client";

import React, { ReactNode } from "react";

export interface CardProps {
  title?: string;
  subtitle?: string;
  takeaway?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  takeaway,
  actions,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div>
        {(title || actions || takeaway) && (
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div>
              {title && (
                <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-muted mt-1 leading-relaxed">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {actions}
            </div>
          </div>
        )}

        <div className="w-full">{children}</div>
      </div>

      {(takeaway || footer) && (
        <div className="mt-4 pt-3 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {takeaway && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">
                Takeaway:
              </span>
              <span>{takeaway}</span>
            </div>
          )}
          {footer && <div className="text-xs text-muted">{footer}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;

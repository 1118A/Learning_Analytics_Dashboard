"use client";

import React, { ReactNode } from "react";

export interface CardProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  takeaway?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  eyebrow,
  takeaway,
  actions,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group ${className}`}
    >
      <div>
        {(title || actions || eyebrow) && (
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
            <div>
              {eyebrow && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2 flex-wrap self-start">
                {actions}
              </div>
            )}
          </div>
        )}

        <div className="w-full">{children}</div>
      </div>

      {(takeaway || footer) && (
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {takeaway && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200/60 text-slate-800 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                Takeaway
              </span>
              <span className="text-slate-700 font-medium">{takeaway}</span>
            </div>
          )}
          {footer && <div className="text-xs text-slate-500">{footer}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;

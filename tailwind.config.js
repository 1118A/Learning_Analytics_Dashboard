/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-hover": "var(--destructive-hover)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        "input-background": "var(--input-background)",
        switchBackground: "var(--switch-background)",
        ring: "var(--ring)",
        whatsapp: "var(--whatsapp)",

        // Design System colors
        "ds-primary": "var(--ds-primary)",
        "ds-primary-hover": "var(--ds-primary-hover)",
        "ds-secondary": "var(--ds-secondary)",
        "ds-success": "var(--ds-success)",
        "ds-error": "var(--ds-error)",
        "ds-surface": "var(--ds-surface)",
        "ds-text-dark": "var(--ds-text-dark)",
        "ds-text-body": "var(--ds-text-body)",
        "ds-text-light": "var(--ds-text-light)",
        "ds-bg-white": "var(--ds-bg-white)",
        "ds-bg-alt": "var(--ds-bg-alt)",
        "ds-bg-warm": "var(--ds-bg-warm)",
        "ds-border": "var(--ds-border)",

        // Brand colors
        "brand-primary": "var(--brand-primary)",
        "brand-primary-dark": "var(--brand-primary-dark)",
        "brand-primary-light": "var(--brand-primary-light)",
        "brand-ai": "var(--brand-ai)",
        "brand-ai-light": "var(--brand-ai-light)",
        "brand-accent": "var(--brand-accent)",
        "brand-accent-dark": "var(--brand-accent-dark)",
        "brand-accent-light": "var(--brand-accent-light)",
        "brand-emerald": "var(--brand-emerald)",
        "brand-risk": "var(--brand-risk)",
        "brand-dark": "var(--brand-dark)",
        "brand-mid": "var(--brand-mid)",
        "brand-soft": "var(--brand-soft)",
        "brand-surface": "var(--brand-surface)",
        "brand-background": "var(--brand-background)",
        "brand-border": "var(--brand-border)",

        // Sidebar colors
        "sidebar": "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",

        "sidebar-bg": "var(--sidebar-bg)",
        "sidebar-text": "var(--sidebar-text)",
        "sidebar-text-hover": "var(--sidebar-text-hover)",
        "sidebar-hover-bg": "var(--sidebar-hover-bg)",
        "sidebar-active-bg": "var(--sidebar-active-bg)",
        "sidebar-section-label": "var(--sidebar-section-label)",
        "sidebar-width": "var(--sidebar-width)",
        "sidebar-collapsed-width": "var(--sidebar-collapsed-width)",

        // Topbar colors
        "topbar-height": "var(--topbar-height)",
        "topbar-bg": "var(--topbar-bg)",
        "topbar-border": "var(--topbar-border)",

        // Chart colors
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        // Radii
        "ds-card-radius": "var(--ds-card-radius)",
        "ds-btn-radius": "var(--ds-btn-radius)",
        "ds-badge-radius": "var(--ds-badge-radius)",

        // Spacing
        "content-max-width": "var(--content-max-width)",
        "content-padding": "var(--content-padding)",

        // Transitions
        "transition-fast": "var(--transition-fast)",
        "transition-base": "var(--transition-base)",
        "transition-slow": "var(--transition-slow)",

        // Z-index
        "z-sticky": "var(--z-sticky)",
        "z-dropdown": "var(--z-dropdown)",
        "z-modal": "var(--z-modal)",
        "z-toast": "var(--z-toast)",

        // Shadows
        "shadow-sm": "var(--shadow-sm)",
        "shadow-md": "var(--shadow-md)",
        "shadow-lg": "var(--shadow-lg)",
        "shadow-cta": "var(--shadow-cta)",
        "shadow-cta-hover": "var(--shadow-cta-hover)",
        "shadow-card": "var(--shadow-card)",
        "shadow-card-hover": "var(--shadow-card-hover)",
        "shadow-whatsapp": "var(--shadow-whatsapp)",
        "shadow-card-brand": "var(--shadow-card-brand)",
        "shadow-elevated-brand": "var(--shadow-elevated-brand)",
        "shadow-modal-brand": "var(--shadow-modal-brand)",
      },
      borderRadius: {
        dsCard: "var(--ds-card-radius)",
        dsBtn: "var(--ds-btn-radius)",
        dsBadge: "var(--ds-badge-radius)",
      },
      fontFamily: {
        sans: ["var(--font-family)", "sans-serif"],
        mono: ["var(--font-family-mono)", "monospace"],
        hindi: ["var(--font-family-hindi)", "sans-serif"],
        gujarati: ["var(--font-family-gujarati)", "sans-serif"],
      },
      fontSize: {
        base: "var(--font-size)",
      },
      transitionProperty: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      zIndex: {
        sticky: "var(--z-sticky)",
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        cta: "var(--shadow-cta)",
        "cta-hover": "var(--shadow-cta-hover)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        whatsapp: "var(--shadow-whatsapp)",
        "card-brand": "var(--shadow-card-brand)",
        "elevated-brand": "var(--shadow-elevated-brand)",
        "modal-brand": "var(--shadow-modal-brand)",
      },
    },
  },
  plugins: [],
};
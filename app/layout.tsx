import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OULAD Learning Analytics Portal",
  description: "Open University Learning Analytics Dashboard - Data-driven insights for learner success",
  openGraph: {
    title: "OULAD Learning Analytics Portal",
    description: "Data-driven insights for learner success",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth font-sans">
      <body className="bg-background text-foreground antialiased min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}

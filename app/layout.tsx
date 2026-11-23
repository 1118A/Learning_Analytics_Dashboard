import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OULAD Learning Analytics Portal",
  description: "Open University Learning Analytics Dashboard - Data-driven insights for learner success",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="font-sans"
    >
      <body className="bg-background text-font-antialiased antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
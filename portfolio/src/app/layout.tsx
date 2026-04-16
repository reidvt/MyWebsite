import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reid VanTrieste — CS & Security",
  description:
    "Computer Science senior at Fairfield University. ML Engineer, SOC Technician, and aspiring AI-Security professional.",
  keywords: [
    "Reid VanTrieste",
    "Machine Learning",
    "SOC Analyst",
    "Cybersecurity",
    "Portfolio",
  ],
  openGraph: {
    title: "Reid VanTrieste — CS & Security",
    description:
      "ML Engineer · SOC Technician · Computer Science @ Fairfield University",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

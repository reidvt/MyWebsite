import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reid VanTrieste",
  description:
    "ML Engineer · SOC Technician · CS @ Fairfield '26 · M.S. AI @ Penn '28",
  openGraph: {
    title: "Reid VanTrieste — Portfolio",
    description:
      "ML engineer and SOC technician. Production ML models, live SOC work, and hybrid AI-security projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

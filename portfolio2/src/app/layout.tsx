import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reid VanTrieste — CS @ Fairfield '26",
  description:
    "ML engineer and SOC technician. Computer Science senior at Fairfield University. Portfolio of ML, security, and web projects.",
  openGraph: {
    title: "Reid VanTrieste — Portfolio",
    description:
      "ML engineer and SOC technician. Selected projects across ML, security, and web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-heading-soft font-body antialiased">
        <Nav />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

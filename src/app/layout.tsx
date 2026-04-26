import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Harshit Mathur — AI/ML Engineer · Founder · IIT (ISM) Dhanbad",
  description:
    "Portfolio of Harshit Mathur — AI/ML Engineer, Full-Stack Builder, and Founder. Building intelligent systems and shipping real products. B.Tech ECE at IIT (ISM) Dhanbad.",
  keywords: [
    "Harshit Mathur",
    "AI/ML Engineer",
    "IIT Dhanbad",
    "Computer Vision",
    "Deep Learning",
    "Portfolio",
    "Full Stack Developer",
    "Machine Learning",
    "NLP",
    "LLMs",
  ],
  authors: [{ name: "Harshit Mathur" }],
  creator: "Harshit Mathur",
  openGraph: {
    title: "Harshit Mathur — AI/ML Engineer · Founder",
    description:
      "Building Intelligent Systems. Shipping Real Products. AI/ML Engineer at IIT (ISM) Dhanbad.",
    url: "https://harshitmathur.dev",
    siteName: "Harshit Mathur Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit Mathur — AI/ML Engineer · Founder",
    description:
      "Building Intelligent Systems. Shipping Real Products. AI/ML Engineer at IIT (ISM) Dhanbad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

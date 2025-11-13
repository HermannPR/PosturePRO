import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PosturePro - AI Posture Analysis",
  description: "Check your posture in 30 seconds - no signup required. Privacy-first AI-powered posture analysis for remote workers.",
  keywords: ["posture", "ergonomics", "remote work", "health", "AI", "posture check"],
  authors: [{ name: "PosturePro" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Doto } from "next/font/google";
import "./globals.css";

const doto = Doto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-doto",
});

export const metadata: Metadata = {
  title: "My next app",
  description: "Created with next",
  generator: "Yash Parekh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${doto.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-doto: ${doto.style.fontFamily};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "./components/Navbar";

const geistSans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriPath",
  description: "Connect with agricultural investment opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

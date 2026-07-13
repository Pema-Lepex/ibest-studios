"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ScrollProgress } from "@/components/motion";

interface MainLayoutProps {
  children: React.ReactNode;
  /**
   * Pages that open on a full-bleed hero let the transparent navbar float over
   * it. Every other page needs top padding so content clears the fixed bar.
   */
  transparentHeader?: boolean;
}

export default function MainLayout({
  children,
  transparentHeader = false,
}: MainLayoutProps) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className={transparentHeader ? "" : "pt-24 sm:pt-28"}>
        {children}
      </main>
      <Footer />
    </>
  );
}

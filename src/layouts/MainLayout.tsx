"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto 5xl:max-w-[3200px]">{children}</main>
      <Footer />
    </>
  );
}

"use client";
import Footer from "./components/Footer";
import Navbar from "./components/TestNavbar";
// import Navbar from "./components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    < div className="flex flex-col min-h-screen hide-scrollbar">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

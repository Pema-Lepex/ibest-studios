import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/common/ScrollToTop";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

// Raleway carries every display headline, so the heavy weights must be loaded.
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "iBEST Studios — Creative storytelling from Bhutan",
    template: "%s | iBEST Studios",
  },
  description:
    "iBEST Studios is a multimedia production company in Bhutan specialising in 2D & 3D animation, visual effects, illustration, design, content writing and live-action film.",
  keywords: [
    "iBEST Studios",
    "Bhutan animation studio",
    "2D animation",
    "3D animation",
    "VFX Bhutan",
    "multimedia production",
  ],
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "iBEST Studios — Creative storytelling from Bhutan",
    description:
      "Animation, VFX, design and film. We give life to any story our clients need.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${raleway.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink-950 text-cream">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

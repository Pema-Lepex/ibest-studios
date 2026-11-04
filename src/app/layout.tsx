import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// only used for small labels, so it needn't compete with the page's first paint
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://ibeststudios.com"),
  title: "iBEST Studios — Animation, Film & Sound Studio in Bhutan",
  description:
    "iBEST Studios is a multimedia and animation production company in Thimphu, Bhutan — 2D & 3D animation, live-action film, VFX, design, music and the team behind Educare Skill.",
  openGraph: {
    title: "iBEST Studios — Ideas For Generations",
    description: "Animation, film, music & VFX studio from Thimphu, Bhutan.",
    images: ["/img/work/pemi-tshewang-tashi.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#00111a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-screen bg-abyss text-cream">{children}</body>
    </html>
  );
}

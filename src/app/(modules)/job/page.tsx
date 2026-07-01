// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-900 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">My Studio</Link>
            <ul className="flex gap-6">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jobs">Jobs</Link></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2026 My Studio
        </footer>
      </body>
    </html>
  );
}
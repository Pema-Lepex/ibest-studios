import Link from "next/link";
import Image from "next/image";
import { StudiosLogo } from "@/assets";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Guides", href: "/guides" },
      { label: "Support", href: "/support" },
      { label: "API status", href: "/status" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
        <path d="M18.9 2H22l-7.6 8.7L23.5 22h-7.3l-5.7-7.5L4 22H1l8.2-9.3L1 2h7.5l5.1 6.8L18.9 2Zm-1.3 18h2L7 3.9H4.9L17.6 20Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
        <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.3 6.84 9.64.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.2-3.37-1.2-.46-1.2-1.11-1.53-1.11-1.53-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.5A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
        <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.96 1.96 0 1 0 5.28 7.42 1.96 1.96 0 0 0 5.25 3.5ZM20.5 20.5H17.13V14.6c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.54-2.27 3.12v6h-3.37V8.5h3.24v1.64h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.07 2.26 4.07 5.19v6.92Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto 5xl:max-w-[3200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
               <Image src={StudiosLogo} alt="iBEST Studios" width={50} height={50} />
              iBEST Studios
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Tools for teams who ship fast. Build, launch, and grow your product without the busywork.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.heading} className="col-span-1 md:col-span-1">
              <h3 className="text-sm font-semibold text-slate-900">{section.heading}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {year} iBEST Studios. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
              Terms
            </Link>
            <Link href="/sitemap" className="text-sm text-slate-500 transition-colors hover:text-indigo-600">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import Link from "next/link";
import { AlertCircle, ArrowUpRight, Mail } from "lucide-react";
import {
  CandidateNotes,
  HowToApply,
} from "@/assets/content/Career/Skills";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui";

const ImportantNoteSection = () => {
  const notes = [
    CandidateNotes.noteBefore,
    null, // the email note is a link, so it's rendered separately below
    CandidateNotes.noteAfter,
  ];

  return (
    <section className="border-t border-cream/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Notes */}
          <Reveal>
            <div className="rounded-2xl border border-cream/10 bg-ink-850 p-7 sm:p-9">
              <h2 className="flex items-center gap-3 font-raleway text-lg font-bold uppercase tracking-wide text-cream sm:text-xl">
                <AlertCircle className="h-5 w-5 shrink-0 text-gold-500" />
                {CandidateNotes.title}
              </h2>

              <p className="mt-5 text-sm text-mist sm:text-base">
                {CandidateNotes.intro}
              </p>

              <ul className="mt-6 space-y-4">
                {notes[0] && <Note>{notes[0]}</Note>}

                <Note>
                  You must submit a CV and a sample of your works to{" "}
                  <Link
                    href={CandidateNotes.emailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-semibold text-gold-500 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-400"
                  >
                    {CandidateNotes.email}
                  </Link>
                </Note>

                {notes[2] && <Note>{notes[2]}</Note>}
              </ul>
            </div>
          </Reveal>

          {/* Apply */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl border border-gold-500/25 bg-ink-850 p-7 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl"
              />

              <h2 className="display relative text-3xl text-cream sm:text-4xl">
                {HowToApply.title}
              </h2>

              <p className="relative mt-5 text-sm leading-relaxed text-mist sm:text-base">
                {HowToApply.subTitle}
              </p>

              <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={HowToApply.link}
                  external
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight className="h-5 w-5" />}
                >
                  Apply now
                </Button>
                <Button
                  href={CandidateNotes.emailHref}
                  external
                  variant="outline"
                  size="lg"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Email us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

function Note({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-mist sm:text-base">
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500"
      />
      <span>{children}</span>
    </li>
  );
}

export default ImportantNoteSection;

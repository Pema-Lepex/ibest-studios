"use client";

import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import { JobBanner } from "@/assets";
import {
  JobIntro,
  CandidateNotes,
  HowToApply,
} from "@/assets/content/Career/Skills";
import { CommonParagraph4 } from "@/components";

const JobPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Banner - full viewport width, edge to edge, scales with screen */}
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
        <Image
          src={JobBanner}
          alt="Careers at iBEST Studios"
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>

      {/* Centered text column */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 md:py-16">
        {/* Intro */}
        <section className="space-y-4 sm:space-y-5">
          {JobIntro.paragraphs.map((para, i) => (
            <CommonParagraph4 key={i} className="text-gray-800">
              {para}
            </CommonParagraph4>
          ))}
        </section>

        {/* Important notes for candidates */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-base font-bold text-primary-600 sm:text-lg md:text-xl">
            {CandidateNotes.title}
          </h2>
          <hr className="mt-3 mb-4 border-gray-200 sm:mb-5" />

          <CommonParagraph4 className="mb-4 text-gray-800">
            {CandidateNotes.intro}
          </CommonParagraph4>

          <ul className="list-disc space-y-2.5 pl-5 marker:text-customOrange-200 sm:space-y-3">
            <li>
              <CommonParagraph4 className="text-gray-800">
                {CandidateNotes.noteBefore}
              </CommonParagraph4>
            </li>
            <li>
              <CommonParagraph4 className="text-gray-800">
                You must submit a CV and a sample of your works to{" "}
                <a
                  href={CandidateNotes.emailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-customOrange-200 underline underline-offset-4 hover:opacity-70 break-words"
                >
                  {CandidateNotes.email}
                </a>
              </CommonParagraph4>
            </li>
            <li>
              <CommonParagraph4 className="text-gray-800">
                {CandidateNotes.noteAfter}
              </CommonParagraph4>
            </li>
          </ul>
        </section>

        {/* Apply button - small, left aligned */}
        <div className="mt-8 sm:mt-10">
          <a
            href={HowToApply.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-customOrange-200 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-customOrange-100 sm:px-5 sm:text-sm"
          >
            Apply Here
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobPage;

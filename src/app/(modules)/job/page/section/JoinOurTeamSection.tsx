import Image from "next/image";
import { JobBanner } from "@/assets";
import { CommonParagraph4 } from "@/components";
import { JobIntro } from "@/assets/content/Career/Skills";

const JoinOurTeamSection = () => {
  return (
    <section>
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
        <Image
          src={JobBanner}
          alt="Careers at iBEST Studios"
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="space-y-4 sm:space-y-5">
          {JobIntro.paragraphs.map((para, i) => (
            <CommonParagraph4 key={i} className="text-gray-800">
              {para}
            </CommonParagraph4>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeamSection;

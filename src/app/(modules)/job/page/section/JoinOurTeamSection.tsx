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
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 sm:py-12 lg:max-w-5xl lg:px-8 lg:py-16 xl:max-w-6xl xl:py-20 3xl:max-w-7xl">
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
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

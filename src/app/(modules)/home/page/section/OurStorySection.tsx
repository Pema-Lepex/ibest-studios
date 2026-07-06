"use Client";

import { RenderFormattedText } from "@/app/utils/helpers/RenderText";
import { OurStoryContent } from "@/assets/content/home/HomeContent";
import { CommonParagraph4, Heading4 } from "@/components";

const OurStorySection: React.FC = () => {
  return (
    <section className="px-5 sm:px-8 md:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center py-2 lg:max-w-4xl 3xl:max-w-5xl">
        <Heading4 className="text-primary-600">{OurStoryContent.title}</Heading4>
        <CommonParagraph4 className="mt-4 leading-relaxed whitespace-pre-line text-center">{RenderFormattedText(OurStoryContent.content)}</CommonParagraph4>
      </div>
    </section>
  );
};
export default OurStorySection;

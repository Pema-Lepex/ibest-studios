import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { CommonParagraph3, Heading4 } from "@/components";
import Image from "next/image";

const VisualEffect = () => {
  const section = ServiceContent.sections.find((s) => s.id === "vfx")!;

  return (
    <section className="text-center p-8">
      <Heading4>{section.title}</Heading4>
      <Image
        src={section.image!}
        alt={section.title}
        className="w-full h-auto mt-4"
      />
      <CommonParagraph3 className="text-body-text">
        {section.description}
      </CommonParagraph3>
    </section>
  );
};

export default VisualEffect;

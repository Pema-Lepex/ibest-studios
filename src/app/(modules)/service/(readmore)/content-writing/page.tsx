"use client";

import MainLayout from "@/layouts/MainLayout";
import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { CommonParagraph3, Heading4 } from "@/components";
import Image from "next/image";

const ContentWritingPage = () => {
  const section = ServiceContent.sections.find((s) => s.id === "content")!;

  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default ContentWritingPage;

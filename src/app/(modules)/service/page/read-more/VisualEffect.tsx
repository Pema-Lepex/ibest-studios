import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { CommonParagraph3, Heading4 } from "@/components";
import Image from "next/image";

const VisualEffect = () => {
    console.log(ServiceContent.services[0].title,"nhgsjhgd");
  return (
    <section className="text-center p-8">
      <Heading4>
        {ServiceContent.services[0].title}
      </Heading4>
      <Image
        src={ServiceContent.services[0].img}
        alt={ServiceContent.services[0].title}
        className="w-full h-auto mt-4"
      />
      <CommonParagraph3 className="text-gray-600">
        {ServiceContent.services[0].description}
      </CommonParagraph3>
    </section>
  );
};

export default VisualEffect;

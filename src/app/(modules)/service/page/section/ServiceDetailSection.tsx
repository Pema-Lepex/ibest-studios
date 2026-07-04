import { ServiceContent } from "@/assets/content/service/ServiceContent";
import Image from "next/image";
import Link from "next/link";

const ServiceDetailSection = () => {
  return (
    <section className="py-12 font-open-sans md:py-16 lg:py-20 xl:py-24">
      <div className="text-center">
        <h2 className="font-raleway text-2xl font-bold uppercase [font-variant-numeric:lining-nums] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {ServiceContent.title}
        </h2>
        <hr className="mx-auto mt-2 w-[12%] rounded border-2 border-accent-blue md:mt-3 lg:border-[3px]" />
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 justify-items-center gap-x-14 gap-y-14 px-5 sm:grid-cols-3 lg:max-w-5xl lg:gap-x-16 lg:gap-y-16 xl:max-w-6xl xl:gap-x-20 xl:gap-y-20">
        {ServiceContent.quickLinks.map((service) => (
          <div
            key={service.anchor}
            className="flex flex-col items-center text-center"
          >
            <Image
              src={service.icon}
              alt={service.title}
              width={96}
              height={96}
              className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
            />

            <h4 className="mt-4 whitespace-nowrap text-lg font-semibold uppercase text-body-text lg:text-xl xl:text-2xl">
              {service.title}
            </h4>

            <Link
              href={`#${service.anchor}`}
              className="mt-2 text-base text-accent-blue underline transition-colors duration-200 hover:font-semibold lg:text-lg"
            >
              Show More
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-32 max-w-5xl px-5 lg:max-w-6xl xl:max-w-7xl">
        {ServiceContent.sections.map((service) => (
          <div key={service.id} id={service.id} className="scroll-mt-24">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12 xl:gap-16">
              <div>
                <h3 className="font-raleway text-xl font-bold text-center [font-variant-numeric:lining-nums] sm:text-2xl lg:text-3xl xl:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-body-text lg:text-lg xl:text-xl">
                  {service.description}
                </p>
              </div>

              <div className="min-w-0 overflow-hidden rounded-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="h-[260px] w-full object-cover sm:h-[300px] md:h-[330px] lg:h-[380px] xl:h-[430px]"
                />
              </div>
            </div>

            <hr className="mt-12 mb-12 rounded border-2 border-accent-blue lg:border-[3px]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDetailSection;

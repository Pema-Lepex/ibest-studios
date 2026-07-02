"use client";

import { ServiceContent } from "@/assets/content/service/ServiceContent";
import {
  CommonParagraph2,
  CommonParagraph3,
  CommonParagraph4,
  Heading4,
} from "@/components";
import Link from "next/link";

const ServiceSection = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Heading4>{ServiceContent.title}</Heading4>

        <CommonParagraph3 className="mt-4 text-gray-600">
          {ServiceContent.description}
        </CommonParagraph3>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-10 px-5 sm:grid-cols-2 lg:grid-cols-3 ">
        {ServiceContent.services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200 rounded-lg p-6"
          >
            <service.icon className="mb-5 h-12 w-12 text-gray-600" />

            <CommonParagraph2 className="font-bold">
              {service.title}
            </CommonParagraph2>

            <Link
              href={service.href}
              className="mt-3"
            >
              <CommonParagraph4 className="transition-colors duration-200 text-gray-600 hover:font-semibold hover:text-gray-900">
                Show more
              </CommonParagraph4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
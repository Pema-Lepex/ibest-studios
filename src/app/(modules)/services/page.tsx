"use client";
import { RenderFormattedText } from "@/app/utils/helpers/RenderText";
import { WhatWeOffer } from "@/assets/content/Career/Skills";
import { CommonParagraph1, Heading2 } from "@/components";

const ServicesPage:React.FC = () => {
  return (
   <>
   Services
   <div className="border border-customOriange-200 rounded-2xl p-6 md:p-10 bg-white shadow-sm">
        <Heading2 className=" font-semibold text-orange-500 mb-6">
          {WhatWeOffer.title}
        </Heading2>
        <ul className="space-y-4">
          {WhatWeOffer.offers.map((offer, index) => (
            <li
              key={index}
              className="flex gap-3 text-gray-700 leading-relaxed"
            >
              <span className="text-orange-500 font-bold">•</span>
              <CommonParagraph1>{RenderFormattedText(offer)}</CommonParagraph1>
            </li>
          ))}
        </ul>
      </div>
   </>
  )
}
export default ServicesPage;
"use client";

import { RecentNewsContents } from "@/assets/content/home/HomeContent";
import { Heading4 } from "@/components";
import Card from "@/components/card/card";
import { Link } from "lucide-react";
import Image from "next/image";

const RecentNewsSection: React.FC = () => {
  return (
    <section>
      <div className="flex flex-col items-center py-2">
        <Heading4 className="text-primary-600">
          {RecentNewsContents.title}
        </Heading4>
        <ul className="mt-4 flex w-full gap-6 px-5">
          {RecentNewsContents.articles.map((article, index) => (
            <li key={index} className="flex-1">
              <div
                className="
          group
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-md
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
          hover:shadow-black/10
        "
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={article.img}
                    alt={article.title}
                    className="
              w-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{article.title}</h3>

                  <p className="mt-1 text-xs text-gray-500">{article.date}</p>

                  <p className="mt-3 text-sm text-gray-600">
                    {article.description}
                  </p>

                  <div className="mt-5 flex justify-center">
                    <a
                      href={`/news/${article.id}`}
                      className="
                font-medium
                text-primary-500
                transition-colors
                hover:text-primary-600
              "
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default RecentNewsSection;

import { CommonParagraph2, Heading4 } from "@/components";
import Image, { StaticImageData } from "next/image";

interface TeamMemberCardProps {
  name: string;
  designation: string;
  image: string | StaticImageData;
}

const TeamMemberCard = ({
  name,
  designation,
  image,
}: TeamMemberCardProps) => {
  return (
    <div className="relative mx-auto mt-24 w-full max-w-sm">
      {/* Card */}
      <div className="rounded-[36px] border border-gray-200 bg-white px-8 pb-12 pt-32 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
        <Heading4 className="text-primary-700">
          {name}
        </Heading4>

        <CommonParagraph2 className="text-primary-500">
          {designation}
        </CommonParagraph2>
      </div>

      {/* Profile Image */}
      <div className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-100 p-3 shadow-md">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
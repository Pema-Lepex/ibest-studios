"use client";

import { TeamContent } from "@/assets/content/team/TeamContent";
import TeamMemberCard from "../component/TeamCard";
import { CommonParagraph3, Heading4 } from "@/components";

const TeamSection: React.FC = () => {
  return (
    <section className="py-5">
      <div className="w-full text-center space-y-4 px-5">
        <Heading4>{TeamContent.title}</Heading4>
        <CommonParagraph3>{TeamContent.description}</CommonParagraph3>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5">
        {TeamContent.members.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            designation={member.role}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
};
export default TeamSection;

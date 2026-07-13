import { PageHero } from "@/components/ui";
import ContactNew from "./Section/ContactNew";

const MainContact: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start something."
        highlight={["something."]}
        subtitle="Tell us what you're making and we'll tell you how we can help bring it to life."
      />

      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <ContactNew />
      </div>
    </>
  );
};

export default MainContact;

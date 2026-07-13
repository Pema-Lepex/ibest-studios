import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { PageHero } from "@/components/ui";
import ServiceDetailSection from "./section/ServiceDetailSection";

const MainService = () => {
  return (
    <>
      <PageHero
        eyebrow={ServiceContent.eyebrow}
        title="Six disciplines. One studio."
        highlight={["studio."]}
        subtitle={ServiceContent.description}
      />
      <ServiceDetailSection />
    </>
  );
};

export default MainService;

import ContactSection from "./Section/ContactSection";
import MapSection from "./Section/MapSection";

const MainContact: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-3xl lg:px-8 lg:py-20 xl:max-w-4xl xl:py-24">
      <ContactSection />
      <MapSection />
    </div>
  );
};

export default MainContact;

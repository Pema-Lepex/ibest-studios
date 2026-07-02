import ContactSection from "./Section/ContactSection";
import MapSection from "./Section/MapSection";

const MainContact: React.FC = () => {
  return (
    <div className="mx-auto py-10">
      <ContactSection />
      <MapSection />
    </div>
  );
};

export default MainContact;

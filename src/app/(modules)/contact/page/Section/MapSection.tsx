import { ContactPageContent } from "@/assets/content/Contact/Contact";

const MapSection: React.FC = () => {
  return (
    <section className="mt-10 overflow-hidden rounded-md border border-gray-200 lg:mt-14">
      <iframe
        title="iBEST location map"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          ContactPageContent.mapQuery,
        )}&output=embed`}
        className="h-64 w-full sm:h-80 md:h-[450px] lg:h-[500px] xl:h-[550px]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
};

export default MapSection;

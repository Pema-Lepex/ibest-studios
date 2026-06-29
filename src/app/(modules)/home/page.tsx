import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  CommonParagraph1,
  CommonParagraph2,
  CommonParagraph3,
  CommonParagraph4,
} from "@/components";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 hide-scrollbar">
      <Heading1 className="text-primary-700">Home</Heading1>
      <Heading2>Home</Heading2>
      <Heading3>Home</Heading3>
      <Heading4>Home</Heading4>
      <CommonParagraph1 className="text-primary-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CommonParagraph1>

      <CommonParagraph2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CommonParagraph2>

      <CommonParagraph3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CommonParagraph3>

      <CommonParagraph4>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </CommonParagraph4>
    </div>
  );
};
export default HomePage;

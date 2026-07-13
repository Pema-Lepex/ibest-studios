import {
  Camera,
  Clapperboard,
  PenTool,
  Sparkles,
  Boxes,
  FileText,
} from "lucide-react";
import {
  ServiceVfxIcon,
  ServiceContentIcon,
  ServiceAnimationIcon,
  ServiceDesignIcon,
  ServicePhotoIcon,
  ServiceEditIcon,
  ServiceVfxImage,
  ServiceAnimation2DImage,
  ServiceAnimation3DImage,
  ServicePhotographyImage,
  ServiceDesigningImage,
  ServiceContentWritingImage,
} from "@/assets";

/**
 * One list drives everything. Each section owns its `id`, and every link on the
 * site points at `/service#<id>` — so a service can't be listed in the nav
 * without a matching section to scroll to (the old content had an "editing"
 * quick-link with no section behind it).
 */
export const ServiceContent = {
  title: "What we do",
  eyebrow: "Our services",
  description:
    "Six disciplines under one roof — so a story never has to change hands between studios.",
  sections: [
    {
      id: "vfx",
      number: "01",
      title: "Visual Effects",
      tagline: "Special effects (VFX)",
      icon: Sparkles,
      iconImage: ServiceVfxIcon,
      image: ServiceVfxImage,
      description:
        "To meet the shortage of VFX artists in the country, our company has trained our own team of VFX artists. The team has recently completed the VFX works for our home production live action film 'Dzi Mitogu'. We are confident of delivering any kind of VFX works as per the need of our client.",
      capabilities: [
        "Compositing",
        "Rotoscoping",
        "Match moving",
        "Set extension",
      ],
    },
    {
      id: "animation",
      number: "02",
      title: "2D Animation",
      tagline: "Hand-crafted frames",
      icon: Clapperboard,
      iconImage: ServiceAnimationIcon,
      image: ServiceAnimation2DImage,
      description:
        "We have a team of 2D animators who created the feature length film the Legend of Pemi Tshewang Tashi. The movie was well received with great reviews by our audience. The team of 20 competent animators has a huge experience and expertise of converting any kind of idea into an entertaining and meaningful piece of work.",
      capabilities: [
        "Feature films",
        "Explainers",
        "Character animation",
        "Motion graphics",
      ],
    },
    {
      id: "animation-3d",
      number: "03",
      title: "3D Animation",
      tagline: "Built in three dimensions",
      icon: Boxes,
      iconImage: ServiceAnimationIcon,
      image: ServiceAnimation3DImage,
      description:
        "We have a team of youth trained in the field of 3D animation. The team has an experience of working on several short films which are based on our Bhutanese folktales. With their expertise, our company is setting out to bring out the best 3D animated movie ever in the country!",
      capabilities: ["Modelling", "Rigging", "Lighting", "Rendering"],
    },
    {
      id: "design",
      number: "04",
      title: "Design & Illustration",
      tagline: "Designing / illustration",
      icon: PenTool,
      iconImage: ServiceDesignIcon,
      image: ServiceDesigningImage,
      description:
        "We have a team of talented and gifted artists who can design and do any kind of illustration as per the need of our clients. We do provide our services for publicity and promotion materials, storyboarding, comic/ book illustration, and any kind of report, magazine or book for the publication for a print as well as for an online usage.",
      capabilities: [
        "Storyboarding",
        "Book illustration",
        "Publicity material",
        "Print & digital",
      ],
    },
    {
      id: "photography",
      number: "05",
      title: "Photography",
      tagline: "Moments, captured",
      icon: Camera,
      iconImage: ServicePhotoIcon,
      image: ServicePhotographyImage,
      description:
        "Well experienced team with capability to deliver any kind of photographs our clients need and beyond! We can provide our clients with high quality works within the given time frame. We ensure the emotional connection between the moment captured and client is maintained.",
      capabilities: ["Events", "Portraits", "Product", "Documentary"],
    },
    {
      id: "content",
      number: "06",
      title: "Content Writing",
      tagline: "Words that carry the story",
      icon: FileText,
      iconImage: ServiceContentIcon,
      image: ServiceContentWritingImage,
      description:
        "We have a network of the best writers in Bhutan, who will dedicate their time to creating a piece of writing for you that we can only call beautiful. But we know you don't just want a piece of writing, however beautiful it may be. You want your piece of writing to bring you success. And that is why we do some more.",
      capabilities: ["Scripts", "Copywriting", "Editorial", "Dzongkha & English"],
    },
  ],
};

/** Alias kept so the visual-editing icon asset stays exported and in use. */
export const EditingIcon = ServiceEditIcon;

export type ServiceSectionItem = (typeof ServiceContent.sections)[number];

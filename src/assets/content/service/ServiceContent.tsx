import { Slider1 } from "@/assets/images";
import { CameraIcon, DessertIcon, Edit3Icon, Move3D, WrapTextIcon } from "lucide-react";
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

export const ServiceContent = {
  title: "Our Services",
  description: "We offer a wide range of services to help you succeed.",
  services: [
    {
      title: "Visual Effects(VFX)",
      icon: Move3D,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Creating stunning visual effects for film and video.",
    },
    {
      title: "Content writing",
      icon: WrapTextIcon,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Crafting compelling content for various platforms.",
    },
    {
      title: "Animation",
      icon: Move3D,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Creating engaging animations for various media.",
    },
    {
      title: "Designing",
      icon: DessertIcon,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Creating stunning designs for various media.",
    },
    {
      title: "Photography",
      icon: CameraIcon,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Capturing stunning images for various platforms.",
    },
    {
      title: "Visual Editing",
      icon: Edit3Icon,
      img: Slider1,
      href:"/service/visual-effect",
      description: "Creating engaging visual content for various media.",
    },
  ],
  quickLinks: [
    {
      title: "Visual Effects(VFX)",
      icon: ServiceVfxIcon,
      anchor: "vfx",
    },
    {
      title: "Content writing",
      icon: ServiceContentIcon,
      anchor: "content",
    },
    {
      title: "Animation",
      icon: ServiceAnimationIcon,
      anchor: "animation",
    },
    {
      title: "Designing",
      icon: ServiceDesignIcon,
      anchor: "design",
    },
    {
      title: "Photography",
      icon: ServicePhotoIcon,
      anchor: "photography",
    },
    {
      title: "Visual Editing",
      icon: ServiceEditIcon,
      anchor: "editing",
    },
  ],
  sections: [
    {
      id: "vfx",
      title: "Special effects(VFX)",
      description:
        "To meet the shortage of VFX artist in the country, our company has trained our own team of VFX artists. The team has recently completed the VFX works for our home production live action film 'Dzi Mitogu'. We are confident of delivering any kind of VFX works as per the need of our client.",
      image: ServiceVfxImage,
    },
    {
      id: "content",
      title: "Content Writing",
      description:
        "We have a network of the best writers in Bhutan, who will dedicate their time to creating a piece of writing for you that we can only call beautiful. But we know you don't just want a piece of writing, however beautiful it may be. You want your piece of writing to bring you success. And that is why we do some more.",
      image: ServiceContentWritingImage,
    },
    {
      id: "animation",
      title: "2D Animation",
      description:
        "We have a team of 2D animators who created the feature length film the Legend of Pemi Tshewang Tashi. The movie was well received with great reviews by our audience. The team of 20 competent animators has a huge experience and expertise of converting any kind of idea into an entertaining and meaningful piece of work.",
      image: ServiceAnimation2DImage,
    },
    {
      id: "animation-3d",
      title: "3D Animation",
      description:
        "We have a team of youth trained in the field of 3D animation. The team has an experience of working on several short films which are based on our Bhutanese folktales. With their expertise, our company is setting out to bring out the best 3D animated movie ever in the country!",
      image: ServiceAnimation3DImage,
    },
    {
      id: "design",
      title: "Designing/Illustration",
      description:
        "We have a team of talented and gifted artists who can design and do any kind of illustration as per the need of our clients. We do provide our services for publicity and promotion materials, storyboarding, comic/ book illustration, and any kind of report, magazine or book for the publication for a print as well as for an online usage.",
      image: ServiceDesigningImage,
    },
    {
      id: "photography",
      title: "Photography",
      description:
        "Well experienced team with capability to deliver any kind of photographs our clients need and beyond! We can provide our clients with high quality works within the given time frame. We ensure the emotional connection between the moment captured and client is maintained.",
      image: ServicePhotographyImage,
    },
  ],
};

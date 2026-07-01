import { StaticImageData } from "next/image";

export interface SlideProps {
  id: number;
  img: StaticImageData;
  title: string;
}
import {
  WorkNgeGiCharoGangzi,
  WorkSamphel3,
  WorkDragonTales,
  WorkPeldenDrukpa,
  WorkQrCode,
  WorkELearningVideo,
  WorkBhutanTalks,
  WorkDziMitoGu,
  WorkNewNormal,
  WorkPemiTshewangTashi,
  WorkWaterIsHappiness,
  WorkAchoKhegpa,
} from "@/assets";

export const ExperienceIntro = {
  title: "Our Experiences",
  eyebrow: "We Are What We Mean",
  paragraphs: [
    `Over the last more than four years, with our impressive team of highly committed and dedicated people, we have successfully delivered numerous projects for the vast array of clients.`,
    `Our biggest achievement so far is the premiering of our own home production, the 2D animated movie "Legend of Pemi Tshewang Tashi" and the live action feature film "Dzi Migtogu".`,
  ],
  videoId: "DM5UgZRuCIw",
  videoTitle: "Brief Work Profile of the iBEST Studios",
};

/**
 * Thumbnails are bundled locally rather than hot-linked from the old
 * ibeststudios.com host, which is slow enough to time out the image optimizer
 * on a cold request. Bundling also means the portfolio survives that host
 * going away.
 */
export const OurWorks = {
  title: "Our Works",
  projects: [
    {
      category: "2D Animation",
      title: "Nge Gi Charo Gangzi",
      image: WorkNgeGiCharoGangzi,
      link: "https://www.facebook.com/BHUTAN.WWF/videos/717237368871968",
    },
    {
      category: "3D Animation",
      title: "Samphel 3",
      image: WorkSamphel3,
      link: "https://www.youtube.com/watch?v=F3SBREVedTE",
    },
    {
      category: "Animated Infographics",
      title: "Dragon Tales",
      image: WorkDragonTales,
      link: "https://www.facebook.com/ibestedutainment/videos/718492435540030/",
    },
    {
      category: "MTV",
      title: "Pelden Drukpa",
      image: WorkPeldenDrukpa,
      link: "https://www.youtube.com/watch?v=Sc5KjCe5C_o",
    },
    {
      category: "Commercial Ads",
      title: "QR Code",
      image: WorkQrCode,
      link: "https://www.facebook.com/rmabhutan/videos/242177550161583",
    },
    {
      category: "Video Tutorials",
      title: "e-Learning Video",
      image: WorkELearningVideo,
      link: "https://www.youtube.com/watch?v=ZTucWzjHEMc&list=PL8WWToQ5Kvkdei1BidYvJLXfXlbpDUagq&index=6",
    },
    {
      category: "Bhutan Talks",
      title: "First Episode",
      image: WorkBhutanTalks,
      link: "https://www.facebook.com/bhutantalks17/videos/382169003133194",
    },
    {
      category: "Visual Effects (VFX)",
      title: "Dzi Mito Gu",
      image: WorkDziMitoGu,
      link: "https://www.youtube.com/watch?v=H50NtEqgGsg&t=2s",
    },
    {
      category: "Live Action / Infographic",
      title: "New Normal | Our Gyenkhu",
      image: WorkNewNormal,
      link: "https://www.youtube.com/watch?v=9gxQAahIWJU&t=124s",
    },
    {
      category: "2D Animation",
      title: "Legend of Pemi Tshewang Tashi",
      image: WorkPemiTshewangTashi,
      link: "https://www.youtube.com/watch?v=x1Ac6dv8biE",
    },
    {
      category: "Documentary",
      title: "Water Is Happiness",
      image: WorkWaterIsHappiness,
      link: "https://www.youtube.com/watch?v=OzOLxBItA6c&t=3s",
    },
    {
      category: "3D Animation",
      title: "Acho Khegpa",
      image: WorkAchoKhegpa,
      link: "https://www.youtube.com/watch?v=kXF_O4g5o7s",
    },
  ],
};

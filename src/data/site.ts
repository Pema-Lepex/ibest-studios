// All site content lives here so the studio can update it without touching components.
// Sources: ibeststudios.com, educareskill.com and the iBEST / Educare Skill YouTube channels (Oct 2026).

export const site = {
  name: "iBEST Studios",
  tagline: "Ideas For Generations",
  location: "Thimphu, Bhutan",
  founded: 2014,
  founder: "Tharchen",
  email: "infoibeststudios@gmail.com",
  socials: {
    youtube: "https://www.youtube.com/@iBESTSTUDIOS",
    facebook: "https://www.facebook.com/ibeststudios",
    instagram: "https://www.instagram.com/ibest_studios/",
  },
};

export const educare = {
  url: "https://www.educareskill.com",
  about: "https://www.educareskill.com/aboutus",
  appStore: "https://apps.apple.com/app/id6479234341",
  // TODO: confirm the Play Store listing is live before launch.
  playStore: "https://play.google.com/store/apps/details?id=com.skill.educare",
  youtube: "https://www.youtube.com/@educareskill",
  facebook: "https://www.facebook.com/educareskill",
  instagram: "https://www.instagram.com/educare.skill",
  tiktok: "https://www.tiktok.com/@educare.skill",
  support: { tollFree: "2016", phone: "77718721", email: "support@educareskill.com" },
};

// TODO: confirm these hours apply to the studio; they come from educareskill.com/contact (same building).
export const contact = {
  address: ["Changzamtog, Thimphu", "Bhutan"],
  hours: [
    ["Monday - Friday", "9:30 AM - 5:30 PM"],
    ["Saturday", "9:30 AM - 1:00 PM"],
    ["Sunday", "Closed"],
  ],
  // the pin from ibeststudios.com/contact, as a road map
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1273.3598363257863!2d89.64410681581!3d27.46133284139421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e194735197a62f%3A0xeb791240504f9ac0!2siBEST%20Institute!5e0!3m2!1sen!2sbt!4v1603814844544!5m2!1sen!2sbt",
};

export const nav = [
  { href: "#work", label: "Work" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "#educare", label: "Educare Skill" },
  { href: "#careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const thumb = (id: string, q: "hq" | "mq" | "maxres" = "hq") => `https://i.ytimg.com/vi/${id}/${q}default.jpg`;

export const showreelId = "DM5UgZRuCIw"; // "Brief work profile of the iBEST Studios"
export const showreelStart = 3;

export const stats = [
  { value: 2014, label: "Creating since", suffix: "", plain: true },
  { value: 1000, label: "Episodes on Educare Skill", suffix: "+" },
  { value: 20, label: "Animators on one feature film", suffix: "+" },
  { value: 30, label: "YouTube subscribers", suffix: "K+" },
];

export const values = ["Integrity", "Being bold", "Empathy", "Social responsibility", "Trust"];

// Headline productions, shown as stacked poster cards.
export type Production = {
  title: string;
  kind: string;
  year: string;
  poster: string;
  body: string;
  badge?: string;
  video?: string; // YouTube id
  start?: number; // where the autoplay preview begins, in seconds
  link?: string; // external link when there is no YouTube video
  accent: string;
};

export const productions: Production[] = [
  {
    title: "The Legend of Pemi Tshewang Tashi",
    kind: "2D animated feature film",
    year: "2018",
    poster: "/img/work/pemi-tshewang-tashi.webp",
    body: "Our home production and Bhutan's landmark animated feature — one of the most celebrated Bhutanese stories brought to the big screen by a team of 20 animators. Released during Thimphu Tshechu.",
    badge: "Winner · Best Animation",
    video: "Pf8_IvEwPS4",
    start: 18,
    accent: "#e3262b",
  },
  {
    title: "Dzimitogu",
    kind: "Live-action feature film · VFX",
    year: "2019",
    poster: "/img/work/dzimitogu.webp",
    body: "Our live-action feature, premiered at City Cinema. Every visual effect was created by the in-house VFX team we trained to meet the shortage of VFX artists in the country.",
    video: "6BySlxzW4L0",
    start: 30,
    accent: "#2a8fd6",
  },
  {
    title: "Nge Gi Charo Gangzi",
    kind: "2D animation · with WWF Bhutan",
    year: "2020",
    poster: "/img/work/nge-gi-charo-gangzi.webp",
    body: "A 2D animated short premiered on International Snow Leopard Day, produced with WWF Bhutan to celebrate the snow leopard of our mountains.",
    link: "https://www.facebook.com/BHUTAN.WWF/videos/717237368871968",
    accent: "#7cc4a4",
  },
  {
    title: "Samphel 3",
    kind: "3D animation · for DCDD",
    year: "",
    poster: "/img/work/samphel-3.webp",
    body: "A 3D animated series for the Department of Culture and Dzongkha Development, bringing Dzongkha learning to life with characters children love.",
    video: "F3SBREVedTE",
    start: 90,
    accent: "#ffc928",
  },
  {
    title: "Dragon Tales",
    kind: "Stories for children",
    year: "2021",
    poster: "/img/work/dragon-tales.webp",
    body: "Launched on 5 February 2021 for the Birth Anniversary of HRH The Gyalsey — a gift of stories from the iBEST family to Bhutanese children and beyond.",
    video: "MD9OZvc-hB8",
    start: 25,
    accent: "#f7941d",
  },
  {
    title: "Pelden Drukpa",
    kind: "Music video · tribute to The Great Fourth",
    year: "2020",
    poster: "/img/work/pelden-drukpa.webp",
    body: "A tribute music video with a striking illustrated look, watched more than 50,000 times on YouTube.",
    video: "Sc5KjCe5C_o",
    start: 40,
    accent: "#e3262b",
  },
];

export type Category = "Animation" | "Music Video" | "Film" | "Campaign";

export type Work = {
  id: string; // YouTube video id
  title: string;
  category: Category;
  views: string;
  year: number;
  channel: "iBEST" | "Educare";
};

export const works: Work[] = [
  { id: "RIT6tAxN9B8", title: "Gyalo Gyalo Lha Gyalo", category: "Music Video", views: "230K", year: 2020, channel: "iBEST" },
  { id: "JC2I6E5WHts", title: "Waste is Our Responsibility", category: "Campaign", views: "143K", year: 2019, channel: "iBEST" },
  { id: "HoU-AnfcI_I", title: "Say No To Bullying — DAZA Rhymes", category: "Animation", views: "50K", year: 2026, channel: "Educare" },
  { id: "qlth7ZzFyBE", title: "Sem Gawai Lugar — A Song of Joy", category: "Animation", views: "20K", year: 2019, channel: "iBEST" },
  { id: "Ubv1B7FbT68", title: "Chagi Mathra — A Song of Warrior", category: "Animation", views: "19K", year: 2019, channel: "iBEST" },
  { id: "h6dtkph-C-4", title: "Gyalo Gyalo — Druk Driglam Boys", category: "Music Video", views: "17K", year: 2023, channel: "iBEST" },
  { id: "x1Ac6dv8biE", title: "Pemi Tshewang Tashi — Anniversary Trailer", category: "Film", views: "14K", year: 2019, channel: "iBEST" },
  { id: "eFvClf7Hlho", title: "Let's Dance, Play & Exercise — NONO", category: "Animation", views: "10K", year: 2026, channel: "Educare" },
  { id: "d1lAJy8AhpU", title: "Kadrinchey Miwangchog", category: "Music Video", views: "6.4K", year: 2020, channel: "iBEST" },
  { id: "0jIMSfDOEF0", title: "Four Seasons — NONO Nursery Rhyme", category: "Animation", views: "6.2K", year: 2026, channel: "Educare" },
  { id: "Qw4CONxFcaM", title: "Trafficking in Persons — UNODC Bhutan", category: "Campaign", views: "4.9K", year: 2020, channel: "iBEST" },
  { id: "e4Ckfh5evFg", title: "Pelden Drukpa MTV — Tshering Dorji", category: "Music Video", views: "2.5K", year: 2023, channel: "iBEST" },
  { id: "Z6wx9447ZbQ", title: "Four Friends — Animation Series", category: "Animation", views: "2.2K", year: 2026, channel: "Educare" },
  { id: "kidkxJ-UvLY", title: "Dr. Carrot — Animation Series", category: "Animation", views: "1.1K", year: 2026, channel: "Educare" },
  { id: "Ud5sEdLqNF0", title: "Monkey King — Animation Series", category: "Animation", views: "883", year: 2026, channel: "Educare" },
  { id: "9gxQAahIWJU", title: "New Normal — Our Gyenkhu", category: "Campaign", views: "960", year: 2021, channel: "iBEST" },
  { id: "OzOLxBItA6c", title: "Water is Happiness", category: "Film", views: "497", year: 2020, channel: "iBEST" },
  { id: "jx5Fv5F7I3M", title: "116th National Day of Bhutan", category: "Film", views: "973", year: 2024, channel: "iBEST" },
];

export type ServiceKey = "dragon" | "monitor" | "pencil" | "camera" | "book" | "clapper" | "mic";

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  body: string;
  tags: string[];
  /** a real piece of iBEST work that shows the craft, played as a muted preview */
  example: { id: string; start: number; title: string };
};

export const services: Service[] = [
  {
    key: "dragon",
    title: "2D & 3D Animation",
    short: "Animation",
    body: "The team of 20 animators behind The Legend of Pemi Tshewang Tashi, and a 3D team crafting short films from Bhutanese folktales — setting out to make the best 3D animated movie ever made in the country.",
    tags: ["Feature films", "Series", "Explainers"],
    example: { id: "Pf8_IvEwPS4", start: 18, title: "The Legend of Pemi Tshewang Tashi" },
  },
  {
    key: "monitor",
    title: "Visual Effects (VFX)",
    short: "VFX",
    body: "To meet the shortage of VFX artists in Bhutan, we trained our own team. They delivered every effect in our live-action film Dzimitogu — and can deliver whatever your project needs.",
    tags: ["Compositing", "Clean-up", "Motion graphics"],
    example: { id: "6BySlxzW4L0", start: 30, title: "Dzimitogu" },
  },
  {
    key: "pencil",
    title: "Design & Illustration",
    short: "Design",
    body: "Talented artists for publicity and promotional materials, storyboards, comics and book illustration, reports and magazines — for print and online.",
    tags: ["Storyboards", "Books", "Branding"],
    example: { id: "Sc5KjCe5C_o", start: 40, title: "Pelden Drukpa" },
  },
  {
    key: "camera",
    title: "Photography & Film",
    short: "Film",
    body: "An experienced crew that captures exactly what you need — and keeps the emotional connection between the moment and the people in it. Delivered on time, in high quality.",
    tags: ["Cinematography", "Documentary", "Photo"],
    example: { id: "jx5Fv5F7I3M", start: 20, title: "116th National Day of Bhutan" },
  },
  {
    key: "book",
    title: "Content Writing",
    short: "Writing",
    body: "A network of the best writers in Bhutan, creating pieces that are not only beautiful but built to bring you success — scripts, stories and campaigns.",
    tags: ["Scripts", "Stories", "Campaigns"],
    example: { id: "JC2I6E5WHts", start: 15, title: "Waste is Our Responsibility" },
  },
  {
    key: "clapper",
    title: "Visual Editing",
    short: "Editing",
    body: "Editing, colour and finishing for films, music videos, tutorials and commercials — from the first cut to the final render.",
    tags: ["Editing", "Colour", "Finishing"],
    example: { id: "RIT6tAxN9B8", start: 30, title: "Gyalo Gyalo Lha Gyalo" },
  },
  {
    key: "mic",
    title: "Music & Sound",
    short: "Sound",
    body: "Original songs, background scores, karaoke tracks and Dzongkha & English voice-over, recorded in our own studio.",
    tags: ["Scoring", "Recording", "Voice"],
    example: { id: "qlth7ZzFyBE", start: 20, title: "Sem Gawai Lugar — A Song of Joy" },
  },
];

export const pipeline = [
  { no: "01", title: "Story & Script", body: "Every frame starts as an idea. Our writers shape stories rooted in Bhutanese values — told for children, families and generations to come." },
  { no: "02", title: "Modelling", body: "Characters are sculpted in 3D — from Dr. Carrot to the Monkey King — mesh by mesh, before a single colour is chosen." },
  { no: "03", title: "Texture & Colour", body: "Illustrators and BG artists paint worlds in warm palettes inspired by our dzongs, valleys and festivals." },
  { no: "04", title: "Rig & Animate", body: "Bones, controls and timing bring the character to life. Animators make every blink and bounce feel real." },
  { no: "05", title: "Light, Sound & Render", body: "Lighting, VFX, original music and voice in Dzongkha & English — then the final render ships to screens across Bhutan." },
];

export const educareLevels = [
  { name: "Chey Chey", level: "Ages 3+" },
  { name: "Educare Kids", level: "Stories & rhymes" },
  { name: "Primary Level", level: "Classes PP–VI" },
  { name: "Intermediate Level", level: "Classes VII–XII" },
  { name: "Graduates / BCSE", level: "Exam prep" },
];

// Episodes shown in the Educare Skill phone player.
export type EducareEpisode = { id: string; ep?: string; title: string; series: "Nono" | "Daza"; start: number };

export const educareNono: EducareEpisode[] = [
  { id: "YUsYqWmh1Sg", ep: "Teaser", title: "Nono", series: "Nono", start: 0 },
  { id: "0jIMSfDOEF0", ep: "E1", title: "Four Seasons", series: "Nono", start: 15 },
  { id: "eFvClf7Hlho", title: "Let's Dance, Play & Exercise", series: "Nono", start: 15 },
];

export const educareDaza: EducareEpisode[] = [
  { id: "_qwNeDTetVg", ep: "Teaser", title: "Daza", series: "Daza", start: 0 },
  { id: "HoU-AnfcI_I", ep: "E1", title: "Say No to Bullying", series: "Daza", start: 15 },
  { id: "h-JndTl9YNY", title: "I Love Reading", series: "Daza", start: 15 },
];

export const educareSeries: { name: string; kind: string; poster: string; video: string; start: number }[] = [
  { name: "Tales of the Four Friends", kind: "Animation series", poster: "/img/series/four-friends.webp", video: "Z6wx9447ZbQ", start: 6 },
  { name: "Adventures of the Monkey King", kind: "Animation series", poster: "/img/series/monkey-king.webp", video: "Ud5sEdLqNF0", start: 6 },
  { name: "Dr. Carrot", kind: "Animation series", poster: "/img/series/dr-carrot.webp", video: "kidkxJ-UvLY", start: 6 },
  { name: "NONO", kind: "Nursery rhymes", poster: "/img/series/nono.webp", video: "eFvClf7Hlho", start: 15 },
  { name: "DAZA", kind: "Nursery rhymes", poster: "/img/series/daza.webp", video: "HoU-AnfcI_I", start: 15 },
  { name: "The Dragon Tales", kind: "Read-aloud videos", poster: "/img/series/dragon-tales-read.webp", video: "MD9OZvc-hB8", start: 20 },
  { name: "The Monkey King", kind: "Read-aloud videos", poster: "/img/series/monkey-king-read.webp", video: "mWhnUfWllIM", start: 20 },
];

export const testimonials = [
  {
    quote:
      "The Legend of Pemi Tshewang Tashi, a project of the Loden entrepreneur Tharchen and his iBEST team, takes Bhutanese cinematography to a whole new level. Combining creativity and culture, innovation and history, art and entertainment, the film brings one of the most celebrated Bhutanese stories to the big screen in the form of a beautifully crafted animation.",
    name: "Dr Karma Phuntsho",
    role: "President, Loden Foundation & Shejun",
  },
  {
    quote:
      "Now that the movie is in the cinema, it's out there for everyone to see how much our youths can do, which takes more than just some training opportunity but a tharchenian push. It's an animation that's so far the best ever produced in our country. They went for nothing less than excellence.",
    name: "Mr Passang Tshering",
    role: "Executive Director, Bhutan Toilet Organization",
  },
  {
    quote:
      "Thank you and your team for partnering with us for BEFIT 2019 — for the unwavering support and cooperation, for coming forward to design the promotional animation clip, and for your support in the social media outreach.",
    name: "Dasho Penjore",
    role: "Governor, RMA",
  },
  {
    quote:
      "ICS highly appreciates the services of iBEST since they work with the highest professional integrity and deliver the project on time. Besides their professionalism, the consultancy is cooperative with their adept team members who strive to bring the best and quality work output.",
    name: "Mrs Singye Wangmo",
    role: "Former Program Director, ICS, MoAF",
  },
  {
    quote:
      "The firm has developed numerous projects, most of which are appraised, and a good number have been approved for funding. Alongside the proposal development, the firm advises and mentors the proponents in setting up the whole business process.",
    name: "Mr Pema Wangdi",
    role: "Former Director, BDRT, BOiC",
  },
];

export const partners = [
  "Dept. of Culture & Dzongkha Development",
  "WWF Bhutan",
  "Ministry of Health",
  "UNODC Bhutan",
  "Royal Monetary Authority",
  "Loden Foundation",
  "Bhutan Toilet Organization",
  "SATO",
];

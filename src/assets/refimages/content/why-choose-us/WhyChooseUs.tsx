import {
  affortable,
  Approve,
  InteractiveLearning,
  personalize,
  QualityLearning,
} from "assets";
import { BadgeCheck, Gem, MonitorCheck, ShieldCheck, UserStar } from "lucide-react";

export const whyChooseUsDetails = [
  {
    title: "Quality Content",
    desc: `Our content is not only educational but also entertaining, ensuring that learning is both effective and enjoyable. Every episode and lesson is developed by professionals and undergoes a rigorous review process by Dzongkha teachers, Dzongkha experts, and curriculum professionals from the Department of Culture and Dzongkha Development (DCDD) and the Department of School Education, MoESD—leaving no room for errors!`,
    theme: "orange",
    icon: ShieldCheck,
  },
  {
    title: "Interactive Learning",
    desc: `Our content is available in a wide variety of fun and engaging formats, making learning a highly interactive experience. From interactive Chey Chey mobile games to nursery rhymes, animation series, and read-aloud stories, every exam-oriented tutorial and set of solved questions is designed to be learner-centred, fun, and engaging—ensuring that learning is active rather than passive.`,
    theme: "purple",
    icon: MonitorCheck,
  },
  {
    title: "Approved by Dzongkha Experts and Curriculum-Aligned",
    desc: `Our content is developed in consultation with Dzongkha teachers, experts, and caregivers from across the country and undergoes rigorous review by professionals from DCDD and DSE, ensuring full alignment with the national Dzongkha curriculum and standards. As a result, Educare Skill has been endorsed as the “**National Online Dzongkha Learning Platform**.”`,
    theme: "green",
    icon: BadgeCheck,
  },
  {
    title: "Personalized Learning",
    desc: "Our content offers a personalised learning experience, helping students in every class.",
    theme: "red",
    icon: UserStar,
  },
  {
    title: "Affordable Pricing",
    desc: "Our membership plans are affordable, ensuring you gain access to high-quality Dzongkha content at minimal cost.",
    theme: "blue",
    icon: Gem,
  },
];

export const EducareKIds = [
  {
    id: "gakyid",
    title: "Gakyid Lobdra",
    desc: "The Gakyid Lobdra series presents foundational Dzongkha lessons where our lively class of troublemakers learns foundational Dzongkha lessons and concepts through fun exercises and engaging activities.",
    borderClass: "border-orange-300",
    titleClass: "text-orange-500",
    isAccordion: false,
  },
  {
    id: "nursery",
    title: "Nursery Rhymes",
    desc: "Get ready to sing and dance to playful melodies and whimsical lyrics with 24 episodes of the fan-favourite Nono and Daza Nursery Rhyme Series, where learning is all fun and play.",
    borderClass: "border-violet-300",
    titleClass: "text-violet-600",
    isAccordion: false,
  },
  {
    id: "animation",
    title: "Entertaining Animation Series",
    desc: "Grab some popcorn and binge-watch our amazing collection of animation series, consisting of 36 episodes, where stories come alive with adorable characters and memorable moments.",
    borderClass: "border-emerald-300",
    titleClass: "text-emerald-600",
    isAccordion: true,
    items: [
      {
        title: "Adventures of the Monkey King",
        desc: "Watch the Adventures of the Monkey King, where Zangpo, upon ascending the throne, brings calm to the chaotic forest that he rules, bestowing valuable nuggets of wisdom along the way.",
        bgClass: "bg-orange-50",
      },
      {
        title: "Tales of the Four Friends",
        desc: "Tales of the Four Friends is a reimagined and adaptation of the most popular and endearing folklore of Four Harmonious Friends (Thuenpa Puenzhi), where four close friends, Karma, Tongtong, Zala & Chunku, embark on wild adventures together, gaining a few friends as well as making a few enemies, overcoming obstacles, and showing us the true meaning of friendship.",
        bgClass: "bg-violet-50",
      },
      {
        title: "Doctor Carrot",
        desc: "The Doctor Carrot Series, where the wise Doctor Carrot and his quirky vegetable friends show us the importance of leading a healthy lifestyle in the most adorable way possible!",
        bgClass: "bg-emerald-50",
      },
    ],
  },
  {
    id: "readaloud",
    title: "The Read-Aloud Stories Series",
    desc: "There are 360 colourful read-aloud stories, such as the Monkey King and Dragon Tales series, available in both Dzongkha and English. These stories help children and learners of all ages build strong language, listening, and comprehension skills, while boosting imagination, focus, and a love for learning and storytelling, and fostering a connection to Bhutanese roots and universal values of love, kindness, and compassion.",
    borderClass: "border-red-300",
    titleClass: "text-red-600",
    isAccordion: true,
    items: [
      {
        title: "Dragon Tales Read-Aloud Stories",
        desc: "An anthological compilation of short stories heavily inspired by the beloved and fabled Jataka Tales, Bhutanese folktales and other stories. The synchronized read-aloud texts appearing alongside the narration help your child follow word by word, building their foundational reading and writing skills.",
        bgClass: "bg-orange-50",
      },
      {
        title: "Monkey King Read-Aloud Stories",
        desc: "This anthological compilation tells stories of the Monkey King and his boundless wisdom, teaching important lessons and morals with every episode. The synchronized read-aloud texts help build foundational reading and writing skills.",
        bgClass: "bg-violet-50",
      },
    ],
  },
];

export const PrimaryLevel = [
  {
    title: "Foundational Dzongkha (ECCD, Classes PP - III)",
    desc: "The Gakyid Lobdra series is a foundational Dzongkha series where our lively class of troublemakers learns foundational Dzongkha lessons and concepts through fun and engaging activities.",
    bgClass: "bg-orange-50",
  },
  {
    title: "Basic Dzongkha (Classes III - VI)",
    desc: "The Basic Dzongkha series introduces fundamental grammar and language, as well as reading and writing concepts, transforming classroom learning into simplified and interactive lessons.",
    bgClass: "bg-violet-50",
  },
  {
    title:
      "Read-Aloud Stories, Essays, and Poems from Textbooks (Classes IV - VI)",
    desc: "Stories, essays, and poems from textbooks are also available as read-aloud videos, featuring soothing narration and beautiful illustrations that help students learn Dzongkha through engaging visuals.",
    bgClass: "bg-emerald-50",
  },
  {
    title: "Exam-Oriented Tutorials (Classes IV - VI)",
    desc: "In-depth Dzongkha exam-oriented tutorials and solved questions (MCQs and Q&As) on grammar and language, reading and writing, stories, essays, and poems are provided, enabling students to prepare for their exams effectively by practicing solved questions.",
    bgClass: "bg-rose-50",
  },
];

export const IntermediateLevel = [
  {
    title: "Intermediate Dzongkha (Classes VII - XII)",
    desc: "The Intermediate Dzongkha series explores more advanced grammar and language, as well as reading and writing concepts, making complex Dzongkha topics easier to understand.",
    bgClass: "bg-orange-50",
  },
  {
    title: "Read-Aloud Stories, Essays, and Poems from Textbooks (Classes VII - XII)",
    desc: "Stories, essays, and poems from textbooks are also available as read-aloud videos, featuring soothing narration and beautiful illustrations that help students learn Dzongkha through engaging visuals.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Exam-Oriented Tutorials (Classes VII - XII)",
    desc: "In-depth exam-oriented tutorials and solved questions (MCQs and Q&As) on grammar and language, stories, and other mandatory literature/topics are provided, enabling students to prepare for their exams effectively by practicing solved questions.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Dayig (Classes IX - X)",
    desc: "Dayig is available as comprehensive tutorials, with every verse accompanied by beautiful illustrations and easy-to-understand explanations of difficult terminologies, followed by solved questions (MCQs and Q&As), making learning both engaging and enjoyable.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Gyalsey Laglen (Classes IX - X)",
    desc: "The sacred texts of Gyalsey Laglen are available as simplified lessons, with every verse accompanied by simple, easy-to-understand explanations of difficult terminologies, followed by solved questions (MCQs and Q&As), making learning both engaging and enjoyable.",
    bgClass: "bg-rose-50",
  },
  {
    title: "Khandro Drowa Zangmo Namthar (Classes IX - X)",
    desc: "The epic of Khandro Drowa Zangmo has been brought to life with beautiful illustrations and soothing, simplified narration, explanations of difficult terminologies, followed by solved questions (MCQs and Q&As), allowing students to immerse themselves in this timeless tale.",
    bgClass: "bg-orange-50",
  },
  {
    title: "Nyenga & Lekshay Langdor (Classes IX - XII)",
    desc: "The topics of Nyenga and Lekshay Langdor are broken down into comprehensive, exam-oriented solved questions (MCQs and Q&As), with every verse accompanied by beautiful illustrations and easy-to-understand narration.",
    bgClass: "bg-emerald-50",
  },
  {
    title: "Shaytring (Classes XI - XII)",
    desc: "The sacred texts of Shaytring are presented as thorough, exam-oriented tutorials, with each verse accompanied by beautiful illustrations and simple, easy-to-understand explanations, followed by solved questions (MCQs and Q&As), making every lesson both engaging and easier to grasp.",
    bgClass: "bg-slate-50",
  },
  {
    title: "Chu dha Shingi Toenchay Tutorials (Classes XI - XII)",
    desc: "Chu dha Shingi Toenchay is available as comprehensive lessons, with every verse accompanied by beautiful illustrations and easy-to-understand explanations of difficult terminologies, followed by solved questions (MCQs and Q&As), making learning both thorough and engaging.",
    bgClass: "bg-yellow-50",
  },
  {
    title: "Ashi Nangsa Namthar (Classes XI - XII)",
    desc: "The epic of Ashi Nangsa has been brought to life with beautiful illustrations and easy-to-understand narration, explanations of difficult terminologies, followed by solved questions (MCQs and Q&As), allowing students to immerse themselves in this timeless tale.",
    bgClass: "bg-pink-50",
  },
];
export const GraduateContent = [
  {
    title: "Grammar and Language",
    desc: "Under the Graduates/BCSE category, one can access all Basic and Intermediate Dzongkha grammar lessons, which help to relearn fundamental to advanced concepts and equip learners for the RCSC examinations.",
    bgClass: "bg-orange-50",
  },
  {
    title: "Grammar Solved Questions",
    desc: "Under this category, anyone preparing for RCSC examinations or any functional Dzongkha literacy test can practice grammar and language solved questions (MCQs and Q&As), as all solved questions from Classes VI to XII are made available.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Reading and Writing",
    desc: "One can access and brush up on Dzongkha reading and writing lessons and tutorials from fundamental to advanced levels, as all Basic and Intermediate Dzongkha lessons are available.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Nyenga, Dayig, and Shaytring",
    desc: "All lessons and tutorials of Nyenga, Dayig, and Shaytring studied in Classes IX – XII are made available to equip graduates sitting for the RCSC examinations. The topics are broken down into comprehensive, exam-oriented solved questions (MCQs and Q&As), with every verse accompanied by beautiful illustrations, easy-to-understand narration, and explanations of difficult terminologies.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Dragon Tales and Monkey King Read-Aloud Stories",
    desc: "To help improve Dzongkha reading comprehension and learning new words, more than 180 entertaining and beautifully illustrated stories filled with morals and values have been made available.",
    bgClass: "bg-rose-50",
  },
];
export const CheyCheyData = [
  {
    title: "Chey Chey Mobile Game",
    intro:
      "Our interactive gamified learning platform, Chey Chey Mobile Game provides an opportunity for your child to learn and build a solid Dzongkha foundation with 12 episodes of interactive mobile games.",
    games: [
      "Alphabet Tracing",
      "Shapes and Colours",
      "Number",
      "Family Members",
      "Prepositions",
      "Domestic Animals",
      "Fruits",
      "Vegetables",
      "Wild Animals",
      "Agentive Case",
      "Genitive Case",
      "Making Sentence Structure",
    ],
  },
];

export const iBESTOriginalsContent = [
  {
    title: "Movies & Series",
    desc: "People can watch films and series, both live-action and animation, produced in Bhutan—primarily productions of iBEST.",
    bgClass: "bg-orange-50",
  },
  {
    title: "Documentaries",
    desc: "We plan to bring unique and fresh documentaries based on stories, life, and experiences from Bhutan and beyond, which can help document the present while also serving the purpose of education and entertainment.",
    bgClass: "bg-violet-50",
  },
  {
    title: "Namthars & Legends",
    desc: "Educare Skill plans to develop a series format of Namthars and Legends—stories that are not widely accessible and have been passed down orally through generations.",
    bgClass: "bg-emerald-50",
  },
  {
    title: "Mindfulness and Meditation",
    desc: "We will have a series of content on mindfulness and meditation to promote education and awareness, so that people of all ages can use these as resources and tools in their lives for mental well-being and daily practice.",
    bgClass: "bg-yellow-50",
  },
];
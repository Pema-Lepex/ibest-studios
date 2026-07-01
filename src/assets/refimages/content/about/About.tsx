import { bronze, gold, sliver } from "assets";
import {
  CheCheyImage,
  CheCheyIcon,
  EducareSkillImage,
  EducareSkillIcon,
  PrimaryLevelImage,
  PrimaryLevelIcon,
  IntermediateLevelImage,
  IntermediateLevelIcon,
  FCTFLLogo,
  FDCDDULogo,
  HTGSLogo,
  RGLogo,
  GiftIcon,
  BCSEImage,
  iBESTOroginalImage,
  iBestOrognalIcon,
  BCSEIcon,
  BlueBoxImage,
  RedBoxImage,
  PurpleBoxImage,
  GreenBoxImage,
} from "assets/images";

export const EducareSkillContent = {
  title: "EDUCARE SKILL",
  subTitle: "Your Perfect Dzongkha Tutor!",
  content1: `Introducing Bhutan's pioneering online learning platform, Educare Skill, developed with a mission to transform learning and skilling in Bhutan and beyond. Educare Skill enables learners to master our national language, Dzongkha, like never before through more than 1000 engaging, entertaining, and curriculum-aligned episodes. `,
  content2: `From catchy nursery rhymes and captivating animation series to immersive read-aloud stories and comprehensive, exam-oriented tutorials, the platform offers something for everyone. Whether you are a young child beginning your Dzongkha journey, a student preparing for school examinations, a parent or teacher seeking quality learning resources, or a graduate sitting for the RCSC examinations, our carefully curated content supports you at every stage. `,
  content3: `All content is reviewed by Dzongkha experts and aligned with the national curriculum to ensure relevance, quality, and impact. In the future, the platform will also offer professional courses leading to recognized certifications.`,
};

export const EducareSkillGroupContent = [
  {
    id: 1,
    groupName: "CHEYCHEY",
    redirectUrl: "cheychey",
    groupImage: CheCheyImage,
    groupIcon: CheCheyIcon,
    eligibility: "Age 3 - 12 years",
    info: "Learn the fundamentals of Dzongkha through interactive mobile games.",
  },
  {
    id: 2,
    groupName: "KDUCARE KIDS",
    redirectUrl: "kids",
    groupImage: EducareSkillImage,
    groupIcon: EducareSkillIcon,
    eligibility: "Age 3 - 16 years",
    info: "Where Dzongkha Learning Comes Alive - Animations. Stories. Rhymes.",
  },
  {
    id: 3,
    groupName: "PRIMARY LEVEL",
    redirectUrl: "primary",
    groupImage: PrimaryLevelImage,
    groupIcon: PrimaryLevelIcon,
    eligibility: "Classes PP - VI",
    info: "The Perfect Dzongkha tutor to help your children build a strong foundation.",
  },
  {
    id: 4,
    groupName: "INTERMEDIATE LEVEL",
    redirectUrl: "intermediate",
    groupImage: IntermediateLevelImage,
    groupIcon: IntermediateLevelIcon,
    eligibility: "Classes VII - XII",
    info: "Your perfect guide to mastering Dzongkha.",
  },
  {
    id: 5,
    groupName: "GRADUATE / BCSE",
    redirectUrl: "graduate",
    groupImage: BCSEImage,
    groupIcon: BCSEIcon,
    eligibility: "Your perfect tutor for relearning Dzongkha",
    info: "Relearn, Refresh, and Reload Your Dzongkha - Begin Today!",
  },
  {
    id: 6,
    groupName: "iBEST ORIGINALS",
    redirectUrl: "ibest",
    groupImage: iBESTOroginalImage,
    groupIcon: iBestOrognalIcon,
    eligibility: "Happy hours for all",
    info: "Pay. Watch. Enjoy Bhutan's Best Stories - Anytime, Your Way!",
  },
];
export const EducareSkillGuideContent = [
  {
    id: 1,
    title: "For DCDD Users",
    icon: FDCDDULogo,
    frame: PurpleBoxImage,
    href: "/about/for-dcdd-users",
    info: "With the subsidized support of DCDD, Educare Skill is FREE for children aged 3 and above, children enrolled in ECCD center, and students in Classes PP - VI.",
  },
  {
    id: 2,
    title: "How To Get Started?",
    icon: HTGSLogo,
    frame: BlueBoxImage,
    href: "/about/how-to-get-started?",
    info: "If you wish to get started on Educare Skill, please Sign Up now and explore our affordable membership plans.",
  },
  {
    id: 3,
    title: "Registration Guide",
    icon: RGLogo,
    frame: RedBoxImage,
    href: "/about/registration-guide",
    info: "If you are not eligible for DCDD support, don't worry! But you are not quite sure how to register on our platform, we will help you get started.",
  },
  {
    id: 4,
    title: "Gift Coupon The Gift of Learning!",
    icon: FCTFLLogo,
    frame: GreenBoxImage,
    href: "/about/gift-coupon-the-gift-of-learning",
    info: "With the Educare Skill Gift Coupon, you can gift your loved ones the affordable Educare Skill membership plans.",
  },
];

export const HowToGetStartedContent = {
  title: "How To Get Started?",
  description1:
    "With the subsidized support of Department of Culture and Dzongkha Development (DCDD) under Ministry of Home Affairs, Educare Skill is FREE for children aged 3 and above, children enrolled in ECCD center, and students in Classes PP - VI. If you are eligible for the DCDD support, you can click on DCDD Sign In to access free Dzongkha content.",
  description2:
    "If you are not eligible for the DCDD support and wish to start learning and mastering Dzongkha with Educare Skill, please **Sign Up** now and explore our affordable membership plans.",
};

export const memebershipDetails = [
  {
    id: 1,
    memnershipType: "Standard Plans",
    packages: [
      {
        id: 1,
        memebrshipType: "Basic",
        imageSrc: bronze,
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "NR",
          "AS",
          "RA",
          "Chey Chey",
          "FD",
          "BD",
          "Classes IV – VI Tutorials accessible.",
        ],
      },
      {
        id: 2,
        memebrshipType: "Standard",
        imageSrc: sliver,
        yearlyCost: "Nu.5490",
        halfYearlyCost: "Nu.2745",
        monthlyCost: "Nu.549",
        benefits: [
          "NR",
          "AS",
          "RA",
          "Chey Chey",
          "FD",
          "BD",
          "ID",
          "Class IV - VIII Tutorials accessible.",
        ],
      },
      {
        id: 3,
        memebrshipType: "Premium",
        imageSrc: gold,
        yearlyCost: "Nu.5990",
        halfYearlyCost: "Nu.2995",
        monthlyCost: "Nu.599",
        benefits: [
          "NR",
          "AS",
          "RA",
          "Chey Chey",
          "FD",
          "BD",
          "ID",
          "Class IV - XII Tutorials accessible.",
        ],
      },
    ],
  },
  {
    id: 2,
    memnershipType: "Grade-Wise Plans",
    packages: [
      {
        id: 1,
        memebrshipType: "Educare Kids",
        imageSrc: "",
        yearlyCost: "Nu.3990",
        halfYearlyCost: "Nu.1995",
        monthlyCost: "Nu.399",
        benefits: ["NR", "AS", "RA", "FD", "Chey Chey accessible."],
      },
      {
        id: 2,
        memebrshipType: "Primary Level",
        imageSrc: "",
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "NR",
          "AS",
          "RA",
          "FD",
          "BD",
          "Chey Chey",
          "Classes IV - VI Tutorials accessible.",
        ],
      },
      {
        id: 3,
        memebrshipType: "Classes VII - VIII",
        imageSrc: "",
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "AS",
          "RA",
          "BD",
          "ID",
          "Class VII Tutorial",
          "Class VIII Tutorial accessible.",
        ],
      },
      {
        id: 4,
        memebrshipType: "Classes IX - X",
        imageSrc: "",
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "AS",
          "RA",
          "BD",
          "ID",
          "Class IX Tutorial",
          "Class X Tutorial accessible.",
        ],
      },
      {
        id: 5,
        memebrshipType: "Classes XI - XII",
        imageSrc: "",
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "AS",
          "RA",
          "BD",
          "ID",
          "Class XI Tutorial",
          "Class XII Tutorial accessible.",
        ],
      },
      {
        id: 6,
        memebrshipType: "Graduates / BCSE",
        imageSrc: "",
        yearlyCost: "Nu.4990",
        halfYearlyCost: "Nu.2495",
        monthlyCost: "Nu.499",
        benefits: [
          "RA",
          "BD",
          "ID",
          "Dayig",
          "Shaytring",
          "Nyenga",
          "Grammer Solved Questions accessible.",
        ],
      },
    ],
  },
];

export const MemebershipImportantNotice = {
  title: "Important Notice",
  notice: `
Under the **BASIC** plan, users can access content such as Nursery Rhymes (NR), Animation Series (AS), Read Aloud Stories (RA), Chey Chey Mobile Games, Foundational Dzongkha - Gaykid Lobdra (FD), Basic Dzongkha (BD), and Classes IV – VI Tutorials. With the Basic membership, you can use it on **three devices** at the same time.

With the **STANDARD** plan, one can watch and access Nursery Rhymes (NR), Animation Series (AS), Read Aloud Stories (RA), Chey Chey Mobile Games, Foundational Dzongkha - Gaykid Lobdra (FD), Basic Dzongkha (BD), Intermediate Dzongkha (ID) and Classes IV - VIII Tutorials. With the Standard membership, you can use it on **four devices** at the same time.

With the **PREMIUM** plan, users can access Nursery Rhymes (NR), Animation Series (AS), Read Aloud Stories (RA), Chey Chey Mobile Games, Foundational Dzongkha - Gaykid Lobdra (FD), Basic Dzongkha (BD), Intermediate Dzongkha (ID) and Classes IV - XII Tutorials. With the Premium membership, you can use it on **five devices** at the same time.

The aforementioned are the standard plans. Based on your individual’s needs, we also have a **Grade-wise membership plans** as follows.

With the **Educare Kids** plan, users can access content such as Nursery Rhymes (NR), Animation Series (AS), Read Aloud Stories (RA), Chey Chey Mobile Games, and Foundational Dzongkha - Gaykid Lobdra (FD). We recommend this membership plan to children **aged 3 and above, children enrolled in ECCD center and students in Classes PP-III.** With the Educare Kids membership, you can use it on **three devices** at the same time.

Under the **Primary Level** plan, users can access content such as Nursery Rhymes (NR), Animation Series (AS), Read Aloud Stories (RA), Foundational Dzongkha - Gaykid Lobdra (FD), Basic Dzongkha (BD), and Classes IV – VI Tutorials. This package is best for students in **Classes IV- VI.** With the Primary Level membership, you can use it on **three devices** at the same time.

With the **Classes VII - VIII** membership plan, users can access content such as Animation Series (AS), Read Aloud Stories (RA), Basic Dzongkha (BD), Intermediate Dzongkha (ID), and Classes VII – VIII Tutorials. We recommend this membership plan to students in Classes VII-VIII. With this membership plan, you can use it on **three devices** at the same time.

Under the **Classes IX - X** membership plan, users can access content such as Animation Series (AS), Read Aloud Stories (RA), Basic Dzongkha (BD), Intermediate Dzongkha (ID), and Classes IX – X Tutorials. We recommend this membership plan to students in Classes IX- X. With this membership plan, you can use it on **three devices** at the same time.

With the **Classes XI - XII** membership plan, users can access content such as Animation Series (AS), Read Aloud Stories (RA), Basic Dzongkha (BD), Intermediate Dzongkha (ID), and Classes XI – XII Tutorials. We recommend this membership plan to students in Classes XI- XII. With this membership plan, you can use it on **three devices** at the same time.

If you are an undergrade student or graduates sitting for RCSC’s BCSE, we recommend this membership plan to explore and learn lessons of grammar and language, letter and essay writing, and solved questions. With this plan, you can prepare for Dzongkha Exams by accessing content such as Basic Dzongkha (BD), Intermediate Dzongkha (ID), Dayig, Shaytring, Nyenga, Grammar Solved Questions, and Read Aloud Stories (RA). Joining this membership, you can use it on **three devices** at the same time. 

**Before purchasing any Educare Skill Membership plan,** please know the categories of content accessible under each membership plan and select the package accordingly. **Once payment is made, there is no refund policy.**
`,
};

export const RegistrationGuideContent = {
  title: "Registration Guide",
  description:
    "If you are not eligible for the DCDD subsidized support to access Educare Skill for free, don't worry! Yet you want to explore our platform and begin your Dzongkha learning and mastery journey, but you are not quite sure how to register on our platform. We are more than happy to help you get started with the following registration guide.",
  guide: [
    {
      guide1:
        "Open the Educare Skill homepage either through the website or the app. Then click on SIGN IN button.",
      guide2: "After opening the SIGN IN page, click on the SIGN UP link.",
      guide3: "Enter your details, then click on SIGN UP button.",
      guide4:
        "You will receive an OTP on your registered phone number or email address.",
      guide5: "Enter the OTP, and you are now registered on our platform!",
    },
  ],
};

export const ForDCDDUsersContent = {
  title: "For DCDD Users (Free Access)",
  description1:
    "With the subsidized support of Department of Culture and Dzongkha Development (DCDD) under Ministry of Home Affairs, Educare Skill is FREE for children aged 3 and above, children enrolled in ECCD center, and students in Classes PP - VI.",
  description2:
    "If you are eligible for the DCDD support, we are glad to inform you that you have already been registered on Educare Skill!",
  description3:
    "In collaboration with schools and ECCD centres across the country, the Educare Skill support team has already registered all eligible users onto the platform. ",
  description4:
    "Collect your USER ID and PASSWORD from your respective class teacher or ECCD facilitator.",
  guide: {
    // guide1:
    //   "Collect your USER ID and PASSWORD from your respective class teacher or ECCD facilitator.",
    guide2:
      "Open the Educare Skill homepage either through the website or the app. Then, click on **DCDD Sign In**.",
    guide3: "Enter your USER ID and PASSWORD and click on **Sign In**.",
    guide4:
      "You now have access to our treasure trove of engaging and entertaing Dzongkha lessons to embark your Dzongkha mastery journey!",
  },
  importentNote1:
    "If you haven't been registered or were missed during the registration process, or are facing any issues, please don't hesitate to reach out to your class teacher, ECCD facilitator, or the Educare Skill Support Team.",
  importentNote2:
    "For any assistance, contact us at our Toll Free number **2016** or **+975 77718721** or email at support@educareskill.com",
};

export const GiftCouponContent = {
  title: "Gift Coupon",
  subtitle: "The Best Gift You Can Give, The Gift of Learning!",
  buttonName: "Gift the Joy of Learning!",
  linkToGiftCoupon: "https://www.educareskill.com/?tab=gift-coupon",
  subheader: "A meaningful gift for those who think beyond today.",
  description:
    "With the Educare Skill Gift Coupon, you can gift your loved ones the affordable Educare Skill membership plans.",

  buyerGuide: {
    heading: "For the Buyer:",
    steps: [
      {
        step1: "Open the Educare Skill Homepage.",
        step2: "Click on the Gift Coupon Button.",
        step3:
          "Enter the recipient's details such as email address or phone number.",
        step4: "Choose a payment option and complete the payment process.",
        step5:
          "Click on the Join Button for the desired package and select the membership duration.",

        step6:
          "You have now purchased an Educare Skill membership plan for your loved one!",
      },
    ],
  },

  recipientGuide: {
    heading: "For the Recipient:",
    steps: [
      {
        step1:
          "Sign In to the Educare Skill platform either through the website or the app.",
        step2: "Click on Membership Plan.",
        step3: "Enter your Coupon Code.",
        step4: "Click on Redeem.",
        step5: "You have now received an Educare Skill membership!",
      },
    ],
  },
};

export const testimonials = [
  {
    name: "Dorji Pem",
    text: "The way the app uses animations to explain complex chemical reactions is brilliant! My team grasped the concepts much faster than they did with traditional textbooks. The learning videos are also high quality.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Tashi",
    text: "We've seen a real uptick in engagement thanks to the gamified challenges. The competitive element makes mandatory training fun, and the short learning videos are perfect for quick refreshers between tasks",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Dechen Dema",
    text: "The balance between in-depth video lessons and quick, reinforcing games is perfect. I particularly appreciate that the content is easy to navigate. Adding a few more advanced strategy scenarios would be the only improvement.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Norbu Wangchuk",
    text: "The way the app uses animations to explain complex chemical reactions is brilliant! My team grasped the concepts much faster than they did with traditional textbooks. The learning videos are also high quality.",
    avatar: "https://i.pravatar.cc/150?img=55",
  },
  {
    name: "Nobin Rai",
    text: "The balance between in-depth video lessons and quick, reinforcing games is perfect. I particularly appreciate that the content is easy to navigate. Adding a few more advanced strategy scenarios would be the only improvement.",
    avatar: "https://i.pravatar.cc/150?img=41",
  },
];

export const GiftCouponLinkDetail = {
  icon: GiftIcon,
  linkToGiftCoupon: "https://www.educareskill.com/?tab=gift-coupon",
  buttonName: "Gift the joy of learning!",
  title: "A meaningful gift for those who think beyond today.",
  info1:
    "Choosing the right gift is never easy—but some gifts last far beyond toys or trends. An **Educare Skill Gift Coupon** is one such gift.",
  info2:
    "It keeps young minds connected to our national language, Dzongkha, through stories rooted in Bhutanese culture, shaping confident, compassionate citizens ready for the world.",
};

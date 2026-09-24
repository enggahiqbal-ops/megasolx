/**
 * Placeholder content for "Megasolx" — the fictional film/video
 * production business from the Montra Next.js template. This is clearly
 * placeholder/demo content, seeded so the new schema has something to render;
 * edit or replace it in Sanity Studio afterward.
 */

export const siteConfig = {
  name: "Megasolx",
  tagline: "Film & Video Production",
  description:
    "Megasolx is a full-service film and video production studio delivering bold visuals and powerful narratives for brands, artists, and storytellers.",
  url: "https://www.megasolx.com",
  logo: "/assets/montra/images/Montra-Logo.png",
  ctaLabel: "Get a Quote",
  ctaHref: "/contact",
  circleLogoText: "• MEGASOLX FILM AND VIDEO PRODUCTION STUDIO • BRINGING IDEAS TO LIFE ON SCREEN",
  footerHeading: "Megasolx - Film & Video Production",
  footerCopyright: "© 2025 Megasolx. All rights reserved.",
  newsletter: {
    heading: "Subscribe to our newsletter for the latest updates",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/project" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  email: "hello@megasolx.com",
  contact: {
    phone: "+1 (234) 567-8901",
    businessHours: "Mon - Fri: 9AM - 6PM",
    address: "123 Megasolx Bulevard., Los Angeles, CA 90210",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Los%20Angeles%2C%20CA&t=m&z=12&output=embed&iwloc=near",
  },
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://www.x.com/",
    youtube: "https://www.youtube.com/",
  },
  ctaBanner: {
    heading: "Let's Turn Your Vision Into Cinematic Reality",
    body:
      "From concept development to post-production, we craft cinematic experiences that captivate and inspire. Let's create something extraordinary together.",
    buttonLabel: "Free Consultation",
    buttonHref: "/contact",
  },
  trustSection: {
    heading: "Why Brands Trust Megasolx",
    points: [
      {
        number: "01",
        title: "Cinematic Excellence",
        description: "High-end production with film-grade visuals and compelling storytelling.",
      },
      {
        number: "02",
        title: "Creative Teamwork",
        description: "A passionate team of directors, editors & cinematographers.",
      },
      {
        number: "03",
        title: "End to End Services",
        description: "From scripting to post production, all in one place.",
      },
      {
        number: "04",
        title: "Client Focused Approach",
        description: "We listen, adapt, and deliver results that exceed expectations.",
      },
    ],
  },
  trustStat: { value: "150", label: "Projects Completed" },
  highlightCta: {
    heading: "Ready to Bring Your Story to Life?",
    videoId: "fOTgmsqMnQA",
    buttonLabel: "Get Started Today",
    buttonHref: "/contact",
  },
};

export const homePage = {
  hero: {
    headingWordPart1: "Str",
    headingWordPart2: "ong",
    headingLine2: "Crafting Visuals",
    intro:
      "Megasolx is a full-service film production studio delivering bold visuals and powerful narratives. From commercials to creative films we bring your vision to life.",
    showreelVideoId: "pVA0G01aDfk",
  },
  coreServices: {
    heading: "Crafting Stories Through Cinematic Frames",
    image: "/assets/montra/images/young-guy-enjoying-taking-photos-3UJ8HB8.png",
    intro:
      "Megasolx is a creative film and video production studio based on the belief that every story deserves to be told with power, passion, and precision. Whether it's a commercial, documentary, or branded content — we craft visuals that resonate.",
    items: [
      {
        title: "Creative Film Direction",
        description: "Bold creative direction that shapes every frame around your story.",
        highlighted: false,
      },
      {
        title: "Cinematic Visual Style",
        description: "A distinctive visual language, from lighting to color grade.",
        highlighted: false,
      },
      {
        title: "Expert Post Production",
        description: "Editing, VFX, and sound design polished to a cinematic finish.",
        highlighted: true,
      },
      {
        title: "Global Project Reach",
        description: "Production teams and partners ready to work anywhere in the world.",
        highlighted: false,
      },
    ],
  },
};

export const aboutPage = {
  tagline: "Bringing Stories to Life Through Film & Emotion",
  heroStatement:
    "Since our founding in 2009, we've dedicated ourselves to one mission — transforming ideas into powerful visual stories. As a passionate film and video production company, we believe that great storytelling transcends screens — it moves people, builds brands, and leaves a lasting impression.",
  secondaryStatement:
    "Driven by creativity and precision, we specialize in producing cinematic films, branded content, music videos, commercials, and documentaries that connect with audiences worldwide. From concept development to final cut, our team works closely with clients to ensure every frame tells a meaningful story. What started as a small studio with big dreams has evolved into a trusted creative partner for global brands, agencies, artists, and storytellers.",
  stats: [
    { value: "120", label: "Project Delivered" },
    { value: "10", label: "Award Won" },
    { value: "25000000", label: "Video Views" },
    { value: "150", label: "Projects Completed" },
  ],
};

export const contactPage = {
  heading: "Let's Work Together",
  body:
    "Whether you're ready to start a project or just exploring your options, we're here to help. Reach out and let's make something amazing together.",
  faqs: [
    {
      question: "How long does it take to get a response after I submit?",
      answer:
        "We typically respond within 24 hours on business days. If your request is urgent, feel free to call us directly for faster communication.",
    },
    {
      question: "Can I schedule a meeting before discussing project details?",
      answer:
        "Absolutely! We offer free initial consultations to better understand your goals and guide you through the creative process. You can schedule a meeting via our contact form.",
    },
    {
      question: "What information should I include in my message?",
      answer:
        "Please provide as much detail as possible — including your project type, timeline, budget range, and any creative references. This helps us tailor our response and quote accurately.",
    },
    {
      question: "Where is your studio located and can I visit in person?",
      answer:
        "Our studio is based in Los Angeles, CA. In-person meetings are available by appointment only. We also offer virtual meetings for clients worldwide.",
    },
    {
      question: "Do you work with clients outside of the US?",
      answer:
        "Yes, we collaborate with brands, artists, and companies globally. Our team is fully equipped to manage international productions, both remotely and on-location.",
    },
    {
      question: "How do I follow up if I haven't received a response?",
      answer:
        "If you haven't heard from us within 48 hours, please check your spam folder or reach out to us directly via email at hello@megasolx.com.",
    },
  ],
};

export const pricingPage = {
  heading: "Choose a Plan That Fits Your Vision",
  body: "Transparent packages for every stage of production, from a single social clip to a full campaign.",
  faqs: [
    {
      question: "What's included in each pricing plan?",
      answer:
        "Each plan includes pre-production consultation, filming with professional equipment, editing, color grading, and final delivery. Higher-tier packages offer advanced features like drone footage, scriptwriting, and multiple shooting days.",
    },
    {
      question: "Can I customize a plan based on my project needs?",
      answer:
        "Absolutely! We understand that every story is unique. Reach out to us and we'll tailor a custom package that fits your creative goals and budget.",
    },
    {
      question: "Do you offer revisions after the final delivery?",
      answer: "Yes. All our plans include up to 2 rounds of revisions. Premium plans offer more flexibility for feedback and fine-tuning.",
    },
    {
      question: "How long does it take to complete a video project?",
      answer:
        "Project timelines vary based on complexity, but most videos are completed within 2-4 weeks. We'll give you a detailed schedule during the onboarding process.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden charges. All costs are clearly outlined in your chosen package. If any additional services are required, we'll communicate them upfront.",
    },
    {
      question: "Do you provide voiceovers, music licensing, and subtitles?",
      answer:
        "Yes. Voiceovers, royalty-free music licensing, and subtitle options are available depending on your plan. We also offer these as add-ons if needed.",
    },
  ],
};

export const services = [
  {
    slug: "video-production",
    title: "Video Production",
    shortDescription:
      "We handle every step of the film production process from concept development, scripting, casting, location scouting, to on-set direction and cinematography.",
    tags: ["film production", "video shooting", "creative film studio"],
    heroVideoId: "pVA0G01aDfk",
    intro:
      "Our professional video production service is designed to bring your vision to life with clarity, emotion, and cinematic style. Whether you're a brand, content creator, filmmaker, or agency — we take your raw footage and turn it into a polished, engaging story that captures your audience's attention.\n\nWe don't just cut clips — we edit with intention. Every transition, every frame, every color tone is carefully adjusted to ensure the final result reflects your message, aesthetic, and purpose.",
    whatsIncluded: [
      {
        title: "Multi-Cam Footage Syncing & Cutting",
        description: "Flawless synchronization of various camera angles for smooth storytelling.",
      },
      {
        title: "Color Correction & Color Grading",
        description: "Balanced tones and cinematic looks to enhance mood and emotion.",
      },
      {
        title: "Sound Design & Audio Mixing",
        description: "Crystal-clear dialogue, immersive sound effects, and licensed background music.",
      },
      {
        title: "Motion Graphics & Title Animation",
        description: "Custom lower-thirds, intros, and transitions that add professional flair.",
      },
      {
        title: "Revisions & Collaboration",
        description: "Enjoy a collaborative process with rounds of edits to perfect your video.",
      },
    ],
    whyChooseUs: {
      body:
        "With years of experience in the film and video production industry, our editors understand the language of storytelling. We use industry-standard software (Adobe Premiere Pro, After Effects, DaVinci Resolve) and deliver in formats optimized for all platforms — from cinema screens to TikTok reels.",
      bullets: ["Fast Turnaround", "Professional-Grade Quality", "Tailored to Your Brand & Audience"],
      image: "/assets/montra/images/male-video-editor-working-on-his-personal-computer-HQHD8ZL.jpg",
    },
    idealFor: {
      items: [
        "Brand Commercials",
        "Social Media Content",
        "Music Videos",
        "Corporate Videos",
        "Short Films & Documentaries",
        "YouTube Content Creators",
      ],
      image: "/assets/montra/images/operator-setting-his-camera-before-shooting-PURRF9Y.jpg",
    },
    order: 100,
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    shortDescription:
      "With cutting-edge editing suites, we handle everything from rough cuts to final polish — color grading, audio mixing, VFX, transitions, and pacing.",
    tags: ["video editing", "video shooting", "post-production studio"],
    heroVideoId: "pVA0G01aDfk",
    order: 200,
  },
  {
    slug: "script-writing",
    title: "Script Writing",
    shortDescription:
      "Every powerful video starts with a compelling script. Our writers and visual artists craft clear narratives and detailed storyboards to guide your production.",
    tags: ["script writing", "storyboard", "creative direction"],
    heroVideoId: "pVA0G01aDfk",
    order: 300,
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics",
    shortDescription:
      "We handle every step of the film production process from concept development, scripting, casting, location scouting, to on-set direction and cinematography.",
    tags: ["film production", "video shooting", "creative film studio"],
    heroVideoId: "pVA0G01aDfk",
    order: 400,
  },
  {
    slug: "sound-design",
    title: "Sound Design",
    shortDescription:
      "We handle every step of the film production process from concept development, scripting, casting, location scouting, to on-set direction and cinematography.",
    tags: ["film production", "video shooting", "creative film studio"],
    heroVideoId: "pVA0G01aDfk",
    order: 500,
  },
];

export const projects = [
  {
    slug: "urban-soul",
    title: "Urban Soul",
    coverImage: "/assets/montra/images/woman-operating-video-camera-in-neon-lights-NNLG5VA.jpg",
    tags: ["Music Video"],
    workBlurb: "A high-energy music video collaboration blending gritty city aesthetics with smooth R&B vibes.",
    heroVideoId: "Go8gUX_HZAY",
    client: "Jayverra (Independent Music Artist)",
    category: "Music Video",
    location: "Downtown Los Angeles, USA",
    duration: "3 minutes 45 seconds",
    deliveryFormat: "4K, optimized for YouTube",
    roleItems: [
      "Concept Development & Storyboarding",
      "Location Scouting & Set Design",
      "Cinematography & Drone Shots",
      "Lighting & Direction",
      "Video Editing & Motion Graphics",
      "Color Grading for a Neo-Noir Look",
    ],
    about:
      "\"Urban Soul\" is a high-energy music video collaboration with independent artist Jayverra, blending gritty city aesthetics with smooth R&B vibes. Set in the heart of downtown L.A., this project captures the raw essence of street life and transforms it into an emotionally driven visual narrative.\n\nWe worked closely with the artist to develop a video concept that reflects the emotions of the lyrics, the tempo of the beat, and the visual identity of the track — resulting in a production that feels both cinematic and personal.",
    behindTheScenes:
      "We filmed across 3 different urban backdrops, incorporating elements of neon lighting, handheld camera movements, and slow-motion scenes to amplify the emotional core of the track. With a limited production window of 2 days, our team managed to maximize every frame using strategic lighting and dynamic camera setups.",
    creativeDirection:
      "The visual tone of Urban Soul was inspired by neo-soul aesthetics, mixing deep contrast lighting and urban textures to evoke emotion. We applied a cool-toned color grade to balance warmth from the performance scenes, bringing contrast and emotional weight to the final cut.",
    results: [
      { value: "30K+", label: "views in the first week of release" },
      { value: "IndieVibes", label: "Featured on IndieVibes Music Blog" },
      { value: "TikTok & Instagram", label: "Shared widely on TikTok & Instagram" },
      { value: "+25%", label: "Boost to the artist's subscriber count" },
    ],
    gallery: [
      "/assets/montra/images/operator-setting-his-camera-before-shooting-PURRF9Y.jpg",
      "/assets/montra/images/woman-operating-video-camera-in-neon-lights-NNLG5VA.jpg",
      "/assets/montra/images/photographers-setting-cameras-before-shooting-65ME2DS.jpg",
      "/assets/montra/images/cameraman-operating-equipment-in-studio-T3LZ2B2.jpg",
    ],
    featured: true,
    order: 100,
  },
  {
    slug: "echoes-of-fashion",
    title: "Echoes of Fashion",
    coverImage: "/assets/montra/images/composite-collage-of-people-expressing-positive-em-JJYFLK3.jpg",
    tags: ["Commercial Ad"],
    workBlurb: "A commercial campaign built around bold, editorial-style visuals for a fashion brand.",
    heroVideoId: "LqTk5IbBxgs",
    featured: true,
    order: 200,
  },
  {
    slug: "the-journey",
    title: "The Journey",
    coverImage: "/assets/montra/images/photographer-capture-the-essence-of-the-opening-ce-TU8TLN7.jpg",
    tags: ["Travel Documentary"],
    workBlurb: "A travel documentary following a journey across three continents, told through intimate vignettes.",
    heroVideoId: "Np4EN8ZPMFU",
    featured: true,
    order: 300,
  },
  {
    slug: "legacy",
    title: "Legacy",
    coverImage: "/assets/montra/images/film-industry-7ZLFY7L.jpg",
    tags: ["Short Film"],
    workBlurb: "A short film exploring family, memory, and what we leave behind.",
    heroVideoId: "DOeuljcKkTI",
    featured: true,
    order: 400,
  },
  {
    slug: "launch-bold",
    title: "Launch Bold",
    coverImage: "/assets/montra/images/cameraman-filming-music-video-CD7JKUM.jpg",
    tags: ["Product Teaser"],
    workBlurb: "A product teaser campaign designed to build anticipation ahead of a global launch.",
    heroVideoId: "BCKMzk2rRKo",
    featured: true,
    order: 500,
  },
];

export const team = [
  {
    name: "Daniel Reyes",
    role: "Creative Director",
    photo: "/assets/montra/images/Envatolabs-8.jpg",
    order: 100,
  },
  {
    name: "Maya Chen",
    role: "Director of Photography",
    photo: "/assets/montra/images/Envatolabs-11.jpg",
    order: 200,
  },
  {
    name: "Sasha Morgan",
    role: "Scriptwriter",
    photo: "/assets/montra/images/Envatolabs-9.jpg",
    order: 300,
  },
  {
    name: "Leo Fernandez",
    role: "Lead Video Editor",
    photo: "/assets/montra/images/Envatolabs-12.jpg",
    order: 400,
  },
  {
    name: "Jamal Brown",
    role: "Sound Designer",
    photo: "/assets/montra/images/Envatolabs-10.jpg",
    order: 500,
  },
  {
    name: "Tara Lin",
    role: "Production Manager",
    photo: "/assets/montra/images/Envatolabs-7.jpg",
    order: 600,
  },
].map((member) => ({
  ...member,
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    x: "https://www.x.com/",
  },
}));

export const clients = [
  { id: "partner-1", name: "Partner 1", logo: "/assets/montra/images/Client-1.png", width: 140, height: 60, order: 100 },
  { id: "partner-2", name: "Partner 2", logo: "/assets/montra/images/Client-2.png", width: 140, height: 60, order: 200 },
  { id: "partner-5", name: "Partner 5", logo: "/assets/montra/images/Client-5.png", width: 140, height: 60, order: 300 },
  { id: "partner-6", name: "Partner 6", logo: "/assets/montra/images/Client-6.png", width: 140, height: 60, order: 400 },
  { id: "partner-7", name: "Partner 7", logo: "/assets/montra/images/Client-7.png", width: 140, height: 60, order: 500 },
];

export const testimonials = [
  {
    name: "Alex Morgan",
    role: "Marko Agency",
    quote:
      "Working with Megasolx was a seamless process from start to finish, delivering exceptional visuals that exceeded our creative expectations perfectly.",
    avatar: "/assets/montra/images/composite-collage-of-people-expressing-positive-em-JJYFLK3.jpg",
    order: 100,
  },
  {
    name: "Jamie Carter",
    role: "Lumia Agency",
    quote:
      "Megasolx's production team delivered stunning work, showing clear attention to detail and an incredible ability to capture the message effectively.",
    avatar: "/assets/montra/images/Photo-5.jpg",
    order: 200,
  },
  {
    name: "Chloe Ramirez",
    role: "Novax Media",
    quote:
      "Megasolx turned a complex script into a visually engaging production that not only met our vision, but also added layers of depth, story, and clarity we hadn't imagined.",
    avatar: "/assets/montra/images/Photo-13.jpg",
    order: 300,
  },
  {
    name: "David Foster",
    role: "Astrafilm",
    quote:
      "We chose Megasolx for their vision, and they brought our documentary to life with professionalism, artistry, and timely communication throughout.",
    avatar: "/assets/montra/images/Photo-12.jpg",
    order: 400,
  },
  {
    name: "Ethan Brooks",
    role: "Velocity Creative",
    quote:
      "Impressed by their dedication and storytelling. Megasolx crafted visuals that matched our goals and resonated strongly with our audience base.",
    avatar: "/assets/montra/images/Photo-6.jpg",
    order: 500,
  },
  {
    name: "Nicole Adams",
    role: "Gravitas Media",
    quote:
      "Every shot, every transition, every frame - Megasolx brought cinematic brilliance with unmatched precision and style that made our brand shine.",
    avatar: "/assets/montra/images/Photo-1.jpg",
    order: 600,
  },
];

export const pricingPlans = [
  {
    name: "Basic Plan",
    price: "$299",
    billingLabel: "/project",
    description: "Ideal for social media & promos.",
    features: [
      "Up to 1-minute video",
      "1 shooting location",
      "1 revision round",
      "Basic editing & color correction",
      "Royalty-free background music",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    order: 100,
  },
  {
    name: "Standard Plan",
    price: "$599",
    billingLabel: "/project",
    description: "Best for commercials & brand videos.",
    features: [
      "Up to 3-minute video",
      "Up to 2 locations",
      "2 revision rounds",
      "Scriptwriting support",
      "Licensed music included",
    ],
    highlighted: true,
    ctaLabel: "Get Started",
    order: 200,
  },
  {
    name: "Premium Plan",
    price: "$1,299",
    billingLabel: "/project",
    description: "For cinematic projects & full campaigns.",
    features: [
      "Up to 6-minute video",
      "Up to 4 locations",
      "3 revision rounds",
      "Drone footage & full scriptwriting",
      "Licensed music & voiceover included",
    ],
    highlighted: false,
    ctaLabel: "Get Started",
    order: 300,
  },
];

export const articles = [
  {
    slug: "directing-with-emotion",
    title: "Directing with Emotion: Crafting Impactful Scenes",
    excerpt:
      "How the smallest directing choices — a pause, a glance, a camera move — shape the emotional weight of a scene.",
    category: ["Creative Direction"],
    tags: ["Video Editing", "Cinematography", "Story Boarding", "Lighting Design", "Film Gear", "Post Production"],
    date: "July 19, 2025",
    readTime: "6 min read",
    image: "/assets/montra/images/woman-operating-video-camera-in-neon-lights-NNLG5VA.jpg",
    body:
      "Emotion on screen rarely comes from a single dramatic moment — it comes from a hundred small decisions stacked together. A held pause before a line, a camera that drifts instead of cuts, a color grade that leans warm instead of cold. On set, we treat every one of these choices as part of the story, not just the technical layer underneath it.\n\nWhen we plan a shoot, we start from the emotional beat we want the audience to feel, then work backwards into blocking, lensing, and pacing. That discipline is what turns a technically competent video into one that actually moves people.",
  },
  {
    slug: "behind-the-scenes-visual-concept",
    title: "Behind the Scenes: Building a Visual Concept from Scratch",
    excerpt: "From mood boards to shot lists — how a Megasolx visual concept comes together before a single frame is shot.",
    category: ["Creative Direction"],
    tags: [],
    date: "July 19, 2025",
    readTime: "5 min read",
    image: "/assets/montra/images/video-production-backstage-behind-the-scenes-of-cr-L3RXVKA.jpg",
    body:
      "Every project starts long before the camera rolls. We build a mood board, pull reference stills, and argue — a lot — about color, pace, and tone until a clear visual language emerges. Only once that's locked do we move into shot lists and a real production plan.\n\nThis upfront work is what keeps a shoot day fast and focused: everyone on set already knows what the finished piece is supposed to feel like.",
  },
  {
    slug: "choosing-the-right-lenses",
    title: "Choosing the Right Lenses for Storytelling",
    excerpt: "Lens choice is a storytelling decision, not just a technical one. Here's how we think about it.",
    category: ["Production Insights"],
    tags: [],
    date: "July 19, 2025",
    readTime: "4 min read",
    image: "/assets/montra/images/two-confident-coworkers-indian-bearded-businessman-QHK94WX.jpg",
    body:
      "A wide lens close to a subject feels intimate and a little uneasy. A long lens from a distance feels observational, almost voyeuristic. Neither is 'correct' — it depends entirely on what the scene needs to say.\n\nOn most Megasolx shoots we carry a small, deliberate set of primes rather than a do-everything zoom, precisely so every lens swap is a creative decision instead of a convenience one.",
  },
  {
    slug: "beginners-guide-to-filmmaking",
    title: "Beginner's Guide to Filmmaking with Minimal Budget",
    excerpt: "You don't need a full crew and a cinema camera to tell a compelling story. Here's where to start.",
    category: ["Filmmaking Tips"],
    tags: [],
    date: "July 19, 2025",
    readTime: "7 min read",
    image: "/assets/montra/images/photographers-setting-cameras-before-shooting-65ME2DS.jpg",
    body:
      "The gear matters far less than most beginners think. A single well-lit interview, shot on a modest camera with a clean audio recording, will always beat a chaotic multi-camera setup with bad sound.\n\nStart small: one location, one subject, one clear idea of what the piece is about. Everything else — gear, crew, scale — can grow once you've proven you can finish a story.",
  },
  {
    slug: "post-production-workflow",
    title: "Post-Production Workflow: From Rough Cut to Final Render",
    excerpt: "A look at how footage moves from the edit bay through color, sound, and delivery.",
    category: ["Production Insights"],
    tags: [],
    date: "July 19, 2025",
    readTime: "6 min read",
    image: "/assets/montra/images/photographer-capture-the-essence-of-the-opening-ce-TU8TLN7.jpg",
    body:
      "A rough cut is where the story gets found — pacing, structure, and the emotional arc all get tested before a single color or sound decision is made. Only once that cut is approved do we move into color grading and sound design in parallel.\n\nKeeping those stages sequential, rather than rushing color and sound in before the edit is locked, is the single biggest thing that keeps our post schedules predictable.",
  },
  {
    slug: "lighting-techniques-that-set-the-mood",
    title: "Lighting Techniques That Set the Mood",
    excerpt: "Three simple lighting setups we return to again and again, and what mood each one creates.",
    category: ["Production Insights"],
    tags: [],
    date: "July 19, 2025",
    readTime: "5 min read",
    image: "/assets/montra/images/operator-setting-his-camera-before-shooting-PURRF9Y.jpg",
    body:
      "Hard, directional light with deep shadows reads as tense or dramatic. Soft, wrapped light reads as warm and safe. Practical lights in-frame add texture and a sense of place that a clean three-point setup never quite achieves on its own.\n\nWe pick a lighting approach for a scene the same way we pick a lens — based on how we want the audience to feel, not what's fastest to rig.",
  },
  {
    slug: "storyboarding-for-short-films",
    title: "How to Master the Art of Storyboarding for Short Films",
    excerpt: "Storyboards aren't just for big-budget productions — here's how we use them on every shoot.",
    category: ["Filmmaking Tips"],
    tags: [],
    date: "July 19, 2025",
    readTime: "5 min read",
    image: "/assets/montra/images/male-video-editor-working-on-his-personal-computer-HQHD8ZL.jpg",
    body:
      "A storyboard doesn't need to be a work of art — it needs to answer one question per panel: what does the audience see and feel here? That's enough to catch pacing problems and coverage gaps long before a shoot day.\n\nWe sketch fast and rough, then walk the boards with the whole crew so everyone is working from the same mental movie.",
  },
  {
    slug: "essential-gear-checklist",
    title: "Essential Gear Checklist for Your Next Shoot",
    excerpt: "The short list of gear we double-check before every single production leaves the studio.",
    category: ["Production Insights"],
    tags: [],
    date: "July 19, 2025",
    readTime: "4 min read",
    image: "/assets/montra/images/film-industry-7ZLFY7L.jpg",
    body:
      "Camera bodies and lenses get all the attention, but most shoot-day disasters come from the boring stuff: batteries, media cards, audio backups, and gaffer tape. We run a physical checklist before every load-out, no exceptions.\n\nRedundancy is the whole game — two of everything that can fail, and a backup plan for the plan.",
  },
  {
    slug: "vision-to-screen",
    title: "From Vision to Screen: How We Plan Every Shot",
    excerpt: "How a single line in a script becomes a fully planned, shot-listed sequence on set.",
    category: ["Creative Direction"],
    tags: [],
    date: "July 19, 2025",
    readTime: "6 min read",
    image: "/assets/montra/images/cameraman-operating-equipment-in-studio-T3LZ2B2.jpg",
    body:
      "Between the script and the set, every scene passes through a shot list that spells out framing, movement, and intent for each setup. That document is what keeps a shoot day efficient without sacrificing the creative vision.\n\nIt also means everyone — director, DP, gaffer — is solving the same problem instead of improvising in different directions.",
  },
  {
    slug: "cinematic-camera-angles",
    title: "5 Cinematic Camera Angles Every Director Should Know",
    excerpt: "A quick reference to five angles we reach for constantly, and the feeling each one creates.",
    category: ["Filmmaking Tips"],
    tags: [],
    date: "July 19, 2025",
    readTime: "5 min read",
    image: "/assets/montra/images/cameraman-filming-music-video-CD7JKUM.jpg",
    body:
      "The low angle builds power, the high angle diminishes it, the Dutch tilt unsettles, the over-the-shoulder builds connection, and the wide establishing shot grounds the audience in space. None of these are tricks — they're tools, and knowing which one a scene calls for is most of the job.\n\nWe keep this list taped to the inside of every shot-planning session as a gut-check against defaulting to the same coverage every time.",
  },
];

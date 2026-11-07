export const SITE = {
  name: "Arckey Interiors and Construction",
  shortName: "Arckey",
  tagline: "Interiors and construction, delivered without the chaos.",
  description:
    "Arckey Interiors and Construction designs and builds residential and commercial interiors in Delhi NCR, from modular kitchens and Vastu-aligned homes to offices and turnkey projects.",
  owner: "Ms Arti Gupta",
  phoneDisplay: "+91 98103 77686",
  phoneTel: "+919810377686",
  whatsapp: "https://wa.me/919810377686",
  addressLines: ["105, Pearl Business Park", "Netaji Subhash Place", "Delhi"],
  addressOneLine: "105, Pearl Business Park, Netaji Subhash Place, Delhi",
  googleProfile: "https://share.google/fM5ZeMF2AMoMtNAVI",
  instagram: "https://www.instagram.com/arckey_interiors_and_construct/",
  parentCompany: { name: "Miggla", url: "https://www.miggla.com" },
  // Set NEXT_PUBLIC_SITE_URL in your host's environment once the domain is live.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  // Create a form at formspree.io and put its ID (the part after /f/) in NEXT_PUBLIC_FORMSPREE_ID.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
};

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const PROCESS = [
  { step: "01", title: "Schedule a Visit", body: "Tell us about your space. We visit the site, measure and listen." },
  { step: "02", title: "Consult & Plan", body: "We discuss layout, style, Vastu preferences and a realistic budget." },
  { step: "03", title: "Design & Build", body: "Detailed designs are approved, then executed on site with regular updates." },
  { step: "04", title: "Move In", body: "A final walkthrough and handover, so you step into a finished space." },
];

export const WHY = [
  { title: "Beyond aesthetics", body: "Spaces that look good and work well every day." },
  { title: "Tailored for you", body: "No templates. Every project starts from your needs." },
  { title: "Vastu-aware design", body: "Layouts that respect Vastu where you want it." },
  { title: "Design and construction together", body: "Fewer handoffs, clearer accountability." },
];

// "Spaces we design" tiles. Photos live in /public/work. A tile without `image` shows a plain colour swatch.
export const WORK: {
  title: string;
  tag: string;
  layout: string;
  swatch: string;
  hatch: boolean;
  image?: string;
  alt?: string;
  position?: string; // CSS object-position, to choose which part of the photo stays in view
}[] = [
  {
    title: "Living rooms",
    tag: "Residential",
    layout: "sm:col-span-2 sm:row-span-2 min-h-72",
    swatch: "bg-ink text-chalk",
    hatch: false,
    image: "/work/living-rooms.webp",
    alt: "Double-height living room with cream sofas, a shaggy rug and a floating staircase",
    position: "center 62%",
  },
  {
    title: "Modular kitchens",
    tag: "Residential",
    layout: "min-h-56",
    swatch: "bg-plaster text-ink",
    hatch: true,
    image: "/work/modular-kitchens.webp",
    alt: "Modern modular kitchen with taupe cabinets, built-in ovens and a marble floor",
    position: "center 55%",
  },
  {
    title: "Bedrooms",
    tag: "Residential",
    layout: "min-h-56",
    swatch: "bg-marigold text-ink-deep",
    hatch: false,
    image: "/work/bedrooms.webp",
    alt: "Master bedroom with a quilted headboard wall, wooden floor and a cove-lit ceiling",
    position: "center 68%",
  },
  {
    title: "Offices",
    tag: "Commercial",
    layout: "min-h-56",
    swatch: "bg-ink-deep text-chalk",
    hatch: false,
    image: "/work/offices.webp",
    alt: "Open-plan office with planter-topped workstations and linear pendant lights",
    position: "center 65%",
  },
  {
    title: "Apartment interiors",
    tag: "Residential",
    layout: "min-h-56",
    swatch: "bg-rule/60 text-ink",
    hatch: true,
    image: "/work/apartment-interiors.webp",
    alt: "Apartment living room with a marble feature wall, cove lighting and a cream sectional sofa",
    position: "center 45%",
  },
];

export const FAQS = [
  {
    q: "What services does Arckey offer?",
    a: "We handle residential and commercial interior design, modular kitchens, turnkey projects, construction and renovation work, and design consultation.",
  },
  {
    q: "Do you work on commercial projects as well as homes?",
    a: "Yes. We design and execute offices, showrooms and retail spaces as well as apartments and houses.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the size and scope. After the site visit we share a realistic timeline with the quotation, and keep you updated through execution.",
  },
  {
    q: "What does turnkey mean?",
    a: "One team manages everything from design to civil work, carpentry, electrical, finishing and handover, so you deal with a single point of contact.",
  },
  {
    q: "How do I get an estimate?",
    a: "Send us a callback request using the form on this page, message us on WhatsApp, or call us. The first consultation is free and carries no obligation.",
  },
  {
    q: "Which areas do you serve?",
    a: "We are based in Delhi and work across Delhi NCR. Contact us for projects elsewhere.",
  },
];

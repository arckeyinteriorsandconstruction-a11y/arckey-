export type ServicePage = {
  slug: string;
  title: string; // card + breadcrumb label
  summary: string; // card text
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  included: string[];
  suitableFor: string[];
  considerations: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: ServicePage[] = [
  {
    slug: "residential-interior-design",
    title: "Residential Interior Design",
    summary:
      "Complete home interiors for apartments, builder floors and independent houses, planned around how your family actually lives.",
    metaTitle: "Residential Interior Design in Delhi NCR",
    metaDescription:
      "Home interior design for apartments, builder floors and houses in Delhi NCR. Space planning, modular work, false ceilings, lighting and Vastu-aware layouts. Book a free consultation.",
    h1: "Residential Interior Design in Delhi NCR",
    intro:
      "Your home should work for the way you live, not just look good in photographs. We plan layouts, storage, lighting and finishes together, then build them on site, so the design you approve is the home you get.",
    included: [
      "Site visit, measurement and requirement discussion",
      "Space planning and furniture layout",
      "Modular wardrobes, TV units, storage and custom carpentry",
      "False ceiling and lighting design",
      "Wall finishes, paint, panelling and flooring guidance",
      "Electrical and plumbing coordination",
      "Site supervision and final handover walkthrough",
    ],
    suitableFor: [
      "New flats and builder floors that need complete interiors",
      "Independent houses and villas",
      "Homeowners renovating one or more rooms",
    ],
    considerations: [
      {
        title: "Start with storage",
        body: "Most Delhi homes are short on storage. Planning wardrobes, loft space and utility storage first usually prevents clutter and expensive changes later.",
      },
      {
        title: "Lighting changes everything",
        body: "Layered lighting, combining ceiling, task and accent light, makes the same room feel larger and calmer than a single bright fixture.",
      },
      {
        title: "Vastu, if you want it",
        body: "If Vastu matters to your family, tell us at the start. It is easiest to respect during space planning, not after the walls are finished.",
      },
    ],
    faqs: [
      {
        q: "Can you design only part of my home?",
        a: "Yes. We take up single rooms, such as a bedroom, living room or pooja room, as well as complete homes.",
      },
      {
        q: "Do you handle execution or only the design?",
        a: "Both. Design, civil work, carpentry, electrical and finishing can be managed by one team, or you can take the design alone.",
      },
      {
        q: "How do I get a quotation?",
        a: "We visit the site, understand your requirements and budget, and then share a detailed quotation. The first consultation is free.",
      },
    ],
  },
  {
    slug: "commercial-interior-design",
    title: "Commercial Interior Design",
    summary: "Offices, showrooms and retail spaces designed for brand, workflow and a clean handover.",
    metaTitle: "Commercial & Office Interior Design in Delhi",
    metaDescription:
      "Office, showroom and retail interior design and fit-out in Delhi NCR. Space planning, workstations, branding and turnkey execution by Arckey Interiors and Construction.",
    h1: "Commercial & Office Interior Design in Delhi",
    intro:
      "A workplace or shop is a working tool. We design commercial interiors around your team, customers and brand, and manage the fit-out so you can open on schedule.",
    included: [
      "Space planning for workstations, cabins, meeting rooms and reception",
      "Retail and showroom layouts, display and counters",
      "Branding elements, signage and feature walls",
      "Ceiling, lighting and acoustic planning",
      "Electrical, data and HVAC coordination",
      "Furniture and carpentry",
      "Project supervision and handover",
    ],
    suitableFor: [
      "Offices and co-working spaces",
      "Showrooms, boutiques and retail outlets",
      "Clinics, studios and professional practices",
    ],
    considerations: [
      {
        title: "Plan for growth",
        body: "A layout that can add desks or reconfigure rooms costs far less than a fit-out you have to redo in two years.",
      },
      {
        title: "Downtime is expensive",
        body: "Sequencing work and agreeing timelines early reduces the time your space sits idle.",
      },
      {
        title: "Approvals and building rules",
        body: "Many commercial buildings have fit-out rules and timings. We coordinate with building management during planning.",
      },
    ],
    faqs: [
      {
        q: "Do you work within existing office buildings and business parks?",
        a: "Yes. We plan work around the building's fit-out guidelines and working hours.",
      },
      {
        q: "Can you work to a fixed budget?",
        a: "Yes. Share your budget at the start and we will plan materials and scope to fit it.",
      },
      {
        q: "Do you offer design and build together?",
        a: "Yes. Design and construction are handled by one team, which keeps accountability clear.",
      },
    ],
  },
  {
    slug: "turnkey-interior-projects",
    title: "Turnkey Projects",
    summary:
      "One team from concept to keys: design, civil work, carpentry, electrical, finishing and site supervision.",
    metaTitle: "Turnkey Interior Projects in Delhi NCR",
    metaDescription:
      "End-to-end turnkey interior and construction projects in Delhi NCR. Design, civil work, carpentry, electrical, finishing and handover managed by one team.",
    h1: "Turnkey Interior Projects in Delhi NCR",
    intro:
      "With a turnkey project you deal with one team and one point of contact. We handle design, materials, trades, supervision and handover, so you are not coordinating a dozen contractors.",
    included: [
      "Concept, layout and detailed drawings",
      "Itemised quotation and project schedule",
      "Civil, masonry and remodelling work",
      "Carpentry, modular work and furniture",
      "Electrical, plumbing and false ceiling",
      "Painting, polishing and finishing",
      "Site supervision, quality checks and handover",
    ],
    suitableFor: [
      "Owners who do not want to manage multiple contractors",
      "Homeowners living outside Delhi or busy with work",
      "Businesses with a fixed opening date",
    ],
    considerations: [
      {
        title: "Clarity before work starts",
        body: "An itemised quotation and approved drawings protect both sides. Changes after approval are discussed and priced before they happen.",
      },
      {
        title: "One owner of the outcome",
        body: "When design and execution sit with one team, problems on site are solved quickly instead of being passed between vendors.",
      },
    ],
    faqs: [
      {
        q: "What does a turnkey project include?",
        a: "Design, civil work, carpentry, electrical, finishing and handover. We confirm the exact scope in writing before starting.",
      },
      {
        q: "Will I have to be on site?",
        a: "Not daily. We share regular updates and ask for your decisions at defined stages.",
      },
      {
        q: "Can I change something midway?",
        a: "Small changes are possible. We discuss the impact on cost and timeline first.",
      },
    ],
  },
  {
    slug: "modular-kitchen-design",
    title: "Modular Kitchen",
    summary: "Functional, durable kitchens with smart storage, built to suit your cooking and your layout.",
    metaTitle: "Modular Kitchen Design in Delhi NCR",
    metaDescription:
      "Custom modular kitchen design and installation in Delhi NCR. Smart storage, durable materials and layouts built around how you cook. Free consultation.",
    h1: "Modular Kitchen Design in Delhi NCR",
    intro:
      "A good kitchen is planned around how you cook: where you chop, where you store, how many people use it. We design modular kitchens for Indian cooking, then fit them precisely to your space.",
    included: [
      "Layout planning: straight, L-shaped, U-shaped, parallel or island",
      "Base and wall cabinets, tall units and corner solutions",
      "Drawers, baskets, pull-outs and organisers",
      "Countertop, backsplash and sink planning",
      "Chimney, hob and appliance placement",
      "Lighting and ventilation planning",
      "Measured installation and finishing",
    ],
    suitableFor: [
      "New homes needing a complete kitchen",
      "Kitchen renovations and upgrades",
      "Small kitchens that need smarter storage",
    ],
    considerations: [
      {
        title: "Plan the work triangle",
        body: "Keeping the sink, hob and refrigerator within easy reach cuts daily effort more than any single fitting.",
      },
      {
        title: "Heat, oil and moisture",
        body: "Indian cooking is hard on materials. Carcass, shutter and hardware choices should be made for durability, not only appearance.",
      },
      {
        title: "Measure after civil work",
        body: "Final measurements are taken once tiling and plumbing are done, so cabinets fit without gaps.",
      },
    ],
    faqs: [
      {
        q: "Can you fit a modular kitchen in a small space?",
        a: "Yes. Small kitchens often gain the most from planned storage, such as corner units, tall units and pull-outs.",
      },
      {
        q: "Do you handle civil and plumbing changes?",
        a: "Yes. We can coordinate tiling, plumbing and electrical changes along with the kitchen.",
      },
      {
        q: "How do I decide on materials?",
        a: "We explain the options and trade-offs for your budget and usage, and help you choose.",
      },
    ],
  },
  {
    slug: "construction-and-renovation",
    title: "Construction & Renovation",
    summary:
      "Structural changes, remodelling and renovation work handled alongside the interiors, under one roof.",
    metaTitle: "Construction & Renovation Services in Delhi",
    metaDescription:
      "Home and office renovation, remodelling and construction work in Delhi NCR, handled together with interiors by Arckey Interiors and Construction.",
    h1: "Construction & Renovation in Delhi",
    intro:
      "Renovation goes better when the builder and the designer are the same team. We handle remodelling and construction work together with the interiors, so the design and the site stay in step.",
    included: [
      "Site assessment and renovation planning",
      "Demolition, masonry and layout changes",
      "Flooring, tiling and waterproofing",
      "Electrical and plumbing rework",
      "Bathroom and kitchen remodelling",
      "Painting and finishing",
      "Supervision and clean handover",
    ],
    suitableFor: [
      "Older homes needing a refresh or new layout",
      "Offices being reconfigured",
      "Owners combining renovation with new interiors",
    ],
    considerations: [
      {
        title: "Inspect before you plan",
        body: "Old plumbing, wiring and seepage are best found at the start, before they show up behind a new finish.",
      },
      {
        title: "Permissions",
        body: "Structural changes may need approval from your society or the authorities. Check before work begins.",
      },
    ],
    faqs: [
      {
        q: "Do you take up renovation without interiors?",
        a: "Yes, depending on the scope. Contact us with details and we will advise.",
      },
      {
        q: "Can I live in the house during renovation?",
        a: "It depends on the scope. For larger work we recommend moving out, and we plan the sequence to shorten the disruption.",
      },
    ],
  },
  {
    slug: "interior-design-consultation",
    title: "Design Consultation",
    summary: "Site visit, layout advice, material guidance and budgeting if you only need expert direction.",
    metaTitle: "Interior Design Consultation in Delhi",
    metaDescription:
      "Interior design consultation in Delhi NCR: site visit, layout advice, material selection and budgeting from Arckey Interiors and Construction. Book a free first consultation.",
    h1: "Interior Design Consultation in Delhi",
    intro:
      "Not every project needs full execution. A consultation gives you a trained eye on your layout, materials and budget, so you decide with confidence, whether you build with us or with someone else.",
    included: [
      "Site visit and requirement discussion",
      "Layout and space-use advice",
      "Material, colour and lighting guidance",
      "Budget planning and priority advice",
      "Review of existing plans or quotations",
    ],
    suitableFor: [
      "Owners at the planning stage",
      "People comparing quotations from other contractors",
      "Homeowners who want to renovate in phases",
    ],
    considerations: [
      {
        title: "Bring what you have",
        body: "Floor plans, photos, reference images and a rough budget make the session far more productive.",
      },
    ],
    faqs: [
      {
        q: "Is the first consultation free?",
        a: "Yes, the first consultation is free and carries no obligation.",
      },
      {
        q: "Can I take the design and execute it elsewhere?",
        a: "That is possible depending on the scope. Tell us what you need and we will explain the options.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

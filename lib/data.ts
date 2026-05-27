// ---------------------------------------------------------------------------
// Editable content for the Neat Affiliates landing page.
// Change copy, brands, commission tiers and FAQs here without touching markup.
// ---------------------------------------------------------------------------

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Why Join", href: "#why-join" },
  { label: "News", href: "#news" },
  { label: "Our Brands", href: "#brands" },
  { label: "Commission Rate", href: "#commission" },
  { label: "FAQ", href: "#faq" },
];

// ---------------------------------------------------------------------------

export type Feature = {
  icon: string; // Material Symbols icon name
  iconColor: string; // Tailwind text color class
  iconBg: string; // Tailwind background color class
  title: string;
  description: string;
};

export const whyJoinFeatures: Feature[] = [
  {
    icon: "verified",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    title: "Known and Trusted Brands",
    description:
      "High conversion rates driven by reputable brands that players already recognize and trust. 24/7 support for players enhances retention and boosts overall performance.",
  },
  {
    icon: "monitoring",
    iconColor: "text-cyan-glitter",
    iconBg: "bg-cyan-glitter/10",
    title: "Real-time Analytics",
    description:
      "Track your performance with millisecond precision. Our dashboard provides deep insights into conversion funnels and player value, letting you optimize on the fly.",
  },
  {
    icon: "payments",
    iconColor: "text-electric-orange",
    iconBg: "bg-electric-orange/10",
    title: "On-time Payouts",
    description:
      "Reliability is our core value. Receive your earnings through multiple payment methods including crypto, bank transfer, and e-wallets, always on the scheduled date.",
  },
  {
    icon: "handshake",
    iconColor: "text-tertiary",
    iconBg: "bg-tertiary/10",
    title: "Flexible Commission Deals",
    description:
      "Revenue share, CPA or hybrid—choose the deal structure that fits your traffic. Rates are configurable per partnership, so your earnings scale with the value you bring.",
  },
  {
    icon: "support_agent",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    title: "Dedicated Account Manager",
    description:
      "Work directly with a manager who knows your brands and your goals. Get proactive guidance, custom promotions and fast answers whenever you need them.",
  },
];

// ---------------------------------------------------------------------------

export type Brand = { name: string; colorClass: string };

export const brands: Brand[] = [
  { name: "DAVEGAS", colorClass: "text-cyan-glitter" },
  { name: "BETS10", colorClass: "text-neon-purple" },
  { name: "CASINOMAXI", colorClass: "text-electric-orange" },
  { name: "MOBILBAHIS", colorClass: "text-tertiary" },
  { name: "HOVARDA", colorClass: "text-on-surface" },
  { name: "REXBET", colorClass: "text-primary" },
];

// ---------------------------------------------------------------------------

export type CommissionRow = { tier: string; commission: string };

// A single brand inside a commission group.
// `tierLabel` and `rows` are optional: if omitted, the brand inherits the
// group's `defaultTierLabel` / `defaultRows`. Set them to give a brand its
// own commission table.
export type CommissionBrand = {
  name: string;
  featured?: boolean; // highlights this brand's card
  tierLabel?: string; // overrides the group's defaultTierLabel
  rows?: CommissionRow[]; // overrides the group's defaultRows
};

// A collapsible space (Realm / Throne / Otros) that holds many brands.
export type CommissionGroup = {
  id: string;
  name: string;
  accentClass: string; // Tailwind text color for commission values
  defaultTierLabel: string; // used by brands that don't define their own
  defaultRows: CommissionRow[]; // used by brands that don't define their own
  brands: CommissionBrand[];
};

// ---------------------------------------------------------------------------
// HOW TO EDIT:
// - Rename the placeholder brands ("Realm Brand 01", etc.) to the real ones.
// - To give a brand its own commission table, add `tierLabel` and `rows`
//   to that brand (see "Realm Brand 01" below as an example).
// - To add a brand, append an object to the group's `brands` array.
// ---------------------------------------------------------------------------

export const commissionGroups: CommissionGroup[] = [
  {
    id: "realm",
    name: "Realm",
    accentClass: "text-cyan-glitter",
    defaultTierLabel: "NGR Tiers",
    defaultRows: [
      { tier: "€0 - €10k", commission: "25%" },
      { tier: "€10k - €20k", commission: "30%" },
      { tier: "€20k - €30k", commission: "35%" },
      { tier: "€30k - Inf", commission: "45%" },
    ],
    brands: [
      // Example of a brand with its own table (overrides the group defaults):
      {
        name: "Bets10",
        featured: true,
        tierLabel: "NGR Tiers",
        rows: [
          { tier: "€0 - €10k", commission: "25%" },
          { tier: "€10k - €20k", commission: "30%" },
          { tier: "€20k - €30k", commission: "35%" },
          { tier: "€50k - Inf", commission: "40%" },
        ],
      },
      // These brands inherit the group's defaultRows:
      { name: "Casinometropol" },
      { name: "Casinomaxi" },
      { name: "Mobilbahis" },
      { name: "Spino" },
    ],
  },
  {
    id: "throne",
    name: "Throne",
    accentClass: "text-primary",
    defaultTierLabel: "NGR Tiers",
    defaultRows: [
      { tier: "€0 - €10k", commission: "30%" },
      { tier: "€10k - €20k", commission: "35%" },
      { tier: "€20k - €30k", commission: "45%" },
      { tier: "€50k - Inf", commission: "50%" },
    ],
    brands: [
      { name: "Throne Brand 01" },
      { name: "Throne Brand 02" },
      { name: "Throne Brand 03" },
      { name: "Throne Brand 04" },
      { name: "Throne Brand 05" },
      { name: "Throne Brand 06" },
      { name: "Throne Brand 07" },
      { name: "Throne Brand 08" },
      { name: "Throne Brand 09" },
      { name: "Throne Brand 10" },
      { name: "Throne Brand 11" },
      { name: "Throne Brand 12" },
      { name: "Throne Brand 13" },
      { name: "Throne Brand 14" },
      { name: "Throne Brand 15" },
      { name: "Throne Brand 16" },
      { name: "Throne Brand 17" },
      { name: "Throne Brand 18" },
    ],
  },
  {
    id: "otros",
    name: "Otros",
    accentClass: "text-electric-orange",
    defaultTierLabel: "NGR Tiers",
    defaultRows: [
      { tier: "€0 - €10k", commission: "25%" },
      { tier: "€10k - €20k", commission: "30%" },
      { tier: "€20k - €30k", commission: "40%" },
      { tier: "€30k - Inf", commission: "50%" },
    ],
    brands: [
      { name: "Otros Brand 01" },
      { name: "Otros Brand 02" },
      { name: "Otros Brand 03" },
      { name: "Otros Brand 04" },
      { name: "Otros Brand 05" },
    ],
  },
];

// ---------------------------------------------------------------------------

export type Testimonial = { brand: string; quote: string; href: string };

export const testimonials: Testimonial[] = [
  {
    brand: "RoyalBonuses",
    href: "#",
    quote:
      "We are proud to share a strong partnership with Neat Affiliates. After careful evaluation, we confidently recommend them as an excellent choice for anyone looking to grow.",
  },
  {
    brand: "InsideCasino",
    href: "#",
    quote:
      "The casino team at Neatplay are knowledgeable and know the Canadian gambling market well. Our CA players have enjoyed playing their casino site and we like working with them.",
  },
  {
    brand: "SlotsCalendar",
    href: "#",
    quote:
      "Our collaboration with NeatAffiliates has been nothing short of excellent. Their innovative approach, combined with strong communication and consistent support, makes them stand out as a trusted partner.",
  },
  {
    brand: "SpicyCasinos",
    href: "#",
    quote:
      "Working with NeatAffiliates has been a truly professional experience, offering high-converting brands and an innovative, modern approach. A great choice for any affiliate.",
  },
];

// ---------------------------------------------------------------------------

export type FaqCategory =
  | "General"
  | "Commission"
  | "Payment"
  | "Reporting"
  | "Support";

export const faqCategories: FaqCategory[] = [
  "General",
  "Commission",
  "Payment",
  "Reporting",
  "Support",
];

export type Faq = { category: FaqCategory; question: string; answer: string };

export const faqs: Faq[] = [
  {
    category: "General",
    question: "How much effort does joining involve?",
    answer:
      "Joining is completely free and takes only a few minutes. Once registered, you gain immediate access to our marketing tools and brand materials.",
  },
  {
    category: "General",
    question:
      "Can I engage in a partnership with more than one of your partner sites?",
    answer:
      "Yes! We encourage our affiliates to promote multiple brands within our network to maximize their earning potential across different segments.",
  },
  {
    category: "General",
    question: "Is it possible to join the partner program offline?",
    answer:
      "Our program is primarily digital-focused to ensure real-time tracking and transparency, however, reach out to our support team for specialized business development inquiries.",
  },
  {
    category: "General",
    question: "What is an Affiliate Program?",
    answer:
      "An affiliate program is a performance-based marketing partnership where we reward you for every customer you refer to our brands using your unique links.",
  },
  {
    category: "Commission",
    question: "How is my commission calculated?",
    answer:
      "Commission is calculated on a laddered model. As your referred players generate more Net Gaming Revenue, you automatically move into higher commission tiers.",
  },
  {
    category: "Commission",
    question: "Is there negative carryover?",
    answer:
      "By default there is no negative carryover. Each accounting period starts fresh, so a negative month never reduces your future earnings.",
  },
  {
    category: "Payment",
    question: "Which payment methods are available?",
    answer:
      "We support crypto, bank transfer and e-wallets. You can configure your preferred payout method from your affiliate dashboard.",
  },
  {
    category: "Payment",
    question: "When are payments sent?",
    answer:
      "Payments are processed monthly once a period is closed, provided your balance is above the minimum payout threshold.",
  },
  {
    category: "Reporting",
    question: "What reporting tools do I get?",
    answer:
      "You get real-time dashboards with conversion funnels, player value and click tracking, plus API access for exporting raw data into your own systems.",
  },
  {
    category: "Support",
    question: "How do I contact my affiliate manager?",
    answer:
      "Use the contact form on this page or your dashboard messaging panel. Each brand also has its own dedicated support channel.",
  },
];

// ---------------------------------------------------------------------------

export const supportBrands: string[] = ["Bluffbet", "Vidavegas", "Jackburst"];
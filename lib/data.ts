import { Product } from "./schemas/product";
import { Category } from "./schemas/category";
import { Collection } from "./schemas/collection";
import { Settings } from "./schemas/settings";

export const BRAND = {
  name: "ORÉVA",
  descriptor: "Jewellery House",
  tagline: "Elegance, Made Eternal.",
  headquarters: {
    district: "Mayfair · London",
    city: "London",
    country: "United Kingdom",
  },
  contact: {
    adminEmail: "concierge@oreva.luxury",
    phone: "+44 20 7946 0912",
  },
  seo: {
    adminTitle: "ORÉVA | Atelier Management",
  },
  adminPortalDescription: "ORÉVA Haute Joaillerie Management & Concierge Telemetry",
} as const;

export const DEFAULT_SETTINGS: Settings = {
  brandName: "ORÉVA",
  descriptor: "Jewellery House",
  tagline: "Elegance, Made Eternal.",
  whatsappNumber: "447123456789",
  contactEmail: "concierge@oreva.luxury",
  phone: "+44 20 7946 0912",
  address: "Mayfair Fine Arts District, London, United Kingdom",
  socialLinks: {
    instagram: "https://instagram.com/oreva.jewellery",
    pinterest: "https://pinterest.com/orevajewellery",
    facebook: "https://facebook.com/orevajewellery",
  },
  currencySymbol: "£",
  seoDefaults: {
    title: "ORÉVA Jewellery House | Elegance, Made Eternal",
    description:
      "Contemporary accessible luxury jewellery house. Discover curated necklaces, earrings, bracelets, rings, and handcrafted adornments.",
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    _id: "cat_necklaces",
    name: "Necklaces",
    slug: "necklaces",
    description:
      "Sculpted collar necklaces, delicate solitaire pendants, and layered gold chains.",
    image: "/images/categories/necklaces.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    _id: "cat_earrings",
    name: "Earrings",
    slug: "earrings",
    description:
      "Architectural huggies, cascading drop earrings, and pavé diamond studs.",
    image: "/images/categories/earrings.jpg",
    sortOrder: 2,
    isActive: true,
  },
  {
    _id: "cat_bracelets",
    name: "Bracelets",
    slug: "bracelets",
    description:
      "Hinged cuffs, tennis links, and delicate bezel-set gold chains.",
    image: "/images/categories/bracelets.jpg",
    sortOrder: 3,
    isActive: true,
  },
  {
    _id: "cat_rings",
    name: "Rings",
    slug: "rings",
    description:
      "Statement signets, eternity bands, and faceted gemstone solitaires.",
    image: "/images/categories/rings.jpg",
    sortOrder: 4,
    isActive: true,
  },
  {
    _id: "cat_enamel_bangles",
    name: "Enamel Bangles",
    slug: "enamel-bangles",
    description:
      "Hand-painted cloissoné and glossy royal burgundy enamel accents.",
    image: "/images/categories/enamel-bangles.jpg",
    sortOrder: 5,
    isActive: true,
  },
  {
    _id: "cat_korean_earrings",
    name: "Korean Earrings",
    slug: "korean-earrings",
    description:
      "Delicate asymmetrical drops, baroque pearls, and minimalist geometric ear threads.",
    image: "/images/categories/fine-sets.jpg",
    sortOrder: 6,
    isActive: true,
  },
  {
    _id: "cat_hair_accessories",
    name: "Hair Accessories",
    slug: "hair-accessories",
    description:
      "Gilded hair pins, pearl-adorned barrettes, and ornate tiara combs.",
    image: "/images/categories/hair-accessories.jpg",
    sortOrder: 7,
    isActive: true,
  },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    _id: "col_royal_edit",
    name: "The Royal Burgundy Edit",
    slug: "royal-burgundy-edit",
    description:
      "Deep crimson gems, 18k yellow gold settings, and regal silhouettes celebrating heritage splendour.",
    image: "/images/collections/royal-burgundy-edit.jpg",
    bannerImage: "/images/collections/royal-burgundy-edit-banner.jpg",
    productIds: [],
    isFeatured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    _id: "col_eternal_gold",
    name: "Eternal Gold",
    slug: "eternal-gold",
    description:
      "Solid warm 18k yellow and champagne gold crafted for everyday refinement.",
    image: "/images/collections/eternal-gold.jpg",
    bannerImage: "/images/collections/eternal-gold-banner.jpg",
    productIds: [],
    isFeatured: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    _id: "col_evening_radiance",
    name: "Evening Radiance",
    slug: "evening-radiance",
    description:
      "Pavé diamond clusters designed to shimmer beneath gala candlelight.",
    image: "/images/collections/evening-radiance.jpg",
    bannerImage: "/images/collections/evening-radiance-banner.jpg",
    productIds: [],
    isFeatured: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    _id: "col_heritage_solitaire",
    name: "Heritage Solitaire",
    slug: "heritage-solitaire",
    description:
      "Hand-selected lab and natural diamonds set in signature four-prong cathedral settings.",
    image: "/images/collections/heritage-solitaire.jpg",
    bannerImage: "/images/collections/heritage-solitaire-banner.jpg",
    productIds: [],
    isFeatured: true,
    isActive: true,
    sortOrder: 4,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    _id: "prod_aurora_solitaire_pendant",
    name: "Aurora Solitaire Pendant",
    slug: "aurora-solitaire-pendant",
    sku: "ORV-NC-001",
    description:
      "A luminous 1.8-carat brilliant-cut solitaire suspended from a gossamer 18k yellow gold cable chain. Designed to catch every angle of ambient light with silent poise.",
    price: 680,
    compareAtPrice: 820,
    images: [
      "/images/products/aurora-solitaire-pendant.jpg",
    ],
    categoryId: "cat_necklaces",
    collectionIds: ["col_royal_edit", "col_heritage_solitaire"],
    gender: "women",
    variants: [
      { name: "Metal", options: ["18k Yellow Gold", "18k Rose Gold", "Platinum"] },
      { name: "Chain Length", options: ["16 inches", "18 inches", "20 inches"] },
    ],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    sortOrder: 1,
    seo: {
      title: "Aurora Solitaire Pendant | ORÉVA Jewellery",
      description: "1.8ct brilliant-cut solitaire pendant set in 18k yellow gold.",
    },
  },
  {
    _id: "prod_verona_baroque_pearl_earrings",
    name: "Verona Baroque Pearl Drops",
    slug: "verona-baroque-pearl-drops",
    sku: "ORV-ER-002",
    description:
      "Sculpted organic Keshi freshwater pearls paired with 18k brushed gold hugs. Each natural pearl is chosen for its irregular iridescence and romantic character.",
    price: 490,
    compareAtPrice: null,
    images: [
      "/images/products/verona-baroque-pearl-drops.jpg",
    ],
    categoryId: "cat_earrings",
    collectionIds: ["col_evening_radiance"],
    gender: "women",
    variants: [
      { name: "Pearl Finish", options: ["Lustrous White", "Champagne Gold"] },
    ],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    sortOrder: 2,
    seo: {
      title: "Verona Baroque Pearl Drops | ORÉVA Jewellery",
      description: "Hand-selected baroque pearl earrings with 18k gold accents.",
    },
  },
  {
    _id: "prod_sovereign_gold_cuff",
    name: "Sovereign Ribbed Gold Cuff",
    slug: "sovereign-ribbed-gold-cuff",
    sku: "ORV-BR-003",
    description:
      "A substantial architectural cuff sculpted with fluted gadroon ribs in polished 18k gold vermeil. A statement of unapologetic quiet luxury for day and black-tie evenings.",
    price: 850,
    compareAtPrice: 980,
    images: [
      "/images/products/sovereign-ribbed-gold-cuff.jpg",
    ],
    categoryId: "cat_bracelets",
    collectionIds: ["col_eternal_gold"],
    gender: "unisex",
    variants: [
      { name: "Size", options: ["Small (15cm)", "Medium (17cm)", "Large (19cm)"] },
    ],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    sortOrder: 3,
    seo: {
      title: "Sovereign Ribbed Gold Cuff | ORÉVA",
      description: "Architectural fluted gold cuff handcrafted for timeless wear.",
    },
  },
  {
    _id: "prod_celestial_eternity_band",
    name: "Celestial Pavé Eternity Band",
    slug: "celestial-pave-eternity-band",
    sku: "ORV-RG-004",
    description:
      "An unbroken circle of micro-pavé round brilliant diamonds, meticulously micro-set around an 18k gold band for 360-degree scintillation.",
    price: 1120,
    compareAtPrice: 1300,
    images: [
      "/images/products/celestial-pave-eternity-band.jpg",
    ],
    categoryId: "cat_rings",
    collectionIds: ["col_evening_radiance", "col_heritage_solitaire"],
    gender: "women",
    variants: [
      { name: "Ring Size", options: ["US 5", "US 6", "US 7", "US 8"] },
      { name: "Metal", options: ["18k Yellow Gold", "18k White Gold", "Platinum"] },
    ],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    sortOrder: 4,
    seo: {
      title: "Celestial Pavé Eternity Band | ORÉVA",
      description: "Micro-pavé diamond eternity band set in warm 18k gold.",
    },
  },
  {
    _id: "prod_crimson_dynasty_enamel_bangle",
    name: "Crimson Dynasty Enamel Bangle",
    slug: "crimson-dynasty-enamel-bangle",
    sku: "ORV-EB-005",
    description:
      "Signature royal burgundy vitreous enamel with inlaid antique gold fretwork motifs. Features a secure concealed clasp mechanism with double safety clips.",
    price: 740,
    compareAtPrice: null,
    images: [
      "/images/products/crimson-dynasty-enamel-bangle.jpg",
    ],
    categoryId: "cat_enamel_bangles",
    collectionIds: ["col_royal_edit"],
    gender: "women",
    variants: [
      { name: "Diameter", options: ["58mm (Small)", "63mm (Standard)", "68mm (Large)"] },
    ],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    sortOrder: 5,
    seo: {
      title: "Crimson Dynasty Enamel Bangle | ORÉVA",
      description: "Royal burgundy enamel and gold fretwork handcrafted bangle.",
    },
  },
  {
    _id: "prod_seoul_cascading_threaders",
    name: "Seoul Geometric Threader Earrings",
    slug: "seoul-geometric-threader-earrings",
    sku: "ORV-KE-006",
    description:
      "Ultra-fine box chains threading effortlessly through the ear, culminating in floating emerald-cut baguette cubic zirconia accents.",
    price: 360,
    compareAtPrice: 420,
    images: [
      "/images/products/seoul-geometric-threader-earrings.jpg",
    ],
    categoryId: "cat_korean_earrings",
    collectionIds: ["col_evening_radiance"],
    gender: "women",
    variants: [
      { name: "Gemstone", options: ["Champagne Quartz", "White Diamond Simulant"] },
    ],
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    sortOrder: 6,
    seo: {
      title: "Seoul Geometric Threader Earrings | ORÉVA",
      description: "Contemporary Korean-inspired geometric gold ear threaders.",
    },
  },
  {
    _id: "prod_monarch_pearl_hair_pin",
    name: "Monarch Filigree Hair Pin",
    slug: "monarch-filigree-hair-pin",
    sku: "ORV-HA-007",
    description:
      "An heirloom hair ornament cast in antique-finished brass and dipped in 18k gold, set with seed pearls and a faceted burgundy garnet droplet.",
    price: 290,
    compareAtPrice: null,
    images: [
      "/images/products/monarch-filigree-hair-pin.jpg",
    ],
    categoryId: "cat_hair_accessories",
    collectionIds: ["col_royal_edit"],
    gender: "women",
    variants: [
      { name: "Finish", options: ["Antique Gold", "Vintage Silver"] },
    ],
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    isActive: true,
    sortOrder: 7,
    seo: {
      title: "Monarch Filigree Hair Pin | ORÉVA",
      description: "Heirloom gold and seed pearl filigree hair pin.",
    },
  },
  {
    _id: "prod_heritage_signet_ring",
    name: "Atelier Roman Signet Ring",
    slug: "atelier-roman-signet-ring",
    sku: "ORV-MN-008",
    description:
      "Solid, heavy signet ring with a brushed cushion face and polished chamfered bevels. Clean, understated masculinity rooted in classical Roman proportion.",
    price: 920,
    compareAtPrice: 1050,
    images: [
      "/images/products/atelier-roman-signet-ring.jpg",
    ],
    categoryId: "cat_rings",
    collectionIds: ["col_eternal_gold"],
    gender: "men",
    variants: [
      { name: "Size", options: ["US 9", "US 10", "US 11", "US 12"] },
      { name: "Face Style", options: ["Blank Brushed Face", "Custom Monogram Engraved"] },
    ],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    isActive: true,
    sortOrder: 8,
    seo: {
      title: "Atelier Roman Signet Ring | ORÉVA",
      description: "Heavy 18k gold men's signet ring with brushed cushion top.",
    },
  },
];

export const GIFT_EDIT_ITEMS = [
  {
    title: "For Her",
    subtitle: "Timeless heirlooms and delicate pavé silhouettes.",
    image: "/images/editorial/gift-for-her.jpg",
    link: "/shop?gender=women",
  },
  {
    title: "For Him",
    subtitle: "Substantial signets and fluted architectural cuffs.",
    image: "/images/editorial/gift-anniversary.jpg",
    link: "/shop?gender=men",
  },
  {
    title: "For Sister",
    subtitle: "Modern Korean ear threaders and playful solitaire pendants.",
    image: "/images/editorial/gift-bridesmaid.jpg",
    link: "/shop?category=korean-earrings",
  },
  {
    title: "For Mother",
    subtitle: "Regal baroque pearls and royal burgundy enamel bangles.",
    image: "/images/editorial/gift-keepsakes.jpg",
    link: "/shop?category=enamel-bangles",
  },
] as const;

export const CUSTOMER_BENEFITS = [
  {
    title: "Curated Excellence",
    description: "Every jewel is meticulously examined for proportion, luster, and stone clarity.",
  },
  {
    title: "Dedicated Concierge",
    description: "Direct personal assistance through WhatsApp with our master jewellery specialists.",
  },
  {
    title: "Bespoke Packaging",
    description: "Signature velvet-lined royal burgundy presentation cases with gold foil seal.",
  },
  {
    title: "Worldwide White-Glove",
    description: "Insured express courier delivery directly to your residence.",
  },
] as const;

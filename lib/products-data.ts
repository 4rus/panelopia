// ─────────────────────────────────────────────────────────────────────────────
// PANELOPIA PRODUCTS DATA — all descriptions, specs, and taglines
// verified from panelopia.com product pages (June 2025)
// ─────────────────────────────────────────────────────────────────────────────

export type ProductImage = {
  src: string
  alt: string
}

export type ProductVariant = {
  label: string
  images: ProductImage[]
  description: string
  tagline: string
  colorNote?: string
}

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  id: string
  eyebrow: string
  name: string
  tagline: string
  description: string
  accent: string
  features: string[]
  specs: ProductSpec[]
  variants: ProductVariant[]
}

// ── Image helpers ─────────────────────────────────────────────────────────────

function wImg(base: string, count: number, startAt = 1): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/Wallpaper/${base}${i + startAt}.avif`,
    alt: `${base.replace(/_/g, ' ')} – photo ${i + startAt}`,
  }))
}

function mImg(base: string, count: number): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/Marble-Slab/${base}${i + 1}.avif`,
    alt: `${base.replace(/_/g, ' ')} – photo ${i + 1}`,
  }))
}

function wpImg(base: string, count: number): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/Wall-Panels/${base}${i + 1}.avif`,
    alt: `${base.replace(/_/g, ' ')} – photo ${i + 1}`,
  }))
}

function aImg(base: string, count: number): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/Acoustic-Panels/${base}${i + 1}.avif`,
    alt: `${base.replace(/_/g, ' ')} – photo ${i + 1}`,
  }))
}

function dImg(base: string, count: number): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/Decorative-Panels/${base}${i + 1}.avif`,
    alt: `${base.replace(/_/g, ' ')} – photo ${i + 1}`,
  }))
}

// ── Products ──────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. WPC WALL PANELS
  // Specs confirmed from panelopia.com product pages
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'wpc-panels',
    eyebrow: 'Wall Panels',
    name: 'WPC Wall Panels',
    tagline: 'Engineered slats for premium feature walls.',
    description:
      'Panelopia WPC wall panels combine engineered durability with clean, contemporary texture. Waterproof, termite-resistant, and built to last, these slat panels make a strong statement in residential and commercial interiors across Calgary and Edmonton.',
    accent: '#F5A623',
    features: [
      'Waterproof & moisture-resistant',
      'Termite proof',
      'Clips + screws installation',
      'Panelopia Glue compatible',
      'Accent walls, ceilings & TV backdrops',
      'Residential & commercial ready',
    ],
    specs: [
      { label: 'Material',        value: 'Wood Plastic Composite (WPC)' },
      { label: 'Panel Dimension', value: '114" × 6.5" or 290cm × 16.8cm' },
      { label: 'Packing/Box',     value: '10 Panels/Box' },
      { label: 'Total Area',      value: '48 Square Feet' },
      { label: 'Installation',    value: 'Clips + screws / Panelopia Glue' },
      { label: 'Features',        value: 'Waterproof, Termite Proof' },
    ],
    variants: [
      {
        label: 'Black Brushed',
        tagline: 'Deep black finish with a subtle brushed texture',
        colorNote: 'Black',
        description:
          "Panelopia's Black Brushed WPC Panels deliver a bold, contemporary statement with their deep black finish and subtle brushed texture. Crafted from durable wood-plastic composite, these panels combine modern design with long-lasting performance. Waterproof, termite-resistant, and low-maintenance, they are ideal for feature walls, ceilings, TV backdrops, and commercial interiors. The sleek black tone adds depth and sophistication, making them perfect for creating striking, high-end spaces with a touch of elegance and durability.",
        images: wImg('Black_Brushed', 6),
      },
      {
        label: 'Black',
        tagline: 'Sleek minimalist finish for modern interiors',
        colorNote: 'Black',
        description:
          "Panelopia's Black WPC Panels offer a sleek, minimalist finish that enhances any modern interior or exterior design. Made from high-quality wood-plastic composite, these panels provide the rich look of wood with added durability and strength. Their smooth black surface creates a bold, timeless appeal — perfect for accent walls, ceilings, office spaces, or commercial projects. Waterproof, termite-resistant, and low-maintenance, Black Regular WPC Panels are an ideal choice for those seeking a stylish, long-lasting, and eco-friendly wall solution.",
        images: wImg('Black', 6),
      },
      {
        label: 'Brown',
        tagline: 'Rich brown wood finish with black background',
        colorNote: 'Brown with a black background',
        description:
          "Panelopia's Brown WPC Panels with Black Background bring a striking blend of warmth and contrast to modern interiors. The rich brown wood-like finish is beautifully enhanced by the sleek black backdrop, creating depth and a premium designer look. Made from durable wood-plastic composite, these panels are waterproof, termite-resistant, and low-maintenance, making them perfect for accent walls, ceilings, and feature installations in both residential and commercial spaces. With their bold yet elegant design, these panels add a unique character while ensuring long-lasting performance.",
        images: wImg('Brown', 5),
      },
      {
        label: 'Cedar',
        tagline: 'Rich red cedar finish with natural wood warmth',
        colorNote: 'Natural Wood',
        description:
          "Panelopia's Cedar WPC Panels combine the timeless warmth of natural wood with the durability of modern materials. Made from eco-friendly wood-plastic composite, these panels feature a rich red cedar finish that adds elegance and character to any room. Perfect for accent walls, ceilings, TV units, and commercial interiors, they are waterproof, termite-resistant, and low-maintenance, ensuring long-lasting beauty without the upkeep of natural wood. With their warm tones and wood-like texture, Red Cedar WPC Panels are an excellent choice for creating inviting, stylish, and durable spaces.",
        images: wImg('Cedar', 5, 2),
      },
      {
        label: 'Grey',
        tagline: 'Dark grey brushed texture for contemporary spaces',
        colorNote: 'Dark Grey',
        description:
          "Panelopia's Dark Grey Brushed WPC Panels bring a sleek, modern look to any interior or exterior space. Crafted from durable wood-plastic composite, these panels feature a brushed texture that adds depth and sophistication while maintaining a natural wood-like finish. The dark grey tone offers a versatile, contemporary aesthetic — perfect for accent walls, TV backdrops, ceilings, or commercial projects. Designed to be waterproof, termite-resistant, and low-maintenance, these panels are as practical as they are stylish, making them an ideal choice for long-lasting, eco-friendly wall solutions.",
        images: wImg('Grey', 6),
      },
      {
        label: 'Walnut',
        tagline: 'Timeless natural walnut tone with wood-like texture',
        colorNote: 'Dark Brown',
        description:
          "Panelopia's Walnut WPC Panels combine the timeless beauty of natural walnut with the durability of modern wood-plastic composite. Featuring a rich, warm brown tone with wood-like texture, these panels bring elegance and sophistication to any space. Perfect for accent walls, ceilings, TV backdrops, and commercial interiors, they are designed to be waterproof, termite-resistant, and low-maintenance — ensuring long-lasting performance with minimal upkeep. Ideal for creating cozy, stylish, and contemporary environments, Walnut WPC Panels are a versatile choice for both homes and businesses.",
        images: wImg('Walnut', 6),
      },
      {
        label: 'White Oak',
        tagline: 'Modern minimalist white finish that brightens any space',
        colorNote: 'White',
        description:
          "Panelopia's White Wall Panels offer a modern, minimalist look that enhances any interior. Crafted with premium materials, they are durable, easy to install, and designed to brighten spaces with a clean, elegant finish — perfect for living rooms, offices, or feature walls.",
        images: wImg('White_Oak', 1),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. UV MARBLE IMITATION SHEETS
  // Specs confirmed from panelopia.com product pages
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'uv-marble',
    eyebrow: 'Marble Slabs',
    name: 'UV Marble Imitation Sheets',
    tagline: 'Marble luxury without the weight.',
    description:
      'Panelopia UV marble sheets bring a luxurious natural stone look to interiors without the installation weight or maintenance of real marble. Each sheet is waterproof, termite proof, and fire-resistant — engineered for modern feature walls, countertops, and commercial applications across Calgary and Edmonton.',
    accent: '#3DBFBF',
    features: [
      'UV-protected surface',
      'Waterproof',
      'Termite proof',
      'Fire-resistant',
      'Lightweight vs natural stone',
      'No sealing or maintenance required',
    ],
    specs: [
      { label: 'Material',    value: 'UV-resistant PVC Marble imitation slab' },
      { label: 'Dimension',   value: '108" × 48" or 274.3cm × 122cm' },
      { label: 'Packing',     value: '1 unit protected by a thin plastic film' },
      { label: 'Total Area',  value: '36 Square Feet' },
      { label: 'Installation',value: 'Panelopia Glue' },
      { label: 'Features',    value: 'Waterproof, Termite Proof, Fire-resistant' },
    ],
    variants: [
      {
        label: 'Arctic Gold',
        tagline: 'Elegant marble off-white with gold veining',
        colorNote: 'White and Grey',
        description:
          "Elevate your interiors with the luxurious allure of Arctic Gold. Featuring a smooth, curved marble-like texture, this slab is accentuated with veins of radiant gold that seem to flow naturally across its surface. The sophisticated blend of subtle whites and warm golden accents creates a striking visual depth, making it perfect for statement walls, countertops, and feature surfaces. Crafted with UV-resistant technology, Arctic Gold ensures long-lasting brilliance and durability, retaining its elegance even in high-traffic or sunlit areas. A harmonious fusion of artistry and functionality, it brings timeless luxury to any space.",
        images: mImg('Arctic_Gold', 6),
      },
      {
        label: 'Grey Lava',
        tagline: 'Light to dark Grey Gold marble with oblique gold mist',
        colorNote: 'White and Grey',
        description:
          "Elevate your interiors with the striking elegance of Grey Lava. Featuring a flowing blend of light to dark grey tones, this marble-inspired sheet captures the depth and movement of natural stone. Scattered gold veins weave through the surface, adding a touch of luxury and warmth to its cool, smoky palette. Perfect for creating dramatic feature walls, countertops, or accent surfaces, Grey Lava combines modern sophistication with timeless appeal. Durable, versatile, and effortlessly stylish, it transforms any space into a statement of refined design.",
        images: mImg('Grey_Lava', 6),
      },
      {
        label: 'Midnight Aurora',
        tagline: 'Elegant black marble with gold and white veining',
        colorNote: 'Black, White and Gold',
        description:
          "Make a bold statement with the striking elegance of Midnight Aurora. This black marble-inspired slab is adorned with dramatic white and gold veins that streak across the surface like celestial lights in a midnight sky. The contrast of deep noir with shimmering accents creates a sense of depth and sophistication, perfect for feature walls, countertops, or luxury interiors. Crafted for durability, Midnight Aurora combines timeless beauty with practical resilience, offering a surface that is both visually stunning and built to last. Elevate your space with the mysterious allure and refined luxury of Midnight Aurora.",
        images: mImg('Midnight_Aurora', 6),
      },
      {
        label: 'Midnight Desire',
        tagline: 'Elegant dark grey marble with gold veining',
        colorNote: 'Black, White and Gold',
        description:
          "Make a bold statement with the striking elegance of Midnight Desire. This dark grey marble-inspired slab is adorned with dramatic gold veins that streak across the surface like celestial lights in a midnight sky. The contrast of deep charcoal tones with shimmering golden accents creates a sense of depth and sophistication, perfect for feature walls, countertops, or luxury interiors. Crafted for durability, Midnight Desire combines timeless beauty with practical resilience, offering a surface that is both visually stunning and built to last. Elevate your space with its mysterious allure and refined luxury.",
        images: mImg('Midnight_Desire', 6),
      },
      {
        label: 'Phoenix Dance',
        tagline: 'Elegant blue marble with gold mist',
        colorNote: 'White and Grey',
        description:
          "Awaken your walls with the celestial beauty of Phoenix Dance. Set against a serene light turquoise backdrop, waves of shimmering gold dust sweep across the surface like cosmic trails, evoking the rebirth and brilliance of a rising phoenix. The interplay of colour and texture creates a sense of movement and radiance, transforming any space into a canvas of elegance and wonder. Crafted from high-quality vinyl, Phoenix Dance combines artistic beauty with everyday durability — moisture-resistant, easy to maintain, and timeless in appeal. Perfect for statement walls or luxurious interiors, it captures the magic of cosmic design within your home.",
        images: mImg('Phoenix_Dance', 6),
      },
      {
        label: 'Sand Ripple',
        tagline: 'Dull Grey White marble with oblique sand style pattern',
        colorNote: 'White and Grey',
        description:
          "Bring a sense of natural flow to your interiors with the Sand Ripple marble sheet. Designed in a refined palette of light grey and white, this surface features graceful diagonal stripes reminiscent of wind-swept dunes and rippling sands. The subtle contrast of tones adds depth and movement, while maintaining a soft, elegant look that complements both modern and classic spaces. Ideal for walls, countertops, or accent features, Sand Ripple delivers timeless beauty with a contemporary edge. Durable and versatile, it's the perfect choice for creating serene yet sophisticated interiors.",
        images: mImg('Sand_Ripple', 6),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. DESIGNER WALLPAPERS
  // Specs confirmed from panelopia.com product pages
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'wallpapers',
    eyebrow: 'Wallpapers',
    name: 'Designer Wallpapers',
    tagline: 'Curated wallcoverings for modern spaces.',
    description:
      'Panelopia wallpapers are premium PVC wall coverings that bring texture, colour, and ease of installation to homes and commercial interiors. Durable, moisture-resistant, and easy to apply — each roll covers approximately 50 square feet. Suitable for homes, offices, hotels, and restaurants.',
    accent: '#3DBFBF',
    features: [
      'High-quality PVC',
      'Applied with glue',
      'Moisture-resistant',
      'Home, offices & hotels',
      'Accent wall suitable',
      'Approx. 50 sq ft per roll',
    ],
    specs: [
      { label: 'Material',     value: 'High-Quality PVC' },
      { label: 'Dimensions',   value: '393" × 20.8" / 10m × 0.53m' },
      { label: 'Color',        value: 'As Shown' },
      { label: 'Packing',      value: '1 Roll' },
      { label: 'Total Area',   value: 'Approx. 50 Square Feet per Roll applied' },
      { label: 'Installation', value: 'Applied with Glue — Easy Installation' },
      { label: 'Application',  value: 'Home Interior Walls, Commercial, Offices, Hotels, Restaurants, Accent Walls, etc.' },
    ],
    variants: [
      {
        label: 'Rockies',
        tagline: 'Slate-etched stone pattern inspired by the Rocky Mountains',
        description:
          "Inspired by the raw beauty of the Rocky Mountains, the Slate Etched Rockies wallpaper captures the essence of stone cliffs softened by mist and light. Its subtle etched pattern adds depth and dimension, while the light grey, slate-inspired tones bring a refined natural character to your walls. The design strikes the perfect balance between rugged elegance and contemporary style, making it an ideal choice for both modern and classic interiors. Crafted in durable vinyl, this wallpaper is easy to maintain, moisture-resistant, and built to endure — offering a timeless backdrop that echoes the strength and serenity of the Rockies.",
        images: wpImg('Rockies', 1),
      },
      {
        label: 'Woven Bamboo',
        tagline: 'Elegant walls with a subtle striped pattern',
        description:
          "Panelopia's Woven Bamboo Wallpaper brings the beauty of nature indoors with its organic texture and warm, natural tones. Inspired by handwoven bamboo, this wallpaper adds an earthy elegance that instantly creates a calm, inviting atmosphere. Perfect for accent walls, living rooms, bedrooms, or commercial spaces, it blends rustic charm with modern design versatility. Easy to install, durable, and low-maintenance, Woven Bamboo Wallpaper is an eco-inspired choice for transforming ordinary walls into stylish, serene backdrops.",
        images: wpImg('Woven_Bamboo', 1),
      },
      {
        label: 'Linen Rockies',
        tagline: 'Bold geometric wood-textured pattern',
        description:
          'Linen Rockies features a bold geometric pattern with subtle wood-inspired depth — a striking accent wall choice for modern living spaces and commercial interiors.',
        images: wpImg('Linen_Rockies', 1),
      },
      {
        label: 'Linen Sahara',
        tagline: 'Warm sand linen texture for modern interiors',
        description:
          'Linen Sahara delivers a warm linen-inspired texture that adds understated warmth and tactile interest to any room without overwhelming the space.',
        images: wpImg('Linen_Sahara', 1),
      },
      {
        label: 'Linen Thar',
        tagline: 'Soft linen-inspired texture with subtle movement',
        description:
          'Linen Thar creates a calm, modern backdrop with a soft linen texture and subtle depth — perfect for bedrooms, lounges, and hospitality spaces.',
        images: wpImg('Linen_Thar', 1),
      },
      {
        label: 'Natural Chestnut',
        tagline: 'Organic chestnut wood pattern',
        description:
          'Natural Chestnut brings a rich, earthy wood grain pattern to walls — warm, tactile, and endlessly versatile for residential and boutique commercial projects.',
        images: wpImg('Natural_Chestnut', 1),
      },
      {
        label: 'Natural Leaf',
        tagline: 'Subtle leaf-patterned vinyl wall covering',
        description:
          'Natural Leaf brings a soft organic pattern to interiors with gentle tonal depth — timeless, easy to live with, and beautifully adaptable to any palette.',
        images: wpImg('Natural_Leaf', 1),
      },
      {
        label: 'Pearl Mirage',
        tagline: 'Luminous pearl-toned abstract pattern',
        description:
          'Pearl Mirage delivers a soft iridescent quality with abstract movement — a sophisticated choice for feature walls in hotels, spas, and upscale residences.',
        images: wpImg('Pearl_Mirage', 1),
      },
      {
        label: 'Woven Charcoal',
        tagline: 'Dark textured wallpaper for moody spaces',
        description:
          'Woven Charcoal offers a deep, tactile finish that anchors moody interiors with elegant texture — striking in dining rooms, bars, and contemporary offices.',
        images: wpImg('Woven_Charcoal', 1),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. ACOUSTIC WALL PANELS
  // Specs confirmed from panelopia.com product pages
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'acoustic-panels',
    eyebrow: 'Acoustic Panels',
    name: 'Acoustic Wall Panels',
    tagline: 'Sound control that looks exceptional.',
    description:
      'Panelopia acoustic wall panels are crafted with a real wood veneer over MDF with acoustic soundproofing backing, delivering meaningful noise reduction without sacrificing style. Available in premium oak finishes, they reduce echo and improve room acoustics in living rooms, offices, studios, and commercial spaces.',
    accent: '#8B7355',
    features: [
      'Wood veneer over MDF construction',
      'Acoustic soundproofing backing',
      'Reduces echo & improves acoustics',
      'Waterproof & termite proof',
      'Clips + screws installation',
      'Residential & commercial ready',
    ],
    specs: [
      { label: 'Material',        value: 'Wood Veneer over MDF, Acoustic Soundproofing' },
      { label: 'Panel Dimension', value: '110" × 24" or 280cm × 60cm' },
      { label: 'Packing/Box',     value: '2 Panels/Box' },
      { label: 'Total Area',      value: '19 Square Feet' },
      { label: 'Installation',    value: 'Clips + screws / Panelopia Glue' },
      { label: 'Features',        value: 'Waterproof, Termite Proof' },
    ],
    variants: [
      {
        label: 'Grey Oak',
        tagline: 'Timeless grey oak elegance with high-performance sound absorption',
        colorNote: 'Dark Grey',
        description:
          "Bring sophistication and calm to your interiors with Panelopia's Grey Oak Acoustic Panels. Crafted to combine the timeless elegance of grey oak tones with high-performance sound absorption, these panels are perfect for living rooms, offices, studios, or any space where style meets functionality. Their neutral grey oak finish complements modern and classic décor alike, while reducing echo and improving room acoustics for a serene, comfortable environment.",
        images: aImg('Grey_Oak', 6),
      },
      {
        label: 'White Oak',
        tagline: 'Warm beige oak finish with effective sound absorption',
        colorNote: 'White / Beige Oak',
        description:
          "Elevate your interiors with Panelopia's White Oak Acoustic Panels. Featuring a warm beige oak finish, these panels blend natural elegance with effective sound absorption, making them ideal for living rooms, offices, studios, or any space where comfort meets style. Their soft, neutral tone complements a variety of décor styles while reducing echo and enhancing room acoustics for a calm, inviting atmosphere.",
        images: aImg('White_Oak', 6),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. DECORATIVE WALL PANELS (PS Panels)
  // Specs confirmed from panelopia.com product pages
  // Note: each variant has a different panel dimension — see individual descriptions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'decorative-panels',
    eyebrow: 'Decorative Panels',
    name: 'Decorative Wall Panels',
    tagline: 'Bold profiles that add glamour to any wall.',
    description:
      'Panelopia decorative PS panels combine sleek base tones with elegant golden accent strips for a look of modern luxury. Each panel is crafted from durable wood-plastic composite — waterproof, termite proof, and easy to install with clips and screws or Panelopia Glue. Perfect for feature walls, TV backdrops, and commercial interiors.',
    accent: '#C4A35A',
    features: [
      'Wood Plastic Composite (WPC)',
      'Elegant golden accent strips',
      'Waterproof & termite proof',
      'Clips + screws installation',
      'Feature walls & TV backdrops',
      'Residential & commercial ready',
    ],
    specs: [
      { label: 'Material',        value: 'Wood Plastic Composite (WPC)' },
      { label: 'Panel Dimension', value: 'Varies by style (see descriptions)' },
      { label: 'Packing/Box',     value: '12 Panels/Box' },
      { label: 'Total Area',      value: '57 sq ft (Brown Gold & Slate Gold)' },
      { label: 'Installation',    value: 'Clips + screws / Panelopia Glue' },
      { label: 'Features',        value: 'Waterproof, Termite Proof' },
    ],
    variants: [
      {
        label: 'Brown Gold',
        tagline: 'Sleek wood-brown base with elegant golden accents',
        colorNote: 'Grey Gold',
        description:
          "Panelopia's Brown Gold PS Panel exudes modern luxury with its sleek wood brown base enhanced by elegant golden accents. Perfect for feature walls, TV backdrops, and commercial interiors, it adds depth, sophistication, and a touch of glamour to any space. Panel Dimension: 114\" × 6.3\" or 290cm × 16cm | 12 Panels/Box | 57 Square Feet per Box.",
        images: dImg('Brown_Gold', 6),
      },
      {
        label: 'Slate Gold',
        tagline: 'Sleek grey base with elegant golden accent strips',
        colorNote: 'Grey Gold',
        description:
          "Panelopia's Slate Gold PS Panel exudes modern luxury with its sleek grey base enhanced by elegant golden accents. Perfect for feature walls, TV backdrops, and commercial interiors, it adds depth, sophistication, and a touch of glamour to any space. Panel Dimension: 114\" × 5.9\" or 290cm × 15cm | 12 Panels/Box | 57 Square Feet per Box.",
        images: dImg('Slate_Gold', 6),
      },
      {
        label: 'Brown Plume',
        tagline: 'Ornate wood-brown panel with gold-trimmed plume motif',
        colorNote: 'Wood Brown & Gold',
        description:
          "Panelopia's Brown Plume Panel is designed to complement any wall panel collection seamlessly. With its balanced design and neutral finish, it enhances surrounding textures and colours while adding its own subtle charm. Perfect as a connector piece or standalone feature, this panel brings harmony to interiors, making it an ideal choice for tying together diverse styles in both residential and commercial spaces. Durable, easy to install, and timelessly stylish — it's the perfect match for every design. Panel Dimension: 114\" × 12.2\" or 292cm × 31cm | 12 Panels/Box.",
        images: dImg('Brown_Plume', 6),
      },
    ],
  },
]
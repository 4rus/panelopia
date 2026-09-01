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
  swatchImage?: ProductImage
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

// Explicit single-image reference (used for swatchImage overrides)
function swatch(folder: string, file: string, label: string): ProductImage {
  return { src: `/${folder}/${file}.avif`, alt: `${label} – swatch` }
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
        swatchImage: swatch('Wallpaper', 'Black_Brushed_Swatch', 'Black Brushed'),
      },
      {
        label: 'Black',
        tagline: 'Sleek minimalist finish for modern interiors',
        colorNote: 'Black',
        description:
          "Panelopia's Black WPC Panels offer a sleek, minimalist finish that enhances any modern interior or exterior design. Made from high-quality wood-plastic composite, these panels provide the rich look of wood with added durability and strength. Their smooth black surface creates a bold, timeless appeal — perfect for accent walls, ceilings, office spaces, or commercial projects. Waterproof, termite-resistant, and low-maintenance, Black Regular WPC Panels are an ideal choice for those seeking a stylish, long-lasting, and eco-friendly wall solution.",
        images: wImg('Black', 6),
        swatchImage: swatch('Wallpaper', 'Black_Swatch', 'Black'),
      },
      {
        label: 'Brown',
        tagline: 'Rich brown wood finish with black background',
        colorNote: 'Brown with a black background',
        description:
          "Panelopia's Brown WPC Panels with Black Background bring a striking blend of warmth and contrast to modern interiors. The rich brown wood-like finish is beautifully enhanced by the sleek black backdrop, creating depth and a premium designer look. Made from durable wood-plastic composite, these panels are waterproof, termite-resistant, and low-maintenance, making them perfect for accent walls, ceilings, and feature installations in both residential and commercial spaces. With their bold yet elegant design, these panels add a unique character while ensuring long-lasting performance.",
        images: wImg('Brown', 5),
        swatchImage: swatch('Wallpaper', 'Brown_Swatch', 'Brown'),
      },
      {
        label: 'Cedar',
        tagline: 'Rich red cedar finish with natural wood warmth',
        colorNote: 'Natural Wood',
        description:
          "Panelopia's Cedar WPC Panels combine the timeless warmth of natural wood with the durability of modern materials. Made from eco-friendly wood-plastic composite, these panels feature a rich red cedar finish that adds elegance and character to any room. Perfect for accent walls, ceilings, TV units, and commercial interiors, they are waterproof, termite-resistant, and low-maintenance, ensuring long-lasting beauty without the upkeep of natural wood. With their warm tones and wood-like texture, Red Cedar WPC Panels are an excellent choice for creating inviting, stylish, and durable spaces.",
        images: wImg('Cedar', 5, 2),
        swatchImage: swatch('Wallpaper', 'Cedar_Swatch', 'Cedar'),
      },
      {
        label: 'Grey',
        tagline: 'Dark grey brushed texture for contemporary spaces',
        colorNote: 'Dark Grey',
        description:
          "Panelopia's Dark Grey Brushed WPC Panels bring a sleek, modern look to any interior or exterior space. Crafted from durable wood-plastic composite, these panels feature a brushed texture that adds depth and sophistication while maintaining a natural wood-like finish. The dark grey tone offers a versatile, contemporary aesthetic — perfect for accent walls, TV backdrops, ceilings, or commercial projects. Designed to be waterproof, termite-resistant, and low-maintenance, these panels are as practical as they are stylish, making them an ideal choice for long-lasting, eco-friendly wall solutions.",
        images: wImg('Grey', 6),
        swatchImage: swatch('Wallpaper', 'Grey_Swatch', 'Grey'),
      },
      {
        label: 'Walnut',
        tagline: 'Timeless natural walnut tone with wood-like texture',
        colorNote: 'Dark Brown',
        description:
          "Panelopia's Walnut WPC Panels combine the timeless beauty of natural walnut with the durability of modern wood-plastic composite. Featuring a rich, warm brown tone with wood-like texture, these panels bring elegance and sophistication to any space. Perfect for accent walls, ceilings, TV backdrops, and commercial interiors, they are designed to be waterproof, termite-resistant, and low-maintenance — ensuring long-lasting performance with minimal upkeep. Ideal for creating cozy, stylish, and contemporary environments, Walnut WPC Panels are a versatile choice for both homes and businesses.",
        images: wImg('Walnut', 6),
        swatchImage: swatch('Wallpaper', 'Walnut_Swatch', 'Walnut'),
      },
      {
        label: 'White Oak',
        tagline: 'Modern minimalist white finish that brightens any space',
        colorNote: 'White',
        description:
          "Panelopia's White Wall Panels offer a modern, minimalist look that enhances any interior. Crafted with premium materials, they are durable, easy to install, and designed to brighten spaces with a clean, elegant finish — perfect for living rooms, offices, or feature walls.",
        images: wImg('White_Oak', 1),
        swatchImage: swatch('Wallpaper', 'White_Oak_Swatch', 'White Oak'),
      },
      {
        label: 'Espresso Brown',
        tagline: 'Deep espresso brown with rich wood-grain depth',
        colorNote: 'Espresso Brown',
        description:
          "Panelopia's Espresso Brown WPC Panels bring a deep, coffee-toned richness to interiors, with a pronounced wood-grain texture that reads as genuine hardwood. Crafted from durable wood-plastic composite, these panels are waterproof, termite-resistant, and low-maintenance, making them a natural fit for accent walls, ceilings, and TV backdrops in both residential and commercial spaces. The dark espresso tone pairs beautifully with warm metal accents and natural light, giving rooms an instantly grounded, upscale feel.",
        images: wImg('Espresso_Brown', 7),
        swatchImage: swatch('Wallpaper', 'Espresso_Brown_Swatch', 'Espresso Brown'),
      },
      {
        label: 'Grey Oak',
        tagline: 'Soft grey oak finish with authentic wood-grain texture',
        colorNote: 'Grey Oak',
        description:
          "Panelopia's Grey Oak WPC Panels combine a soft, weathered grey tone with a naturalistic wood-grain texture for a calm, contemporary look. Made from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them ideal for accent walls, ceilings, and TV backdrops in residential and commercial spaces alike. The muted grey tone works equally well in warm and cool colour schemes, giving designers flexibility across a wide range of interiors. A matching L-trim is available for clean, finished edges.",
        images: wImg('Grey_Oak', 6),
        swatchImage: swatch('Wallpaper', 'Grey_Oak_Swatch', 'Grey Oak'),
      },
      {
        label: 'Jet Black',
        tagline: 'Deep matte black finish with a fine wood-grain texture',
        colorNote: 'Jet Black',
        description:
          "Panelopia's Jet Black WPC Panels deliver an uncompromising, deep black finish with a fine wood-grain texture that adds subtle dimension without sacrificing the panel's bold, modern character. Crafted from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance — ideal for accent walls, ceilings, TV backdrops, and statement installations across residential and commercial interiors. The rich matte black tone anchors a space and pairs seamlessly with brass, gold, or warm wood accents. A matching L-trim is available for clean, finished edges.",
        images: wImg('Jet_Black', 8),
        swatchImage: swatch('Wallpaper', 'Jet_Black_Swatch', 'Jet Black'),
      },
      {
        label: 'Ivory White',
        tagline: 'Soft ivory finish with subtle wood-grain texture',
        colorNote: 'Ivory White',
        description:
          "Panelopia's Ivory White WPC Panels bring a warm, soft-white finish with a gentle wood-grain texture that keeps the look natural rather than flat. Made from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them a versatile choice for accent walls, ceilings, and feature installations in bright, airy interiors. The ivory tone brightens a room while still reading as a considered, textured material rather than plain paint or drywall. A matching L-trim is available for clean, finished edges.",
        images: wImg('Ivory_White', 6),
        swatchImage: swatch('Wallpaper', 'Ivory_White_Swatch', 'Ivory White'),
      },
      {
        label: 'Acacia',
        tagline: 'Warm honey-toned acacia wood finish',
        colorNote: 'Warm Honey Brown',
        description:
          "Panelopia's Acacia WPC Panels capture the warm, honeyed tones and natural grain variation of acacia hardwood, bringing an inviting, organic character to any room. Crafted from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them a practical alternative to real wood for accent walls, ceilings, and TV backdrops in both homes and commercial spaces. The warm mid-tone finish suits Scandinavian, mid-century, and transitional interiors alike. A matching L-trim is available for clean, finished edges.",
        images: wImg('Acacia', 6),
        swatchImage: swatch('Wallpaper', 'Acacia_Swatch', 'Acacia'),
      },
      {
        label: 'Marble White',
        tagline: 'Cool white finish with soft marbled grain movement',
        colorNote: 'White / Grey',
        description:
          "Panelopia's Marble White WPC Panels combine a crisp white base with soft, marbled grain movement, giving the panel a refined, almost stone-like quality. Made from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them ideal for accent walls, ceilings, and TV backdrops in bright, contemporary interiors. The subtle veining adds visual interest without overwhelming a space, making it easy to pair with both minimalist and luxury design schemes. A matching L-trim is available for clean, finished edges.",
        images: wImg('Marble_White', 7),
        swatchImage: swatch('Wallpaper', 'Marble_White_Swatch', 'Marble White'),
      },
      {
        label: 'Onyx Gold',
        tagline: 'Radiant black finish with metallic gold shimmer',
        colorNote: 'Black and Gold',
        description:
          "Panelopia's Onyx Gold WPC Panels pair a deep black base with a radiant, metallic gold shimmer that catches the light as you move through the room. Crafted from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them a striking choice for feature walls, TV backdrops, and commercial interiors looking to make a statement. The high-contrast finish brings a sense of drama and glamour to lobbies, lounges, and luxury residential spaces. A matching L-trim is available for clean, finished edges.",
        images: wImg('Onyx_Gold', 6),
        swatchImage: swatch('Wallpaper', 'Onyx_Gold_Swatch', 'Onyx Gold'),
      },
      {
        label: 'Brushed Silver',
        tagline: 'Cool metallic silver with a fine brushed texture',
        colorNote: 'Metallic Silver',
        description:
          "Panelopia's Brushed Silver WPC Panels feature a cool, metallic silver finish with a fine brushed texture that adds industrial-modern polish to any wall. Made from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them well suited to accent walls, ceilings, and commercial interiors that call for a sleek, contemporary edge. The reflective brushed surface pairs naturally with glass, chrome, and cool-toned furnishings. A matching L-trim is available for clean, finished edges.",
        images: wImg('Brushed_Silver', 7),
        swatchImage: swatch('Wallpaper', 'Brushed_Silver_Swatch', 'Brushed Silver'),
      },
      {
        label: 'Brushed Gold',
        tagline: 'Warm metallic gold with a fine brushed texture',
        colorNote: 'Metallic Gold',
        description:
          "Panelopia's Brushed Gold WPC Panels bring a warm, metallic gold finish with a fine brushed texture that adds a luxe, tactile quality to feature walls. Crafted from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them ideal for TV backdrops, hospitality interiors, and commercial spaces looking for an elevated finish. The warm metallic tone pairs beautifully with black, walnut, and deep jewel-toned accents. A matching L-trim is available for clean, finished edges.",
        images: wImg('Brushed_Gold', 6),
        swatchImage: swatch('Wallpaper', 'Brushed_Gold_Swatch', 'Brushed Gold'),
      },
      {
        label: 'Brushed Grey',
        tagline: 'Muted metallic grey with a fine brushed texture',
        colorNote: 'Metallic Grey',
        description:
          "Panelopia's Brushed Grey WPC Panels combine a muted metallic grey tone with a fine brushed texture, offering a quieter alternative to the brand's silver and gold metallics. Made from durable wood-plastic composite, they are waterproof, termite-resistant, and low-maintenance, making them a versatile choice for accent walls, ceilings, and commercial interiors seeking understated texture. The soft metallic sheen reads as sophisticated rather than flashy, and complements both warm and cool colour palettes. A matching L-trim is available for clean, finished edges.",
        images: wImg('Brushed_Grey', 6),
        swatchImage: swatch('Wallpaper', 'Brushed_Grey_Swatch', 'Brushed Grey'),
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
        swatchImage: swatch('Marble-Slab', 'Arctic_Gold2', 'Arctic Gold'),
      },
      {
        label: 'Grey Lava',
        tagline: 'Light to dark Grey Gold marble with oblique gold mist',
        colorNote: 'White and Grey',
        description:
          "Elevate your interiors with the striking elegance of Grey Lava. Featuring a flowing blend of light to dark grey tones, this marble-inspired sheet captures the depth and movement of natural stone. Scattered gold veins weave through the surface, adding a touch of luxury and warmth to its cool, smoky palette. Perfect for creating dramatic feature walls, countertops, or accent surfaces, Grey Lava combines modern sophistication with timeless appeal. Durable, versatile, and effortlessly stylish, it transforms any space into a statement of refined design.",
        images: mImg('Grey_Lava', 6),
        swatchImage: swatch('Marble-Slab', 'Grey_Lava2', 'Grey Lava'),
      },
      {
        label: 'Midnight Aurora',
        tagline: 'Elegant black marble with gold and white veining',
        colorNote: 'Black, White and Gold',
        description:
          "Make a bold statement with the striking elegance of Midnight Aurora. This black marble-inspired slab is adorned with dramatic white and gold veins that streak across the surface like celestial lights in a midnight sky. The contrast of deep noir with shimmering accents creates a sense of depth and sophistication, perfect for feature walls, countertops, or luxury interiors. Crafted for durability, Midnight Aurora combines timeless beauty with practical resilience, offering a surface that is both visually stunning and built to last. Elevate your space with the mysterious allure and refined luxury of Midnight Aurora.",
        images: mImg('Midnight_Aurora', 6),
        swatchImage: swatch('Marble-Slab', 'Midnight_Aurora2', 'Midnight Aurora'),
      },
      {
        label: 'Midnight Desire',
        tagline: 'Elegant dark grey marble with gold veining',
        colorNote: 'Black, White and Gold',
        description:
          "Make a bold statement with the striking elegance of Midnight Desire. This dark grey marble-inspired slab is adorned with dramatic gold veins that streak across the surface like celestial lights in a midnight sky. The contrast of deep charcoal tones with shimmering golden accents creates a sense of depth and sophistication, perfect for feature walls, countertops, or luxury interiors. Crafted for durability, Midnight Desire combines timeless beauty with practical resilience, offering a surface that is both visually stunning and built to last. Elevate your space with its mysterious allure and refined luxury.",
        images: mImg('Midnight_Desire', 6),
        swatchImage: swatch('Marble-Slab', 'Midnight_Desire2', 'Midnight Desire'),
      },
      {
        label: 'Phoenix Dance',
        tagline: 'Elegant blue marble with gold mist',
        colorNote: 'White and Grey',
        description:
          "Awaken your walls with the celestial beauty of Phoenix Dance. Set against a serene light turquoise backdrop, waves of shimmering gold dust sweep across the surface like cosmic trails, evoking the rebirth and brilliance of a rising phoenix. The interplay of colour and texture creates a sense of movement and radiance, transforming any space into a canvas of elegance and wonder. Crafted from high-quality vinyl, Phoenix Dance combines artistic beauty with everyday durability — moisture-resistant, easy to maintain, and timeless in appeal. Perfect for statement walls or luxurious interiors, it captures the magic of cosmic design within your home.",
        images: mImg('Phoenix_Dance', 6),
        swatchImage: swatch('Marble-Slab', 'Phoenix_Dance2', 'Phoenix Dance'),
      },
      {
        label: 'Sand Ripple',
        tagline: 'Dull Grey White marble with oblique sand style pattern',
        colorNote: 'White and Grey',
        description:
          "Bring a sense of natural flow to your interiors with the Sand Ripple marble sheet. Designed in a refined palette of light grey and white, this surface features graceful diagonal stripes reminiscent of wind-swept dunes and rippling sands. The subtle contrast of tones adds depth and movement, while maintaining a soft, elegant look that complements both modern and classic spaces. Ideal for walls, countertops, or accent features, Sand Ripple delivers timeless beauty with a contemporary edge. Durable and versatile, it's the perfect choice for creating serene yet sophisticated interiors.",
        images: mImg('Sand_Ripple', 6),
        swatchImage: swatch('Marble-Slab', 'Sand_Ripple2', 'Sand Ripple'),
      },
      {
        label: 'Calacatta Gold',
        tagline: 'Classic bright white marble with fine gold veining',
        colorNote: 'White and Grey',
        description:
          "Bring timeless elegance to your interiors with Calacatta Gold. Set against a bright white and soft grey backdrop, fine veins of gold trace across the surface in the unmistakable style of classic Calacatta marble. The crisp, luminous base keeps the look clean and sophisticated, while the gold detailing adds a quiet richness that suits feature walls, countertops, and statement surfaces alike. Crafted with UV-resistant technology, Calacatta Gold holds its brightness and detail even in high-traffic or sunlit spaces, making it a dependable choice for lasting luxury.",
        images: mImg('Calacatta_Gold', 6),
        swatchImage: swatch('Marble-Slab', 'Calacatta_Gold_Swatch', 'Calacatta Gold'),
      },
      {
        label: 'Ivory Gold',
        tagline: 'Warm ivory-grey marble with dense gold cracking',
        colorNote: 'Ivory and Grey',
        description:
          "Ivory Gold brings a warmer take on classic marble, pairing a soft ivory-grey base with a denser network of gold cracking that catches the eye from every angle. The richer veining gives this slab more presence than a typical white marble, making it a natural fit for feature walls, countertops, and other surfaces meant to draw attention. UV-resistant and built for durability, Ivory Gold keeps its warmth and detail intact over time, bringing a dependable touch of luxury to both residential and commercial interiors.",
        images: mImg('Ivory_Gold', 6),
        swatchImage: swatch('Marble-Slab', 'Ivory_Gold_Swatch', 'Ivory Gold'),
      },
      {
        label: 'Emerald Ember',
        tagline: 'Deep emerald and teal marble with copper-gold veining',
        colorNote: 'Emerald, Teal and Copper Gold',
        description:
          "Make an unmistakable statement with Emerald Ember — a deep teal and emerald slab threaded with warm copper-gold veining that flows across the surface like molten light through stone. Unlike anything else in the collection, this bold, jewel-toned finish turns a single wall into the focal point of a room. Perfect for feature walls, countertops, or luxury interiors looking to stand out, Emerald Ember is crafted with UV-resistant technology for lasting colour and brilliance, bringing dramatic, one-of-a-kind character to any space.",
        images: mImg('Emerald_Ember', 7),
        swatchImage: swatch('Marble-Slab', 'Emerald_Ember_Swatch', 'Emerald Ember'),
      },
      {
        label: 'Storm Gold',
        tagline: 'White and grey marble with charcoal storm-cloud patches and gold veins',
        colorNote: 'White, Grey and Gold',
        description:
          "Storm Gold captures the drama of shifting weather in stone — a white and grey marble base gathers deep charcoal, storm-cloud patches that roll across the surface, laced through with striking gold veins. The result is a slab with real depth and movement, striking enough for a feature wall yet versatile enough for countertops and other statement surfaces. Crafted with UV-resistant technology, Storm Gold holds its contrast and shine over time, bringing bold, atmospheric character to modern interiors.",
        images: mImg('Storm_Gold', 7),
        swatchImage: swatch('Marble-Slab', 'Storm_Gold_Swatch', 'Storm Gold'),
      },
      {
        label: 'Desert Taupe',
        tagline: 'Muted grey-taupe-brown natural stone texture',
        colorNote: 'Grey, Taupe and Brown',
        description:
          "Desert Taupe offers a quieter, earthier alternative to the collection's gold-veined marbles, with a muted blend of grey, taupe, and brown that reads as natural stone rather than polished luxury. The soft, organic texture brings warmth and calm to a room without competing for attention, making it well suited to feature walls, countertops, and spaces that call for understated sophistication. Crafted with UV-resistant technology, Desert Taupe keeps its natural, grounded tone looking fresh in both residential and commercial interiors.",
        images: mImg('Desert_Taupe', 7),
        swatchImage: swatch('Marble-Slab', 'Desert_Taupe_Swatch', 'Desert Taupe'),
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
        swatchImage: swatch('Acoustic-Panels', 'Grey_Oak2', 'Grey Oak'),
      },
      {
        label: 'White Oak',
        tagline: 'Warm beige oak finish with effective sound absorption',
        colorNote: 'White / Beige Oak',
        description:
          "Elevate your interiors with Panelopia's White Oak Acoustic Panels. Featuring a warm beige oak finish, these panels blend natural elegance with effective sound absorption, making them ideal for living rooms, offices, studios, or any space where comfort meets style. Their soft, neutral tone complements a variety of décor styles while reducing echo and enhancing room acoustics for a calm, inviting atmosphere.",
        images: aImg('White_Oak', 6),
        swatchImage: swatch('Acoustic-Panels', 'White_Oak2', 'White Oak'),
      },
      {
        label: 'Stained Grey',
        tagline: 'Weathered grey wood stain with rich acoustic performance',
        colorNote: 'Stained Grey',
        description:
          "Panelopia's Stained Grey Acoustic Panels bring a weathered, wood-stained grey finish together with reliable sound absorption for spaces that need both character and calm. Ideal for living rooms, offices, studios, or any room where echo and background noise need to be tamed, these panels reduce reverberation while adding a textured, tonal feature wall. Their versatile grey stain complements both industrial and contemporary interiors.",
        images: aImg('Stained_Grey', 5),
        swatchImage: swatch('Acoustic-Panels', 'Stained_Grey_Swatch', 'Stained Grey'),
      },
      {
        label: 'Blonde Oak',
        tagline: 'Light blonde oak tone with natural grain and sound absorption',
        colorNote: 'Blonde / Light Oak',
        description:
          "Panelopia's Blonde Oak Acoustic Panels bring a light, sun-bleached oak finish to spaces that call for warmth without heaviness. Combining a natural wood-grain surface with effective sound absorption, they're a strong fit for living rooms, offices, and studios where reducing echo matters as much as the look. The pale, blonde tone brightens a room while softening its acoustics, complementing Scandinavian and minimalist interiors especially well.",
        images: aImg('Blonde_Oak', 5),
        swatchImage: swatch('Acoustic-Panels', 'Blonde_Oak_Swatch', 'Blonde Oak'),
      },
      {
        label: 'Brown',
        tagline: 'Warm brown wood tone with effective sound absorption',
        colorNote: 'Warm Brown',
        description:
          "Panelopia's Brown Acoustic Panels bring a warm, classic wood tone to interiors while quietly working to reduce echo and improve room acoustics. Well suited to living rooms, offices, and studios, they blend traditional wood-panel warmth with the practical benefit of sound absorption. The versatile mid-brown finish sits comfortably alongside both traditional and contemporary furnishings, making it an easy addition to almost any room.",
        images: aImg('Brown', 5),
        swatchImage: swatch('Acoustic-Panels', 'Brown_Swatch', 'Brown'),
      },
      {
        label: 'Grey',
        tagline: 'Cool contemporary grey with high-performance sound absorption',
        colorNote: 'Cool Grey',
        description:
          "Panelopia's Grey Acoustic Panels pair a cool, contemporary grey finish with high-performance sound absorption, making them a natural choice for offices, studios, and living rooms that need both a calming aesthetic and quieter acoustics. The neutral grey tone works as a backdrop for bolder furnishings or as a quiet, sophisticated feature wall on its own, while reducing echo for a more comfortable room.",
        images: aImg('Grey', 6),
        swatchImage: swatch('Acoustic-Panels', 'Grey_Swatch', 'Grey'),
      },
      {
        label: 'Charcoal Black',
        tagline: 'Deep charcoal black finish with dramatic sound-dampening presence',
        colorNote: 'Charcoal Black',
        description:
          "Panelopia's Charcoal Black Acoustic Panels bring a deep, dramatic charcoal finish to feature walls that need to make a statement while still improving room acoustics. Suited to living rooms, offices, studios, and commercial interiors, they combine bold, moody styling with meaningful sound absorption, cutting down on echo without sacrificing visual impact. The near-black tone pairs strikingly with brass, warm wood, and soft lighting.",
        images: aImg('Charcoal_Black', 5),
        swatchImage: swatch('Acoustic-Panels', 'Charcoal_Black_Swatch', 'Charcoal Black'),
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
        swatchImage: swatch('Decorative-Panels', 'Brown_Gold_Swatch', 'Brown Gold'),
      },
      {
        label: 'Slate Gold',
        tagline: 'Sleek grey base with elegant golden accent strips',
        colorNote: 'Grey Gold',
        description:
          "Panelopia's Slate Gold PS Panel exudes modern luxury with its sleek grey base enhanced by elegant golden accents. Perfect for feature walls, TV backdrops, and commercial interiors, it adds depth, sophistication, and a touch of glamour to any space. Panel Dimension: 114\" × 5.9\" or 290cm × 15cm | 12 Panels/Box | 57 Square Feet per Box.",
        images: dImg('Slate_Gold', 6),
        swatchImage: swatch('Decorative-Panels', 'Slate_Gold_Swatch', 'Slate Gold'),
      },
      {
        label: 'Brown Plume',
        tagline: 'Ornate wood-brown panel with gold-trimmed plume motif',
        colorNote: 'Wood Brown & Gold',
        description:
          "Panelopia's Brown Plume Panel is designed to complement any wall panel collection seamlessly. With its balanced design and neutral finish, it enhances surrounding textures and colours while adding its own subtle charm. Perfect as a connector piece or standalone feature, this panel brings harmony to interiors, making it an ideal choice for tying together diverse styles in both residential and commercial spaces. Durable, easy to install, and timelessly stylish — it's the perfect match for every design. Panel Dimension: 114\" × 12.2\" or 292cm × 31cm | 12 Panels/Box.",
        images: dImg('Brown_Plume', 6),
        swatchImage: swatch('Decorative-Panels', 'Brown_Plume_Swatch', 'Brown Plume'),
      },
      {
        label: 'Walnut Brown',
        tagline: 'Rich dark walnut base with subtle wood-grain depth',
        colorNote: 'Dark Brown',
        description:
          "Panelopia's Walnut Brown PS Panel brings a rich, dark walnut tone with subtle wood-grain depth to feature walls and TV backdrops. Crafted from durable wood-plastic composite, it's waterproof, termite-resistant, and easy to install with clips and screws or Panelopia Glue. The deep brown finish adds warmth and grounding presence to residential and commercial interiors alike, pairing naturally with brass, black, and warm ambient lighting.",
        images: dImg('Walnut_Brown', 6),
        swatchImage: swatch('Decorative-Panels', 'Walnut_Brown_Swatch', 'Walnut Brown'),
      },
      {
        label: 'Ash Grey',
        tagline: 'Clean ash grey base for understated modern walls',
        colorNote: 'Grey',
        description:
          "Panelopia's Ash Grey PS Panel offers a clean, understated grey base for feature walls and TV backdrops that call for quiet sophistication rather than bold contrast. Made from durable wood-plastic composite, it's waterproof, termite-resistant, and easy to install with clips and screws or Panelopia Glue. The neutral ash tone works equally well as a standalone accent or a backdrop for brighter furnishings, in both residential and commercial spaces.",
        images: dImg('Ash_Grey', 6),
        swatchImage: swatch('Decorative-Panels', 'Ash_Grey_Swatch', 'Ash Grey'),
      },
      {
        label: 'Pearl Gold',
        tagline: 'Light pearl-grey base with elegant golden accent strips',
        colorNote: 'Light Grey and Gold',
        description:
          "Panelopia's Pearl Gold PS Panel pairs a soft, light grey base with elegant golden accent strips for a refined, luminous take on modern luxury. Perfect for feature walls, TV backdrops, and commercial interiors, it adds a touch of glamour without the heaviness of a darker palette. Crafted from durable wood-plastic composite, it's waterproof, termite-resistant, and easy to install with clips and screws or Panelopia Glue.",
        images: dImg('Pearl_Gold', 6),
        swatchImage: swatch('Decorative-Panels', 'Pearl_Gold_Swatch', 'Pearl Gold'),
      },
      {
        label: 'Charcoal Gold',
        tagline: 'Deep charcoal-grey base with elegant golden accent strips',
        colorNote: 'Dark Grey and Gold',
        description:
          "Panelopia's Charcoal Gold PS Panel combines a deep charcoal-grey base with elegant golden accent strips for a dramatic, modern-luxury finish. Ideal for feature walls, TV backdrops, and commercial interiors, it adds depth, sophistication, and glamour to any space. Crafted from durable wood-plastic composite, it's waterproof, termite-resistant, and easy to install with clips and screws or Panelopia Glue.",
        images: dImg('Charcoal_Gold', 6),
        swatchImage: swatch('Decorative-Panels', 'Charcoal_Gold_Swatch', 'Charcoal Gold'),
      },
    ],
  },
]
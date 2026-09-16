"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import styles from "./page.module.css";
import { insertLead } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────
interface Point { x: number; y: number; }
type CornerKey = "tl" | "tr" | "br" | "bl";
type Corners = Record<CornerKey, Point>;
type Stage = "space" | "loading" | "material" | "fit";
type Mode = "adjust" | "erase";

interface RoomOption {
  label: string;
  hint: string;
  src: string;
  wallCorners: Corners;
}

interface TextureOption { label: string; src: string; category: string; }
interface TextureGroup  { group: string; items: TextureOption[]; }

// ─────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────
const ROOMS: RoomOption[] = [
  {
    label: "Living Room",
    hint: "Feature wall behind sofa",
    src: "/images/Living-Room1.jpg",
    wallCorners: {
      tl: { x: 0.069, y: 0.219 },
      tr: { x: 0.929, y: 0.222 },
      br: { x: 0.929, y: 0.738 },
      bl: { x: 0.065, y: 0.738 },
    },
  },
  {
    label: "Office",
    hint: "Accent wall, straight-on shot",
    src: "/images/Bed-Room1.jpg",
    wallCorners: {
      tl: { x: 0.108, y: 0.077 },
      tr: { x: 0.889, y: 0.076 },
      br: { x: 0.89, y: 0.827 },
      bl: { x: 0.099, y: 0.827 },
    },
  },
  {
    label: "Bedroom",
    hint: "Headboard wall",
    src: "/images/Living-Room2.jpg",
    wallCorners: {
      tl: { x: 0.122, y: 0.192 },
      tr: { x: 0.882, y: 0.189 },
      br: { x: 0.884, y: 0.751 },
      bl: { x: 0.122, y: 0.749 },
    },
  },
];

// Every item points at the flat "_Swatch" close-up photo where the product
// folder has one (a true material sample, not a room/lifestyle shot). Where
// no swatch exists, it falls back to photo "2" in the set, which in this
// photo library is consistently a flat macro texture — "1" is a lifestyle
// room shot and other numbers can be spec-sheet graphics with text baked in.
const TEXTURE_GROUPS: TextureGroup[] = [
  {
    group: "Wall Panels",
    items: [
      { label: "Linen Rockies",    src: "/Wall-Panels/Linen_Rockies1.avif",    category: "Wall Panels" },
      { label: "Linen Sahara",     src: "/Wall-Panels/Linen_Sahara1.avif",     category: "Wall Panels" },
      { label: "Linen Thar",       src: "/Wall-Panels/Linen_Thar1.avif",       category: "Wall Panels" },
      { label: "Natural Chestnut", src: "/Wall-Panels/Natural_Chestnut1.avif", category: "Wall Panels" },
      { label: "Natural Leaf",     src: "/Wall-Panels/Natural_Leaf1.avif",     category: "Wall Panels" },
      { label: "Pearl Mirage",     src: "/Wall-Panels/Pearl_Mirage1.avif",     category: "Wall Panels" },
      { label: "Rockies",          src: "/Wall-Panels/Rockies1.avif",          category: "Wall Panels" },
      { label: "Woven Bamboo",     src: "/Wall-Panels/Woven_Bamboo1.avif",     category: "Wall Panels" },
      { label: "Woven Charcoal",   src: "/Wall-Panels/Woven_Charcoal1.avif",   category: "Wall Panels" },
    ],
  },
  {
    group: "Acoustic Panels",
    items: [
      { label: "Blonde Oak",     src: "/Acoustic-Panels/Blonde_Oak_Swatch.avif",   category: "Acoustic Panels" },
      { label: "Brown",          src: "/Acoustic-Panels/Brown_Swatch.avif",        category: "Acoustic Panels" },
      { label: "Charcoal Black", src: "/Acoustic-Panels/Charcoal_Black_Swatch.avif", category: "Acoustic Panels" },
      { label: "Grey",           src: "/Acoustic-Panels/Grey_Swatch.avif",         category: "Acoustic Panels" },
      { label: "Grey Oak",       src: "/Acoustic-Panels/Grey_Oak2.avif",           category: "Acoustic Panels" },
      { label: "Stained Grey",   src: "/Acoustic-Panels/Stained_Grey_Swatch.avif", category: "Acoustic Panels" },
      { label: "White Oak",      src: "/Acoustic-Panels/White_Oak2.avif",          category: "Acoustic Panels" },
    ],
  },
  {
    group: "Decorative Panels",
    items: [
      { label: "Ash Grey",      src: "/Decorative-Panels/Ash_Grey_Swatch.avif",     category: "Decorative Panels" },
      { label: "Brown Gold",    src: "/Decorative-Panels/Brown_Gold_Swatch.avif",   category: "Decorative Panels" },
      { label: "Brown Plume",   src: "/Decorative-Panels/Brown_Plume_Swatch.avif",  category: "Decorative Panels" },
      { label: "Charcoal Gold", src: "/Decorative-Panels/Charcoal_Gold_Swatch.avif", category: "Decorative Panels" },
      { label: "Pearl Gold",    src: "/Decorative-Panels/Pearl_Gold_Swatch.avif",   category: "Decorative Panels" },
      { label: "Slate Gold",    src: "/Decorative-Panels/Slate_Gold_Swatch.avif",   category: "Decorative Panels" },
      { label: "Walnut Brown",  src: "/Decorative-Panels/Walnut_Brown_Swatch.avif", category: "Decorative Panels" },
    ],
  },
  {
    group: "Marble Slab",
    items: [
      { label: "Arctic Gold",     src: "/Marble-Slab/Arctic_Gold2.avif",       category: "Marble Slab" },
      { label: "Calacatta Gold",  src: "/Marble-Slab/Calacatta_Gold_Swatch.avif", category: "Marble Slab" },
      { label: "Desert Taupe",    src: "/Marble-Slab/Desert_Taupe_Swatch.avif",  category: "Marble Slab" },
      { label: "Emerald Ember",   src: "/Marble-Slab/Emerald_Ember_Swatch.avif", category: "Marble Slab" },
      { label: "Grey Lava",       src: "/Marble-Slab/Grey_Lava2.avif",         category: "Marble Slab" },
      { label: "Ivory Gold",      src: "/Marble-Slab/Ivory_Gold_Swatch.avif",    category: "Marble Slab" },
      { label: "Midnight Aurora", src: "/Marble-Slab/Midnight_Aurora2.avif",   category: "Marble Slab" },
      { label: "Midnight Desire", src: "/Marble-Slab/Midnight_Desire2.avif",   category: "Marble Slab" },
      { label: "Phoenix Dance",   src: "/Marble-Slab/Phoenix_Dance2.avif",     category: "Marble Slab" },
      { label: "Sand Ripple",     src: "/Marble-Slab/Sand_Ripple2.avif",       category: "Marble Slab" },
      { label: "Storm Gold",      src: "/Marble-Slab/Storm_Gold_Swatch.avif",    category: "Marble Slab" },
    ],
  },
  {
    group: "Wallpaper",
    items: [
      { label: "Acacia",         src: "/Wallpaper/Acacia_Swatch.avif",        category: "Wallpaper" },
      { label: "Black",          src: "/Wallpaper/Black_Swatch.avif",         category: "Wallpaper" },
      { label: "Black Brushed",  src: "/Wallpaper/Black_Brushed_Swatch.avif", category: "Wallpaper" },
      { label: "Brown",          src: "/Wallpaper/Brown_Swatch.avif",         category: "Wallpaper" },
      { label: "Brushed Gold",   src: "/Wallpaper/Brushed_Gold_Swatch.avif",  category: "Wallpaper" },
      { label: "Brushed Grey",   src: "/Wallpaper/Brushed_Grey_Swatch.avif",  category: "Wallpaper" },
      { label: "Brushed Silver", src: "/Wallpaper/Brushed_Silver_Swatch.avif", category: "Wallpaper" },
      { label: "Cedar",          src: "/Wallpaper/Cedar_Swatch.avif",         category: "Wallpaper" },
      { label: "Espresso Brown", src: "/Wallpaper/Espresso_Brown_Swatch.avif", category: "Wallpaper" },
      { label: "Grey",           src: "/Wallpaper/Grey_Swatch.avif",          category: "Wallpaper" },
      { label: "Grey Oak",       src: "/Wallpaper/Grey_Oak_Swatch.avif",      category: "Wallpaper" },
      { label: "Ivory White",    src: "/Wallpaper/Ivory_White_Swatch.avif",   category: "Wallpaper" },
      { label: "Jet Black",      src: "/Wallpaper/Jet_Black_Swatch.avif",     category: "Wallpaper" },
      { label: "Marble White",   src: "/Wallpaper/Marble_White_Swatch.avif",  category: "Wallpaper" },
      { label: "Onyx Gold",      src: "/Wallpaper/Onyx_Gold_Swatch.avif",     category: "Wallpaper" },
      { label: "Walnut",         src: "/Wallpaper/Walnut_Swatch.avif",        category: "Wallpaper" },
      { label: "White Oak",      src: "/Wallpaper/White_Oak_Swatch.avif",     category: "Wallpaper" },
    ],
  },
];

const ALL_TEXTURES: TextureOption[] = TEXTURE_GROUPS.flatMap((g) => g.items);
const CATEGORY_NAMES = [...TEXTURE_GROUPS.map((g) => g.group), "Favorites"];
const CATEGORY_SPEC: Record<string, string> = {
  "Wall Panels": "WPC composite panel · interlocking install",
  "Acoustic Panels": "Felt-backed acoustic panel · sound dampening",
  "Decorative Panels": "3D decorative panel · textured surface",
  "Marble Slab": "Large-format marble slab · polished finish",
  "Wallpaper": "Textured wallcovering · pre-pasted",
};
const HR = 10; // corner handle radius (canvas px)
const FAVORITES_KEY = "panelopia_visualizer_favorites";
const MAX_UPLOAD_MB = 15;

const STEPS = [
  { key: "space" as const, num: 1, label: "Choose your space" },
  { key: "material" as const, num: 2, label: "Choose your material" },
  { key: "fit" as const, num: 3, label: "Fit it to your wall" },
];

// ─────────────────────────────────────────────────────────────────────────
// Geometry / rendering helpers
// ─────────────────────────────────────────────────────────────────────────
function scaledCorners(norm: Corners, w: number, h: number): Corners {
  return {
    tl: { x: norm.tl.x * w, y: norm.tl.y * h },
    tr: { x: norm.tr.x * w, y: norm.tr.y * h },
    br: { x: norm.br.x * w, y: norm.br.y * h },
    bl: { x: norm.bl.x * w, y: norm.bl.y * h },
  };
}

function defaultCorners(w: number, h: number): Corners {
  const px = w * 0.15, py = h * 0.15;
  return { tl: { x: px, y: py }, tr: { x: w - px, y: py }, br: { x: w - px, y: h - py }, bl: { x: px, y: h - py } };
}

function bilinear(c: Corners, u: number, v: number): Point {
  const { tl, tr, br, bl } = c;
  return {
    x: (1 - u) * (1 - v) * tl.x + u * (1 - v) * tr.x + u * v * br.x + (1 - u) * v * bl.x,
    y: (1 - u) * (1 - v) * tl.y + u * (1 - v) * tr.y + u * v * br.y + (1 - u) * v * bl.y,
  };
}

function drawAffineTriangle(
  ctx: CanvasRenderingContext2D, img: HTMLImageElement,
  src: [Point, Point, Point], dst: [Point, Point, Point],
): void {
  const [s0, s1, s2] = src, [d0, d1, d2] = dst;
  const sx1 = s1.x - s0.x, sy1 = s1.y - s0.y, sx2 = s2.x - s0.x, sy2 = s2.y - s0.y;
  const dx1 = d1.x - d0.x, dy1 = d1.y - d0.y, dx2 = d2.x - d0.x, dy2 = d2.y - d0.y;
  const det = sx1 * sy2 - sx2 * sy1;
  if (Math.abs(det) < 1e-8) return;
  const inv = 1 / det;
  const a = (dx1 * sy2 - dx2 * sy1) * inv, b = (dx2 * sx1 - dx1 * sx2) * inv;
  const c = (dy1 * sy2 - dy2 * sy1) * inv, d = (dy2 * sx1 - dy1 * sx2) * inv;
  const e = d0.x - a * s0.x - b * s0.y, f = d0.y - c * s0.x - d * s0.y;

  const cx = (d0.x + d1.x + d2.x) / 3;
  const cy = (d0.y + d1.y + d2.y) / 3;
  const expand = 0.8;

  ctx.save();
  ctx.beginPath();
  [d0, d1, d2].forEach((pt, i) => {
    const dx = pt.x - cx, dy = pt.y - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ex = pt.x + (dx / len) * expand;
    const ey = pt.y + (dy / len) * expand;
    i === 0 ? ctx.moveTo(ex, ey) : ctx.lineTo(ex, ey);
  });
  ctx.closePath();
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.transform(a, c, b, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

function drawWarpedTexture(ctx: CanvasRenderingContext2D, tex: HTMLImageElement, corners: Corners, repeat = 8, repeatY = repeat): void {
  const tw = tex.naturalWidth || 512;
  const th = tex.naturalHeight || 512;
  const GRID_X = repeat * 4;
  const GRID_Y = repeatY * 4;

  for (let row = 0; row < GRID_Y; row++) {
    for (let col = 0; col < GRID_X; col++) {
      const u0 = col / GRID_X, u1 = (col + 1) / GRID_X;
      const v0 = row / GRID_Y, v1 = (row + 1) / GRID_Y;
      const cTL = bilinear(corners, u0, v0);
      const cTR = bilinear(corners, u1, v0);
      const cBR = bilinear(corners, u1, v1);
      const cBL = bilinear(corners, u0, v1);
      const sx0 = ((col % 4) / 4) * tw;
      const sx1 = (((col % 4) + 1) / 4) * tw;
      const sy0 = ((row % 4) / 4) * th;
      const sy1 = (((row % 4) + 1) / 4) * th;
      drawAffineTriangle(ctx, tex, [{ x: sx0, y: sy0 }, { x: sx1, y: sy0 }, { x: sx1, y: sy1 }], [cTL, cTR, cBR]);
      drawAffineTriangle(ctx, tex, [{ x: sx0, y: sy0 }, { x: sx1, y: sy1 }, { x: sx0, y: sy1 }], [cTL, cBR, cBL]);
    }
  }
}

function applyEnvironmentalLighting(
  ctx: CanvasRenderingContext2D, room: HTMLImageElement, corners: Corners, w: number, h: number, intensity: number,
): void {
  const { tl, tr, br, bl } = corners;
  const pass = (mode: GlobalCompositeOperation, alpha: number) => {
    ctx.save(); ctx.globalAlpha = Math.min(1, alpha * intensity); ctx.globalCompositeOperation = mode;
    ctx.beginPath(); ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y); ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y); ctx.closePath(); ctx.clip();
    ctx.drawImage(room, 0, 0, w, h); ctx.restore();
  };
  pass("multiply", 0.88); pass("overlay", 0.28); pass("screen", 0.18);
}

function useImage(src: string | null): { img: HTMLImageElement | null; ready: boolean; error: boolean } {
  const [state, setState] = useState<{ img: HTMLImageElement | null; ready: boolean; error: boolean }>({ img: null, ready: false, error: false });
  useEffect(() => {
    if (!src) { setState({ img: null, ready: false, error: false }); return; }
    setState({ img: null, ready: false, error: false });
    const el = new Image(); el.crossOrigin = "anonymous";
    el.onload = () => setState({ img: el, ready: true, error: false });
    el.onerror = () => setState({ img: null, ready: true, error: true });
    el.src = src;
    return () => { el.onload = null; el.onerror = null; };
  }, [src]);
  return state;
}

// ─────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────
export default function WallVisualizer(): JSX.Element {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const fileRef    = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);
  const maskRef    = useRef<HTMLCanvasElement | null>(null);
  const layerRef   = useRef<HTMLCanvasElement | null>(null);
  const compositeRef = useRef<HTMLCanvasElement | null>(null);
  const paintingRef = useRef(false);
  const lastPaintPt = useRef<Point | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [stage, setStage] = useState<Stage>("space");
  const [visitedFit, setVisitedFit] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dropActive, setDropActive] = useState(false);

  const [cw, setCw] = useState(900);
  const [ch, setCh] = useState(562);
  const [activeRoom, setActiveRoom] = useState<RoomOption | null>(ROOMS[0]);
  const [roomSrc, setRoomSrc] = useState<string | null>(null);
  const [texSrc, setTexSrc] = useState(ALL_TEXTURES[0].src);
  const [corners, setCorners] = useState<Corners>(() => scaledCorners(ROOMS[0].wallCorners, 900, 562));
  const [showHandles, setShowHandles] = useState(true);
  const [dragging, setDragging] = useState<CornerKey | null>(null);
  const [selectedCorner, setSelectedCorner] = useState<CornerKey>("tl");
  const [cursor, setCursor] = useState("default");
  const [mode, setMode] = useState<Mode>("adjust");
  const [brushSize, setBrushSize] = useState(34);
  const [lightingIntensity, setLightingIntensity] = useState(1);
  const [tileScale, setTileScale] = useState(1);
  const [comparePos, setComparePos] = useState(100); // 100 = fully "after"
  const [draggingCompare, setDraggingCompare] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [brushCursor, setBrushCursor] = useState<Point | null>(null);
  const [maskVersion, setMaskVersion] = useState(0);
  const [layerVersion, setLayerVersion] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [categoryFilter, setCategoryFilter] = useState<string>(TEXTURE_GROUPS[0].group);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [quoteForm, setQuoteForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", city: "" as "" | "Calgary" | "Edmonton", message: "",
  });

  const { img: roomImg, ready: roomReady, error: roomError } = useImage(roomSrc);
  const { img: texImg, ready: texReady } = useImage(texSrc);

  // ── Favorites persistence ──────────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, []);
  const toggleFavorite = useCallback((src: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(src) ? next.delete(src) : next.add(src);
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // ── Ensure offscreen canvases exist / stay sized ───────────────────────
  useEffect(() => {
    if (!maskRef.current) maskRef.current = document.createElement("canvas");
    if (!layerRef.current) layerRef.current = document.createElement("canvas");
    if (!compositeRef.current) compositeRef.current = document.createElement("canvas");
    maskRef.current.width = cw; maskRef.current.height = ch;
    layerRef.current.width = cw; layerRef.current.height = ch;
    compositeRef.current.width = cw; compositeRef.current.height = ch;
    setMaskVersion(v => v + 1);
  }, [cw, ch]);

  const clearMask = useCallback(() => {
    const m = maskRef.current; if (!m) return;
    const mctx = m.getContext("2d"); if (!mctx) return;
    mctx.clearRect(0, 0, m.width, m.height);
    setMaskVersion(v => v + 1);
  }, []);

  // ── Loading-stage progress simulation ──────────────────────────────────
  const beginLoading = useCallback(() => {
    setStage("loading");
    setLoadingProgress(0);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = setInterval(() => {
      setLoadingProgress(p => (p >= 92 ? 92 : p + (92 - p) * 0.18 + 1));
    }, 90);
  }, []);

  useEffect(() => {
    if (stage !== "loading") return;
    if (!roomReady) return;
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setLoadingProgress(100);
    const t = setTimeout(() => setStage(roomError ? "space" : "material"), 260);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, roomReady, roomError]);

  useEffect(() => {
    if (roomError) setUploadError("We couldn't load that photo — try a different JPG or PNG.");
  }, [roomError]);

  useEffect(() => () => { if (progressTimerRef.current) clearInterval(progressTimerRef.current); }, []);

  // ── Room / canvas sizing ────────────────────────────────────────────────
  useEffect(() => {
    if (!roomImg || !roomReady || roomImg.naturalWidth <= 0) return;
    const newCh = Math.round(cw * (roomImg.naturalHeight / roomImg.naturalWidth));
    setCh(newCh);
    setCorners(activeRoom ? scaledCorners(activeRoom.wallCorners, cw, newCh) : defaultCorners(cw, newCh));
    clearMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomImg, roomReady, stage]);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    let lastW = 0;
    const obs = new ResizeObserver(() => {
      const w = Math.floor(el.getBoundingClientRect().width);
      if (w < 50 || Math.abs(w - lastW) < 2) return;
      lastW = w;
      setCw(w);
      const aspect = roomImg && roomImg.naturalWidth > 0 ? roomImg.naturalHeight / roomImg.naturalWidth : 562 / 900;
      const newCh = Math.round(w * aspect);
      setCh(newCh);
      setCorners(activeRoom ? scaledCorners(activeRoom.wallCorners, w, newCh) : defaultCorners(w, newCh));
    });
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomImg, activeRoom, stage]);

  // ── Heavy render: warp the texture + lighting onto layerRef ─────────────
  // This is the expensive step (hundreds of small drawImage calls in
  // drawWarpedTexture). It only needs to re-run when the texture, wall
  // corners, scale or lighting change — NOT on every erase-brush stroke or
  // compare-slider drag, which is what made erase mode laggy before.
  useEffect(() => {
    const layer = layerRef.current; if (!layer) return;
    const lctx = layer.getContext("2d"); if (!lctx) return;
    lctx.clearRect(0, 0, cw, ch);

    if (texImg && texImg.naturalWidth > 0) {
      lctx.save();
      const { tl, tr, br, bl } = corners;
      lctx.beginPath(); lctx.moveTo(tl.x, tl.y); lctx.lineTo(tr.x, tr.y); lctx.lineTo(br.x, br.y); lctx.lineTo(bl.x, bl.y); lctx.closePath(); lctx.clip();

      const activeTex = ALL_TEXTURES.find(t => t.src === texSrc);
      const [baseX, baseY] =
        activeTex?.category === "Wall Panels"       ? [3, 1] :
        activeTex?.category === "Acoustic Panels"   ? [3, 1] :
        activeTex?.category === "Decorative Panels" ? [6, 3] :
        activeTex?.category === "Marble Slab"       ? [1, 1] :
        activeTex?.category === "Wallpaper"         ? [7, 1] :
        [5, 4];
      const repeatX = Math.max(1, Math.round(baseX / tileScale));
      const repeatY = Math.max(1, Math.round(baseY / tileScale));

      drawWarpedTexture(lctx, texImg, corners, repeatX, repeatY);
      lctx.restore();

      if (roomImg && roomImg.naturalWidth > 0) applyEnvironmentalLighting(lctx, roomImg, corners, cw, ch, lightingIntensity);
    }

    setLayerVersion(v => v + 1);
  }, [cw, ch, corners, texImg, texSrc, tileScale, lightingIntensity, roomImg]);

  // ── Cheap render: composite room + texture + erase mask + overlays ──────
  // Runs on every erase stroke / compare drag — no texture re-warping here,
  // just a couple of cheap full-canvas drawImage calls.
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, cw, ch);

    if (roomImg && roomImg.naturalWidth > 0) ctx.drawImage(roomImg, 0, 0, cw, ch);
    else { ctx.fillStyle = "#c8bfb0"; ctx.fillRect(0, 0, cw, ch); }

    if (texImg && texImg.naturalWidth > 0 && layerRef.current && maskRef.current && compositeRef.current) {
      const comp = compositeRef.current;
      const cctx = comp.getContext("2d");
      if (cctx) {
        cctx.clearRect(0, 0, cw, ch);
        cctx.drawImage(layerRef.current, 0, 0);
        // punch erased areas back to the room photo, revealing windows / shelves / fixtures
        cctx.save();
        cctx.globalCompositeOperation = "destination-out";
        cctx.drawImage(maskRef.current, 0, 0);
        cctx.restore();
      }

      // compare clip — only show the texture layer left of the divider
      const clipX = Math.round((comparePos / 100) * cw);
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, clipX, ch); ctx.clip();
      ctx.drawImage(comp, 0, 0);
      ctx.restore();
    }

    if (showHandles && mode === "adjust") {
      const { tl, tr, br, bl } = corners;
      ctx.save(); ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y); ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y); ctx.closePath(); ctx.stroke(); ctx.restore();
      (["tl", "tr", "br", "bl"] as CornerKey[]).forEach(key => {
        const pt = corners[key], hot = dragging === key, sel = selectedCorner === key;
        ctx.save();
        ctx.beginPath(); ctx.arc(pt.x, pt.y, HR + 3.5, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,0,0,0.38)"; ctx.fill();
        ctx.beginPath(); ctx.arc(pt.x, pt.y, HR, 0, Math.PI * 2);
        ctx.fillStyle = hot ? "#f5a623" : "#fff";
        ctx.strokeStyle = hot ? "#c07a10" : sel ? "#f5a623" : "rgba(0,0,0,0.4)";
        ctx.lineWidth = sel ? 2.5 : 1.5; ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#1a1a1a"; ctx.font = "bold 8px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(key.toUpperCase(), pt.x, pt.y);
        ctx.restore();
      });
    }

    if (mode === "erase" && brushCursor) {
      ctx.save();
      // white halo first so the ring stays visible over dark or light photos
      ctx.beginPath(); ctx.arc(brushCursor.x, brushCursor.y, brushSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 3.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(brushCursor.x, brushCursor.y, brushSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = "#f5a623"; ctx.lineWidth = 1.5; ctx.stroke();
      // center crosshair dot so the exact hotspot is always visible
      ctx.beginPath(); ctx.arc(brushCursor.x, brushCursor.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
      ctx.restore();
    }
  }, [stage, cw, ch, corners, showHandles, dragging, selectedCorner, roomImg, texImg, roomReady, texReady, mode, brushCursor, brushSize, comparePos, maskVersion, layerVersion]);

  // ── Pointer interaction (mouse + touch + pen, unified) ─────────────────
  const toCanvas = useCallback((e: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current; if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (canvas.width / rect.width), y: (e.clientY - rect.top) * (canvas.height / rect.height) };
  }, []);

  const hitTest = useCallback((p: Point): CornerKey | null => {
    for (const key of ["tl", "tr", "br", "bl"] as CornerKey[]) {
      const cp = corners[key], dx = p.x - cp.x, dy = p.y - cp.y;
      if (Math.sqrt(dx * dx + dy * dy) <= (HR + 10) / zoom) return key;
    }
    return null;
  }, [corners, zoom]);

  const paintAt = useCallback((p: Point) => {
    const m = maskRef.current; if (!m) return;
    const mctx = m.getContext("2d"); if (!mctx) return;
    mctx.fillStyle = "#fff";
    mctx.beginPath(); mctx.arc(p.x, p.y, brushSize / 2, 0, Math.PI * 2); mctx.fill();
  }, [brushSize]);

  const paintLine = useCallback((a: Point, b: Point) => {
    const m = maskRef.current; if (!m) return;
    const mctx = m.getContext("2d"); if (!mctx) return;
    mctx.strokeStyle = "#fff"; mctx.lineWidth = brushSize; mctx.lineCap = "round"; mctx.lineJoin = "round";
    mctx.beginPath(); mctx.moveTo(a.x, a.y); mctx.lineTo(b.x, b.y); mctx.stroke();
  }, [brushSize]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLCanvasElement>) => {
    const p = toCanvas(e);
    if (mode === "adjust") {
      if (!showHandles) return;
      const hit = hitTest(p);
      if (hit) {
        setDragging(hit); setSelectedCorner(hit);
        canvasRef.current?.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    } else {
      paintingRef.current = true;
      lastPaintPt.current = p;
      paintAt(p);
      setMaskVersion(v => v + 1);
      canvasRef.current?.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
  }, [mode, showHandles, hitTest, toCanvas, paintAt]);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLCanvasElement>) => {
    const p = toCanvas(e);
    if (mode === "adjust") {
      if (dragging) setCorners(prev => ({ ...prev, [dragging]: { x: Math.max(0, Math.min(cw, p.x)), y: Math.max(0, Math.min(ch, p.y)) } }));
      setCursor(showHandles && hitTest(p) ? (dragging ? "grabbing" : "grab") : "default");
    } else {
      setBrushCursor(p);
      if (paintingRef.current) {
        if (lastPaintPt.current) paintLine(lastPaintPt.current, p); else paintAt(p);
        lastPaintPt.current = p;
        setMaskVersion(v => v + 1);
      }
    }
  }, [dragging, mode, showHandles, hitTest, toCanvas, cw, ch, paintAt, paintLine]);

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLCanvasElement>) => {
    setDragging(null);
    paintingRef.current = false;
    lastPaintPt.current = null;
    try { canvasRef.current?.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }, []);

  const onPointerLeaveCanvas = useCallback(() => {
    setBrushCursor(null);
  }, []);

  const onCanvasKeyDown = useCallback((e: ReactKeyboardEvent<HTMLCanvasElement>) => {
    if (mode !== "adjust") return;
    const step = e.shiftKey ? 8 : 1;
    let dx = 0, dy = 0;
    if (e.key === "ArrowLeft") dx = -step;
    else if (e.key === "ArrowRight") dx = step;
    else if (e.key === "ArrowUp") dy = -step;
    else if (e.key === "ArrowDown") dy = step;
    else return;
    e.preventDefault();
    setCorners(prev => {
      const pt = prev[selectedCorner];
      return { ...prev, [selectedCorner]: { x: Math.max(0, Math.min(cw, pt.x + dx)), y: Math.max(0, Math.min(ch, pt.y + dy)) } };
    });
  }, [mode, selectedCorner, cw, ch]);

  // ── Compare-slider dragging ─────────────────────────────────────────────
  const onCompareDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    setDraggingCompare(true);
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);
  const onCompareMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingCompare || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setComparePos(Math.max(4, Math.min(100, pct)));
  }, [draggingCompare]);
  const onCompareUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    setDraggingCompare(false);
    try { (e.target as HTMLDivElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  }, []);
  const toggleBeforeAfter = useCallback(() => {
    setComparePos(p => (p > 50 ? 4 : 100));
  }, []);

  // ── Room / upload handlers ──────────────────────────────────────────────
  const handleRoomSelect = useCallback((room: RoomOption) => {
    setUploadError(null);
    setActiveRoom(room);
    setRoomSrc(room.src);
    beginLoading();
  }, [beginLoading]);

  const validateAndLoad = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Please upload an image file (JPG or PNG)."); return; }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) { setUploadError(`That photo is a bit large — please keep it under ${MAX_UPLOAD_MB}MB.`); return; }
    setUploadError(null);
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const url = URL.createObjectURL(file);
    blobUrlRef.current = url;
    setActiveRoom(null);
    setRoomSrc(url);
    beginLoading();
  }, [beginLoading]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndLoad(e.target.files?.[0]);
    e.target.value = "";
  }, [validateAndLoad]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); setDropActive(false);
    validateAndLoad(e.dataTransfer.files?.[0]);
  }, [validateAndLoad]);

  useEffect(() => () => { if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current); }, []);

  const handleReset = useCallback(() => {
    setCorners(activeRoom ? scaledCorners(activeRoom.wallCorners, cw, ch) : defaultCorners(cw, ch));
    clearMask();
    setComparePos(100);
    setZoom(1);
  }, [activeRoom, cw, ch, clearMask]);

  const goToStep = useCallback((key: Stage) => {
    if (key === "space") { setStage("space"); return; }
    if (key === "material" && roomSrc) { setStage("material"); return; }
    if (key === "fit" && roomSrc && visitedFit) { setStage("fit"); return; }
  }, [roomSrc, visitedFit]);

  const handleContinueToFit = useCallback(() => {
    setVisitedFit(true);
    setStage("fit");
  }, []);

  // ── Filmstrip filtering ──────────────────────────────────────────────────
  const activeTexOption = useMemo(() => ALL_TEXTURES.find(t => t.src === texSrc) ?? ALL_TEXTURES[0], [texSrc]);

  const visibleTextures = useMemo(() => {
    let list = ALL_TEXTURES;
    if (categoryFilter === "Favorites") list = list.filter(t => favorites.has(t.src));
    else list = list.filter(t => t.category === categoryFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(t => t.label.toLowerCase().includes(q));
    }
    return list;
  }, [categoryFilter, search, favorites]);

  // ── Quote form ────────────────────────────────────────────────────────
  const openQuote = useCallback(() => {
    setQuoteStatus("idle");
    setQuoteForm(f => ({
      ...f,
      message: `Generated via Wall Visualizer — ${activeTexOption.label} (${activeTexOption.category}).`,
    }));
    setQuoteOpen(true);
  }, [activeTexOption]);

  const handleQuoteChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuoteForm(f => ({ ...f, [name]: value }));
  }, []);

  const handleQuoteSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.city) return;
    setQuoteStatus("loading");
    try {
      await insertLead({
        first_name: quoteForm.firstName,
        last_name: quoteForm.lastName,
        email: quoteForm.email,
        phone: quoteForm.phone || null,
        city: quoteForm.city,
        product_interest: `${activeTexOption.label} (${activeTexOption.category})`,
        project_type: "Wall Visualizer",
        budget: null,
        message: quoteForm.message || null,
      });
      setQuoteStatus("success");
    } catch {
      setQuoteStatus("error");
    }
  }, [quoteForm, activeTexOption]);

  // ═════════════════════════════════════════════════════════════════════
  // Step indicator (persistent across space/material/fit)
  // ═════════════════════════════════════════════════════════════════════
  const currentStepIndex = stage === "space" || stage === "loading" ? 0 : stage === "material" ? 1 : 2;

  const StepIndicator = (
    <div className={styles.stepIndicator}>
      {STEPS.map((s, i) => {
        const done = i < currentStepIndex;
        const active = i === currentStepIndex;
        const reachable = s.key === "space" || (s.key === "material" && !!roomSrc) || (s.key === "fit" && !!roomSrc && visitedFit);
        return (
          <React.Fragment key={s.key}>
            <button
              className={`${styles.stepPill} ${active ? styles.stepPillActive : ""} ${done ? styles.stepPillDone : ""}`}
              onClick={() => reachable && goToStep(s.key)}
              disabled={!reachable}
              type="button"
            >
              <span className={styles.stepPillNum}>{done ? <CheckIcon /> : s.num}</span>
              <span className={styles.stepPillLabel}>{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <span className={styles.stepConnector} />}
          </React.Fragment>
        );
      })}
    </div>
  );

  // ═════════════════════════════════════════════════════════════════════
  // STEP 1 — CHOOSE YOUR SPACE
  // ═════════════════════════════════════════════════════════════════════
  if (stage === "space") {
    return (
      <div className={styles.page}>
        {StepIndicator}
        <div className={styles.uploadStage}>
          <div className={styles.uploadLeft}>
            <p className={styles.uploadEyebrow}>Step 1 of 3</p>
            <h1 className={styles.uploadHeadline}>Choose<br />your space.</h1>
            <p className={styles.uploadSubline}>
              Upload a photo of your room and preview any Panelopia finish on your actual wall —
              or start with one of our sample rooms below.
            </p>

            <label
              className={`${styles.dropZone} ${dropActive ? styles.dropZoneActive : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDropActive(true); }}
              onDragLeave={() => setDropActive(false)}
              onDrop={handleDrop}
            >
              <span className={styles.dropZoneIcon}><UploadIcon size={18} /></span>
              <span className={styles.dropZoneText}>
                <span className={styles.dropZoneMain}>Drop a photo here, or click to browse</span>
                <span className={styles.dropZoneSub}>JPG or PNG, up to {MAX_UPLOAD_MB}MB</span>
              </span>
              <input ref={fileRef} type="file" accept="image/*" className={styles.fileInputHidden} onChange={handleUpload} />
            </label>

            {uploadError && <p className={styles.uploadError}>{uploadError}</p>}

            <div className={styles.uploadHints}>
              <span className={styles.uploadHint}><CheckIcon /> Best results from a straight-on, well-lit shot</span>
              <span className={styles.uploadHint}><CheckIcon /> Your photo stays in your browser — nothing is uploaded to a server</span>
              <span className={styles.uploadHint}><CheckIcon /> You can fine-tune the wall fit in the next step</span>
            </div>
          </div>

          <div className={styles.uploadRight}>
            <p className={styles.sampleLabel}>Or try a sample room</p>
            <div className={styles.sampleGrid}>
              {ROOMS.map(room => (
                <button key={room.src} className={styles.sampleCard} onClick={() => handleRoomSelect(room)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={room.src} alt={room.label} className={styles.sampleImg} loading="lazy" />
                  <div className={styles.sampleCardOverlay}>
                    <span className={styles.sampleCardLabel}>{room.label}</span>
                    <span className={styles.sampleCardHint}>{room.hint}</span>
                  </div>
                  <span className={styles.sampleCardCta}>Try this room <ArrowRightIcon /></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.howSection}>
          <div className={styles.howInner}>
            <p className={styles.howEyebrow}>How it works</p>
            <h2 className={styles.howTitle}>From photo to finished wall in under a minute.</h2>
            <div className={styles.stepsGrid}>
              <Step num="01" title="Choose your space" desc="Snap a photo of the wall you want to transform, or pick one of our sample rooms to explore first." />
              <Step num="02" title="Choose your material" desc="Browse WPC panels, acoustic panels, decorative panels, marble slabs, and wallpapers by category." />
              <Step num="03" title="Fit it to your wall" desc="Drag the corner handles to match your wall's perspective, then erase around windows, shelves, or fixtures." />
              <Step num="04" title="Compare & request" desc="Slide to compare before/after, then send your exact selection straight to our team for a quote." />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════
  // LOADING STAGE
  // ═════════════════════════════════════════════════════════════════════
  if (stage === "loading") {
    return (
      <div className={styles.page}>
        {StepIndicator}
        <div className={styles.loadingStage}>
          <div className={styles.loadingCard}>
            <div className={styles.loadingSkeleton}>
              <div className={styles.skeletonRoom}>
                <div className={styles.skeletonWall} />
                <div className={styles.skeletonAccent} style={{ width: `${loadingProgress}%` }} />
                <div className={styles.skeletonFloor} />
              </div>
            </div>
            <div className={styles.loadingMeta}>
              <div className={styles.loadingSpinner}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(245,166,35,0.15)" strokeWidth="3" />
                  <circle cx="20" cy="20" r="17" fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 17} strokeDashoffset={2 * Math.PI * 17 * (1 - loadingProgress / 100)}
                    transform="rotate(-90 20 20)" />
                </svg>
                <span className={styles.loadingPct}>{Math.round(loadingProgress)}%</span>
              </div>
              <div>
                <p className={styles.loadingTitle}>Analyzing your wall…</p>
                <p className={styles.loadingHint}>Detecting edges and preparing your preview</p>
              </div>
            </div>
            <div className={styles.loadingBar}>
              <div className={styles.loadingBarFill} style={{ width: `${loadingProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════
  // STEP 2 — CHOOSE YOUR MATERIAL
  // ═════════════════════════════════════════════════════════════════════
  if (stage === "material") {
    return (
      <div className={styles.page}>
        {StepIndicator}
        <div className={styles.materialStage}>
          <div className={styles.materialMain}>
            <p className={styles.uploadEyebrow}>Step 2 of 3</p>
            <h1 className={styles.materialHeadline}>Choose your material.</h1>

            <div className={styles.materialTabs}>
              {CATEGORY_NAMES.map(cat => (
                <button key={cat} className={`${styles.matTab} ${categoryFilter === cat ? styles.matTabActive : ""}`} onClick={() => setCategoryFilter(cat)}>
                  {cat}
                </button>
              ))}
              <div className={styles.matSearch}>
                <span className={styles.filmSearchIcon}><SearchIcon /></span>
                <input
                  className={styles.matSearchInput}
                  placeholder="Search finishes…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.materialGrid}>
              {visibleTextures.length === 0 && (
                <p className={styles.noResults}>
                  {categoryFilter === "Favorites" ? "No favorites yet — tap the star on a swatch to save it." : "No finishes match your search."}
                </p>
              )}
              {visibleTextures.map(tex => {
                const active = tex.src === texSrc;
                const fav = favorites.has(tex.src);
                return (
                  <button key={tex.src} className={`${styles.materialCard} ${active ? styles.materialCardActive : ""}`} onClick={() => setTexSrc(tex.src)}>
                    <span className={styles.materialCardImg}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tex.src} alt={tex.label} loading="lazy" />
                      <span
                        className={`${styles.swatchFav} ${fav ? styles.swatchFavActive : ""}`}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(tex.src); }}
                        role="button"
                        aria-label={fav ? `Remove ${tex.label} from favorites` : `Save ${tex.label} to favorites`}
                      >
                        <StarIcon filled={fav} />
                      </span>
                      {active && <span className={styles.materialCardCheck}><CheckCircleIcon /></span>}
                    </span>
                    <span className={styles.materialCardName}>{tex.label}</span>
                    <span className={styles.materialCardSpec}>{CATEGORY_SPEC[tex.category] ?? tex.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Sticky summary panel ── */}
          <aside className={styles.summaryPanel}>
            <p className={styles.summaryLabel}>Your selection</p>
            <div className={styles.summaryPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeTexOption.src} alt={activeTexOption.label} />
            </div>
            <p className={styles.summaryName}>{activeTexOption.label}</p>
            <p className={styles.summarySpec}>{CATEGORY_SPEC[activeTexOption.category] ?? activeTexOption.category}</p>

            <div className={styles.summaryRoomRow}>
              {roomSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={roomSrc} alt="Your room" className={styles.summaryRoomThumb} />
              )}
              <div>
                <p className={styles.summaryRoomLabel}>{activeRoom ? activeRoom.label : "Your uploaded photo"}</p>
                <button className={styles.summaryChangeSpace} onClick={() => setStage("space")}>Change space</button>
              </div>
            </div>

            <button className={styles.summaryContinue} onClick={handleContinueToFit}>
              Continue to fit <ArrowRightIcon />
            </button>
          </aside>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════
  // STEP 3 — FIT IT TO YOUR WALL
  // ═════════════════════════════════════════════════════════════════════
  return (
    <div className={styles.page}>
      {StepIndicator}
      <div className={styles.workbench}>

        {/* ── Toolbar ── */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button className={styles.tbBtn} onClick={() => setStage("material")} title="Change material">
              <RoomIcon /><span>Change material</span>
            </button>
            <div className={styles.tbDivider} />
            <button className={styles.tbBtn} onClick={() => fileRef.current?.click()} title="Upload a different photo">
              <UploadIcon size={13} /><span>Upload</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className={styles.fileInputHidden} onChange={handleUpload} />
          </div>

          <div className={styles.toolbarCenter}>
            <button className={`${styles.tbBtn} ${mode === "adjust" ? styles.tbBtnActive : ""}`} onClick={() => setMode("adjust")} title="Adjust wall corners">
              <MoveIcon /><span>Adjust</span>
            </button>
            <button className={`${styles.tbBtn} ${mode === "erase" ? styles.tbBtnActive : ""}`} onClick={() => setMode("erase")} title="Erase over windows, shelves, fixtures">
              <EraserIcon /><span>Erase</span>
            </button>
            <div className={styles.tbDivider} />
            <div className={styles.tbMaterialBadge}>
              <span className={styles.tbSwatchDot} style={{ backgroundImage: `url(${activeTexOption.src})`, backgroundSize: "cover" }} />
              <span className={styles.tbMaterialName}>{activeTexOption.label}</span>
              <span className={styles.tbMaterialCat}>{activeTexOption.category}</span>
            </div>
          </div>

          <div className={styles.toolbarRight}>
            <button className={styles.tbBtn} onClick={handleReset} title="Reset corners, erasing &amp; zoom">
              <ResetIcon /><span>Reset</span>
            </button>
            <button
              className={`${styles.tbBtn} ${showHandles ? styles.tbBtnActive : ""}`}
              onClick={() => setShowHandles(v => !v)}
              title={showHandles ? "Hide handles" : "Show handles"}
            >
              <EyeIcon open={!showHandles} /><span>{showHandles ? "Hide handles" : "Show handles"}</span>
            </button>
            <button
              className={`${styles.tbBtn} ${settingsOpen ? styles.tbBtnActive : ""}`}
              onClick={() => setSettingsOpen(v => !v)}
              title="Settings"
            >
              <GearIcon />
            </button>
          </div>
        </div>

        {/* ── Settings panel ── */}
        {settingsOpen && (
          <div className={styles.settingsPanel}>
            <div className={styles.settingsHeader}>
              Settings
              <button className={styles.settingsClose} onClick={() => setSettingsOpen(false)}><CloseIcon /></button>
            </div>

            {mode === "erase" && (
              <div className={styles.settingsCtrl}>
                <div className={styles.settingsCtrlRow}><span>Brush size</span><span className={styles.settingsCtrlVal}>{brushSize}px</span></div>
                <input type="range" min={12} max={90} value={brushSize} onChange={e => setBrushSize(+e.target.value)}
                  className={styles.settingsSlider} style={{ ["--pct" as string]: `${((brushSize - 12) / (90 - 12)) * 100}%` }} />
              </div>
            )}

            <div className={styles.settingsCtrl}>
              <div className={styles.settingsCtrlRow}><span>Panel scale</span><span className={styles.settingsCtrlVal}>{tileScale.toFixed(1)}×</span></div>
              <input type="range" min={0.5} max={2} step={0.1} value={tileScale} onChange={e => setTileScale(+e.target.value)}
                className={styles.settingsSlider} style={{ ["--pct" as string]: `${((tileScale - 0.5) / 1.5) * 100}%` }} />
            </div>

            <div className={styles.settingsCtrl}>
              <div className={styles.settingsCtrlRow}><span>Lighting match</span><span className={styles.settingsCtrlVal}>{Math.round(lightingIntensity * 100)}%</span></div>
              <input type="range" min={0} max={1.5} step={0.05} value={lightingIntensity} onChange={e => setLightingIntensity(+e.target.value)}
                className={styles.settingsSlider} style={{ ["--pct" as string]: `${(lightingIntensity / 1.5) * 100}%` }} />
            </div>

            <div className={styles.settingsCtrl}>
              <div className={styles.settingsCtrlRow}><span>Zoom</span><span className={styles.settingsCtrlVal}>{zoom.toFixed(1)}×</span></div>
              <input type="range" min={1} max={2.5} step={0.1} value={zoom} onChange={e => setZoom(+e.target.value)}
                className={styles.settingsSlider} style={{ ["--pct" as string]: `${((zoom - 1) / 1.5) * 100}%` }} />
            </div>

            <div className={styles.settingsCtrl}>
              <button className={styles.tbBtn} style={{ width: "100%", justifyContent: "center", background: "rgba(250,248,244,0.06)" }} onClick={clearMask}>
                Clear erased areas
              </button>
            </div>
          </div>
        )}

        {/* ── Canvas ── */}
        <div className={styles.canvasArea}>
          <div className={`${styles.canvasWrap} ${zoom > 1 ? styles.canvasWrapZoomed : ""}`} ref={wrapRef}>
            <div className={styles.canvasZoomLayer} style={{ transform: `scale(${zoom})` }}>
              <canvas
                ref={canvasRef}
                width={cw}
                height={ch}
                className={styles.canvas}
                style={{ cursor: mode === "erase" ? "none" : cursor, touchAction: "none" }}
                tabIndex={0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={onPointerLeaveCanvas}
                onKeyDown={onCanvasKeyDown}
              />

              <div className={styles.compareLabels}>
                <span className={styles.compareLabel}>After</span>
                <span className={styles.compareLabel}>Before</span>
              </div>

              <div
                className={styles.compareDragHandle}
                style={{ left: `${comparePos}%` }}
                onPointerDown={onCompareDown}
                onPointerMove={onCompareMove}
                onPointerUp={onCompareUp}
                onPointerCancel={onCompareUp}
              />
            </div>

            <div className={styles.floatingBadge}>
              <span className={styles.floatingBadgeDot} />
              <span>{activeTexOption.label}</span>
              <span className={styles.floatingBadgeTag}>Live preview</span>
            </div>

            <button className={styles.beforeAfterToggle} onClick={toggleBeforeAfter} title="Toggle before / after">
              <CompareIcon /> <span>{comparePos > 50 ? "Show before" : "Show after"}</span>
            </button>

            <div className={styles.zoomControls}>
              <button onClick={() => setZoom(z => Math.max(1, +(z - 0.2).toFixed(1)))} title="Zoom out" disabled={zoom <= 1}>−</button>
              <span>{zoom.toFixed(1)}×</span>
              <button onClick={() => setZoom(z => Math.min(2.5, +(z + 0.2).toFixed(1)))} title="Zoom in" disabled={zoom >= 2.5}>+</button>
            </div>

            <button className={styles.requestCta} onClick={openQuote}>
              Request a Quote <ArrowRightIcon />
            </button>
          </div>
        </div>

        <p className={styles.fitHint}>
          Drag the corner handles to fit your wall — arrow keys nudge the selected corner. Switch to Erase to reveal windows, shelves, or fixtures in front of the wall.
        </p>
      </div>

      {/* ── Quote modal ── */}
      {quoteOpen && (
        <div className={styles.quoteOverlay} onClick={() => setQuoteOpen(false)}>
          <div className={styles.quoteModal} onClick={e => e.stopPropagation()}>
            <button className={styles.quoteClose} onClick={() => setQuoteOpen(false)}><CloseIcon /></button>

            {quoteStatus === "success" ? (
              <div className={styles.quoteSuccess}>
                <div className={styles.successIcon}>✓</div>
                <h2 className={styles.quoteSuccessTitle}>Request received</h2>
                <p className={styles.quoteSuccessDesc}>
                  Thanks, {quoteForm.firstName}. We&apos;ll follow up about the {activeTexOption.label} finish within one business day.
                </p>
                <button className={styles.summaryChangeSpace} onClick={() => setQuoteOpen(false)}>Close</button>
              </div>
            ) : (
              <form className={styles.quoteForm} onSubmit={handleQuoteSubmit} noValidate>
                <p className={styles.uploadEyebrow}>Get a Quote</p>
                <h2 className={styles.quoteTitle}>Send us your wall visualizer selection</h2>
                <div className={styles.quoteSelectedRow}>
                  <span className={styles.tbSwatchDot} style={{ backgroundImage: `url(${activeTexOption.src})`, backgroundSize: "cover", width: 22, height: 22 }} />
                  <span>{activeTexOption.label} — {activeTexOption.category}</span>
                </div>

                <div className={styles.quoteRow}>
                  <div className={styles.quoteField}>
                    <label>First name *</label>
                    <input name="firstName" value={quoteForm.firstName} onChange={handleQuoteChange} required placeholder="Jane" />
                  </div>
                  <div className={styles.quoteField}>
                    <label>Last name *</label>
                    <input name="lastName" value={quoteForm.lastName} onChange={handleQuoteChange} required placeholder="Smith" />
                  </div>
                </div>

                <div className={styles.quoteRow}>
                  <div className={styles.quoteField}>
                    <label>Email *</label>
                    <input type="email" name="email" value={quoteForm.email} onChange={handleQuoteChange} required placeholder="jane@example.com" />
                  </div>
                  <div className={styles.quoteField}>
                    <label>Phone</label>
                    <input type="tel" name="phone" value={quoteForm.phone} onChange={handleQuoteChange} placeholder="+1 (403) 000-0000" />
                  </div>
                </div>

                <div className={styles.quoteField}>
                  <label>Nearest city *</label>
                  <select name="city" value={quoteForm.city} onChange={handleQuoteChange} required>
                    <option value="" disabled>Select your city</option>
                    <option value="Calgary">Calgary</option>
                    <option value="Edmonton">Edmonton</option>
                  </select>
                </div>

                <div className={styles.quoteField}>
                  <label>Message</label>
                  <textarea name="message" value={quoteForm.message} onChange={handleQuoteChange} rows={3} />
                </div>

                {quoteStatus === "error" && (
                  <p className={styles.uploadError}>Something went wrong sending your request. Please try again.</p>
                )}

                <button type="submit" className={styles.summaryContinue} disabled={quoteStatus === "loading"}>
                  {quoteStatus === "loading" ? "Sending…" : "Send request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Small presentational pieces
// ─────────────────────────────────────────────────────────────────────────
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className={styles.step}>
      <span className={styles.stepNum}>{num}</span>
      <span className={styles.stepAccent} />
      <p className={styles.stepTitle}>{title}</p>
      <p className={styles.stepDesc}>{desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────
function UploadIcon({ size = 13 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" /></svg>;
}
function EyeIcon({ open }: { open: boolean }) {
  return open
    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" /></svg>;
}
function GearIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>;
}
function CloseIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
}
function MoveIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" /></svg>;
}
function EraserIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H8.5L3 14.5a1 1 0 010-1.41L13.09 3l8 8L12.5 20" /><path d="M13 3l8 8" /></svg>;
}
function ResetIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>;
}
function RoomIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>;
}
function SearchIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>;
}
function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}
function CheckCircleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5A623" stroke="#1A1814" strokeWidth={1}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" stroke="#1A1814" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ArrowRightIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
}
function StarIcon({ filled }: { filled: boolean }) {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "#F5A623" : "none"} stroke={filled ? "#F5A623" : "#fff"} strokeWidth={2}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>;
}
function CompareIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" /></svg>;
}

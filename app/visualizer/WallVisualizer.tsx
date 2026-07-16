"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";

interface Point { x: number; y: number; }
type CornerKey = "tl" | "tr" | "br" | "bl";
type Corners = Record<CornerKey, Point>;

interface RoomOption {
  label: string;
  src: string;
  wallCorners: Corners;
}

interface TextureOption { label: string; src: string; category: string; }
interface TextureGroup  { group: string; items: TextureOption[]; }

const ROOMS: RoomOption[] = [
  {
    label: "Living Room",
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
    src: "/images/Living-Room2.jpg",
    wallCorners: {
      tl: { x: 0.122, y: 0.192 },
      tr: { x: 0.882, y: 0.189 },
      br: { x: 0.884, y: 0.751 },
      bl: { x: 0.122, y: 0.749 },
    },
  },
];

const TEXTURE_GROUPS: TextureGroup[] = [
  {
    group: "Wall Panels",
    items: [
      { label: "Linen Sahara",     src: "/Wall-Panels/Linen_Sahara1.avif",     category: "Wall" },
      { label: "Linen Thar",       src: "/Wall-Panels/Linen_Thar1.avif",       category: "Wall" },
      { label: "Natural Chestnut", src: "/Wall-Panels/Natural_Chestnut1.avif", category: "Wall" },
      { label: "Natural Leaf",     src: "/Wall-Panels/Natural_Leaf1.avif",     category: "Wall" },
      { label: "Pearl Mirage",     src: "/Wall-Panels/Pearl_Mirage1.avif",     category: "Wall" },
      { label: "Rockies",          src: "/Wall-Panels/Rockies1.avif",          category: "Wall" },
      { label: "Woven Bamboo",     src: "/Wall-Panels/Woven_Bamboo1.avif",     category: "Wall" },
      { label: "Woven Charcoal",   src: "/Wall-Panels/Woven_Charcoal1.avif",   category: "Wall" },
    ],
  },
  {
    group: "Acoustic Panels",
    items: [
      { label: "Grey Oak",  src: "/Acoustic-Panels/Grey_Oak1.avif",  category: "Acoustic" },
      { label: "White Oak", src: "/Acoustic-Panels/White_Oak1.avif", category: "Acoustic" },
    ],
  },
  {
    group: "Decorative Panels",
    items: [
      { label: "Brown Gold",  src: "/Decorative-Panels/Brown_Gold1.avif",  category: "Decorative" },
      { label: "Brown Plume", src: "/Decorative-Panels/Brown_Plume1.avif", category: "Decorative" },
      { label: "Slate Gold",  src: "/Decorative-Panels/Slate_Gold1.avif",  category: "Decorative" },
    ],
  },
  {
    group: "Marble Slab",
    items: [
      { label: "Arctic Gold",     src: "/Marble-Slab/Arctic_Gold1.avif",     category: "Marble" },
      { label: "Grey Lava",       src: "/Marble-Slab/Grey_Lava1.avif",       category: "Marble" },
      { label: "Midnight Aurora", src: "/Marble-Slab/Midnight_Aurora1.avif", category: "Marble" },
      { label: "Midnight Desire", src: "/Marble-Slab/Midnight_Desire1.avif", category: "Marble" },
      { label: "Phoenix Dance",   src: "/Marble-Slab/Phoenix_Dance1.avif",   category: "Marble" },
      { label: "Sand Ripple",     src: "/Marble-Slab/Sand_Ripple1.avif",     category: "Marble" },
    ],
  },
  {
    group: "Wallpaper",
    items: [
      { label: "Black Brushed", src: "/Wallpaper/Black_Brushed1.avif", category: "Wallpaper" },
      { label: "Black",         src: "/Wallpaper/Black1.avif",         category: "Wallpaper" },
      { label: "Brown",         src: "/Wallpaper/Brown1.avif",         category: "Wallpaper" },
      { label: "Cedar",         src: "/Wallpaper/Cedar1.avif",         category: "Wallpaper" },
      { label: "Grey",          src: "/Wallpaper/Grey1.avif",          category: "Wallpaper" },
      { label: "Walnut",        src: "/Wallpaper/Walnut1.avif",        category: "Wallpaper" },
      { label: "White Oak",     src: "/Wallpaper/White_Oak1.avif",     category: "Wallpaper" },
    ],
  },
];

const ALL_TEXTURES: TextureOption[] = TEXTURE_GROUPS.flatMap((g) => g.items);
const HR   = 10;

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
  return { tl:{x:px,y:py}, tr:{x:w-px,y:py}, br:{x:w-px,y:h-py}, bl:{x:px,y:h-py} };
}

function bilinear(c: Corners, u: number, v: number): Point {
  const { tl, tr, br, bl } = c;
  return {
    x: (1-u)*(1-v)*tl.x + u*(1-v)*tr.x + u*v*br.x + (1-u)*v*bl.x,
    y: (1-u)*(1-v)*tl.y + u*(1-v)*tr.y + u*v*br.y + (1-u)*v*bl.y,
  };
}

function drawAffineTriangle(
  ctx: CanvasRenderingContext2D, img: HTMLImageElement,
  src: [Point,Point,Point], dst: [Point,Point,Point],
): void {
  const [s0,s1,s2]=src, [d0,d1,d2]=dst;
  const sx1=s1.x-s0.x, sy1=s1.y-s0.y, sx2=s2.x-s0.x, sy2=s2.y-s0.y;
  const dx1=d1.x-d0.x, dy1=d1.y-d0.y, dx2=d2.x-d0.x, dy2=d2.y-d0.y;
  const det=sx1*sy2-sx2*sy1;
  if (Math.abs(det)<1e-8) return;
  const inv=1/det;
  const a=(dx1*sy2-dx2*sy1)*inv, b=(dx2*sx1-dx1*sx2)*inv;
  const c=(dy1*sy2-dy2*sy1)*inv, d=(dy2*sx1-dy1*sx2)*inv;
  const e=d0.x-a*s0.x-b*s0.y, f=d0.y-c*s0.x-d*s0.y;

  // Compute centroid to expand outward from center
  const cx = (d0.x+d1.x+d2.x)/3;
  const cy = (d0.y+d1.y+d2.y)/3;
  const expand = 0.8;

  ctx.save();
  ctx.beginPath();
  [d0,d1,d2].forEach((pt,i)=>{
    const dx=pt.x-cx, dy=pt.y-cy;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    const ex=pt.x+(dx/len)*expand;
    const ey=pt.y+(dy/len)*expand;
    i===0 ? ctx.moveTo(ex,ey) : ctx.lineTo(ex,ey);
  });
  ctx.closePath();
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.transform(a,c,b,d,e,f);
  ctx.drawImage(img,0,0);
  ctx.restore();
}

function drawWarpedTexture(ctx: CanvasRenderingContext2D, tex: HTMLImageElement, corners: Corners, repeat = 8, repeatY = repeat): void {
  const tw = tex.naturalWidth || 512;
  const th = tex.naturalHeight || 512;

  // GRID must be a multiple of repeat so tile boundaries land exactly on cell edges
  const GRID_X = repeat * 4;   // 4 subdivisions per tile
  const GRID_Y = repeatY * 4;

  for (let row = 0; row < GRID_Y; row++) {
    for (let col = 0; col < GRID_X; col++) {
      const u0 = col / GRID_X, u1 = (col + 1) / GRID_X;
      const v0 = row / GRID_Y, v1 = (row + 1) / GRID_Y;

      const cTL = bilinear(corners, u0, v0);
      const cTR = bilinear(corners, u1, v0);
      const cBR = bilinear(corners, u1, v1);
      const cBL = bilinear(corners, u0, v1);

      // These now always land on clean tile boundaries — no fractional mismatches
      const sx0 = ((col % 4) / 4) * tw;
      const sx1 = (((col % 4) + 1) / 4) * tw;
      const sy0 = ((row % 4) / 4) * th;
      const sy1 = (((row % 4) + 1) / 4) * th;

      drawAffineTriangle(ctx, tex,
        [{x:sx0,y:sy0},{x:sx1,y:sy0},{x:sx1,y:sy1}],
        [cTL, cTR, cBR]);
      drawAffineTriangle(ctx, tex,
        [{x:sx0,y:sy0},{x:sx1,y:sy1},{x:sx0,y:sy1}],
        [cTL, cBR, cBL]);
    }
  }
}

function applyEnvironmentalLighting(ctx: CanvasRenderingContext2D, room: HTMLImageElement, corners: Corners, w: number, h: number): void {
  const {tl,tr,br,bl}=corners;
  const pass=(mode: GlobalCompositeOperation, alpha: number)=>{
    ctx.save(); ctx.globalAlpha=alpha; ctx.globalCompositeOperation=mode;
    ctx.beginPath(); ctx.moveTo(tl.x,tl.y); ctx.lineTo(tr.x,tr.y); ctx.lineTo(br.x,br.y); ctx.lineTo(bl.x,bl.y); ctx.closePath(); ctx.clip();
    ctx.drawImage(room,0,0,w,h); ctx.restore();
  };
  pass("multiply",0.88); pass("overlay",0.28); pass("screen",0.18);
}

function useImage(src: string): [HTMLImageElement|null, boolean] {
  const [state,setState]=useState<{img:HTMLImageElement|null;ready:boolean}>({img:null,ready:false});
  useEffect(()=>{
    setState({img:null,ready:false});
    const el=new Image(); el.crossOrigin="anonymous";
    el.onload=()=>setState({img:el,ready:true});
    el.onerror=()=>setState({img:el,ready:true});
    el.src=src;
    return ()=>{ el.onload=null; el.onerror=null; };
  },[src]);
  return [state.img,state.ready];
}

// ── Responsive breakpoint hook ──────────────────────────────────────────
function useIsMobile(breakpoint = 860): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function WallVisualizer(): JSX.Element {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);
  const blobUrlRef= useRef<string|null>(null);

  const isMobile = useIsMobile();

  const [cw,setCw]=useState(900);
  const [ch,setCh]=useState(562);
  const [activeRoom,setActiveRoom]=useState<RoomOption|null>(ROOMS[0]);
  const [roomSrc,setRoomSrc]=useState(ROOMS[0].src);
  const [texSrc,setTexSrc]=useState(ALL_TEXTURES[0].src);
  const [corners,setCorners]=useState<Corners>(()=>scaledCorners(ROOMS[0].wallCorners,900,562));
  const [showH,setShowH]=useState(true);
  const [dragging,setDragging]=useState<CornerKey|null>(null);
  const [cursor,setCursor]=useState("default");

  const [roomImg,roomReady]=useImage(roomSrc);
  const [texImg,texReady]=useImage(texSrc);

  useEffect(()=>{
    if (!roomImg||!roomReady||roomImg.naturalWidth<=0) return;
    const newCh=Math.round(cw*(roomImg.naturalHeight/roomImg.naturalWidth));
    setCh(newCh);
    setCorners(activeRoom ? scaledCorners(activeRoom.wallCorners,cw,newCh) : defaultCorners(cw,newCh));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomImg,roomReady]);

  useEffect(()=>{
    const el=wrapRef.current; if (!el) return;
    let lastW=0;
    const obs=new ResizeObserver(()=>{
      const w=Math.floor(el.getBoundingClientRect().width);
      if (w<50||Math.abs(w-lastW)<2) return;
      lastW=w;
      setCw(w);
      const aspect=roomImg&&roomImg.naturalWidth>0 ? roomImg.naturalHeight/roomImg.naturalWidth : 562/900;
      const newCh=Math.round(w*aspect);
      setCh(newCh);
      setCorners(activeRoom ? scaledCorners(activeRoom.wallCorners,w,newCh) : defaultCorners(w,newCh));
    });
    obs.observe(el);
    return ()=>obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomImg,activeRoom]);

  useEffect(()=>{
    const canvas=canvasRef.current; if (!canvas) return;
    const ctx=canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0,0,cw,ch);
    if (roomImg&&roomImg.naturalWidth>0) ctx.drawImage(roomImg,0,0,cw,ch);
    else { ctx.fillStyle="#c8bfb0"; ctx.fillRect(0,0,cw,ch); }
    if (texImg&&texImg.naturalWidth>0) {
  ctx.save();
  const {tl,tr,br,bl}=corners;
  ctx.beginPath(); ctx.moveTo(tl.x,tl.y); ctx.lineTo(tr.x,tr.y); ctx.lineTo(br.x,br.y); ctx.lineTo(bl.x,bl.y); ctx.closePath(); ctx.clip();
  const activeTex = ALL_TEXTURES.find(t => t.src === texSrc);

// repeatX = how many times to tile horizontally
// repeatY = how many times to tile vertically (1 = stretch to fill, no repeat)
const [repeatX, repeatY] =
  activeTex?.category === "Wall"        ? [3, 1] :
  activeTex?.category === "Acoustic"    ? [3, 1] :
  activeTex?.category === "Decorative"  ? [6, 3] :
  activeTex?.category === "Marble"      ? [1, 1] :
  activeTex?.category === "Wallpaper"   ? [7, 1] :
  [5, 4];

drawWarpedTexture(ctx, texImg, corners, repeatX, repeatY);
  ctx.restore();
      if (roomImg&&roomImg.naturalWidth>0) applyEnvironmentalLighting(ctx,roomImg,corners,cw,ch);
    }
    if (showH) {
      const {tl,tr,br,bl}=corners;
      ctx.save(); ctx.strokeStyle="rgba(255,255,255,0.55)"; ctx.lineWidth=1.5; ctx.setLineDash([6,4]);
      ctx.beginPath(); ctx.moveTo(tl.x,tl.y); ctx.lineTo(tr.x,tr.y); ctx.lineTo(br.x,br.y); ctx.lineTo(bl.x,bl.y); ctx.closePath(); ctx.stroke(); ctx.restore();
      (["tl","tr","br","bl"] as CornerKey[]).forEach(key=>{
        const pt=corners[key], hot=dragging===key;
        ctx.save();
        ctx.beginPath(); ctx.arc(pt.x,pt.y,HR+3.5,0,Math.PI*2); ctx.fillStyle="rgba(0,0,0,0.38)"; ctx.fill();
        ctx.beginPath(); ctx.arc(pt.x,pt.y,HR,0,Math.PI*2);
        ctx.fillStyle=hot?"#f5a623":"#fff"; ctx.strokeStyle=hot?"#c07a10":"rgba(0,0,0,0.4)"; ctx.lineWidth=1.5; ctx.fill(); ctx.stroke();
        ctx.fillStyle="#1a1a1a"; ctx.font="bold 8px system-ui"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(key.toUpperCase(),pt.x,pt.y);
        ctx.restore();
      });
    }
  },[cw,ch,corners,showH,dragging,roomImg,texImg,roomReady,texReady]);

  const toCanvas=useCallback((e: ReactMouseEvent<HTMLCanvasElement>): Point=>{
    const canvas=canvasRef.current; if (!canvas) return {x:0,y:0};
    const rect=canvas.getBoundingClientRect();
    return {x:(e.clientX-rect.left)*(canvas.width/rect.width),y:(e.clientY-rect.top)*(canvas.height/rect.height)};
  },[]);
  const hitTest=useCallback((p: Point): CornerKey|null=>{
    for (const key of ["tl","tr","br","bl"] as CornerKey[]) {
      const cp=corners[key],dx=p.x-cp.x,dy=p.y-cp.y;
      if (Math.sqrt(dx*dx+dy*dy)<=HR+7) return key;
    }
    return null;
  },[corners]);
  const onDown=useCallback((e: ReactMouseEvent<HTMLCanvasElement>)=>{
    if (!showH) return;
    const hit=hitTest(toCanvas(e));
    if (hit){setDragging(hit);e.preventDefault();}
  },[showH,hitTest,toCanvas]);
  const onMove=useCallback((e: ReactMouseEvent<HTMLCanvasElement>)=>{
    const p=toCanvas(e);
    if (dragging) setCorners(prev=>({...prev,[dragging]:{x:Math.max(0,Math.min(cw,p.x)),y:Math.max(0,Math.min(ch,p.y))}}));
    setCursor(showH&&hitTest(p)?(dragging?"grabbing":"grab"):"default");
  },[dragging,showH,hitTest,toCanvas,cw,ch]);
  const onUp=useCallback(()=>setDragging(null),[]);

  const handleRoomSelect=useCallback((room: RoomOption)=>{
    setActiveRoom(room); setRoomSrc(room.src);
    setCorners(scaledCorners(room.wallCorners,cw,ch));
  },[cw,ch]);
  const handleUpload=useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]; if (!file) return;
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const url=URL.createObjectURL(file);
    blobUrlRef.current=url; setActiveRoom(null); setRoomSrc(url); e.target.value="";
  },[]);
  useEffect(()=>()=>{if(blobUrlRef.current)URL.revokeObjectURL(blobUrlRef.current);},[]);

  const [copied, setCopied] = useState(false);
  const handleCopyCoords = useCallback(() => {
    const norm = {
      tl: { x: +(corners.tl.x / cw).toFixed(3), y: +(corners.tl.y / ch).toFixed(3) },
      tr: { x: +(corners.tr.x / cw).toFixed(3), y: +(corners.tr.y / ch).toFixed(3) },
      br: { x: +(corners.br.x / cw).toFixed(3), y: +(corners.br.y / ch).toFixed(3) },
      bl: { x: +(corners.bl.x / cw).toFixed(3), y: +(corners.bl.y / ch).toFixed(3) },
    };
    const code =
`wallCorners: {
  tl: { x: ${norm.tl.x}, y: ${norm.tl.y} },
  tr: { x: ${norm.tr.x}, y: ${norm.tr.y} },
  br: { x: ${norm.br.x}, y: ${norm.br.y} },
  bl: { x: ${norm.bl.x}, y: ${norm.bl.y} },
},`;
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [corners, cw, ch]);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      fontFamily: "system-ui,-apple-system,sans-serif",
      overflow: "hidden",
    }}>

      {/* ── Canvas column ── */}
      <div style={{
        flex: isMobile ? "0 0 42%" : 1,
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "#111",
        overflow: "hidden",
      }}>

        {/* Canvas */}
        <div ref={wrapRef} style={{
          flex:1,minHeight:0,
          position: "relative",
          display:"flex",alignItems:"center",justifyContent:"center",
          padding: isMobile ? 8 : 12,boxSizing:"border-box",overflow:"hidden",
        }}>
          <canvas
            ref={canvasRef} width={cw} height={ch}
            style={{display:"block",maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",borderRadius:6,cursor,boxShadow:"0 4px 32px rgba(0,0,0,0.6)"}}
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          />

          {/* Floating action buttons */}
          <div style={{
            position:"absolute",
            top: isMobile ? 8 : 12,
            right: isMobile ? 8 : 12,
            display:"flex",
            gap: isMobile ? 6 : 8,
            zIndex: 5,
          }}>
            <button onClick={()=>fileRef.current?.click()} style={btnStyle(isMobile)} title="Upload room">
              <UploadIcon/>{!isMobile && <span>Upload room</span>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleUpload}/>
            <button
              onClick={()=>setShowH(v=>!v)}
              title={showH ? "Hide handles" : "Show handles"}
              style={{
                ...btnStyle(isMobile),
                background:  showH?"rgba(245,166,35,0.22)":"rgba(20,17,12,0.75)",
                borderColor: showH?"rgba(245,166,35,0.5)":"rgba(255,255,255,0.15)",
                color:       showH?"#f5c86a":"rgba(255,255,255,0.75)",
              }}
            >
              <EyeIcon open={!showH}/>{!isMobile && <span>{showH?"Hide handles":"Show handles"}</span>}
            </button>
            <button
              onClick={handleCopyCoords}
              title="Copy current corner coordinates"
              style={{
                ...btnStyle(isMobile),
                background: copied ? "rgba(80,200,120,0.25)" : "rgba(20,17,12,0.72)",
                borderColor: copied ? "rgba(80,200,120,0.6)" : "rgba(255,255,255,0.15)",
                color: copied ? "#8fe6ad" : "rgba(255,255,255,0.8)",
              }}
            >
              <CopyIcon/>{!isMobile && <span>{copied ? "Copied!" : "Copy coords"}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div style={{
        width: isMobile ? "100%" : 230,
        flexShrink: 0,
        flex: isMobile ? "1 1 58%" : "none",
        display:"flex",flexDirection:"column",
        background:"#1c1916",
        borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.1)",
        borderTop:  isMobile ? "1px solid rgba(255,255,255,0.1)" : "none",
        overflow:"hidden",
        minHeight:0,
      }}>

        {/* Single scrollable container for Rooms + Panels */}
        <div style={{
          flex:1,
          minHeight:0,
          overflowY:"auto",
          scrollbarWidth:"thin",
          scrollbarColor:"rgba(255,255,255,0.15) transparent",
        }}>

          {/* Rooms */}
          <div style={{padding: isMobile ? "12px 12px 10px" : "14px 12px 10px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <SectionLabel>Rooms</SectionLabel>
            {isMobile ? (
              <div style={{display:"flex",flexDirection:"row",gap:8,overflowX:"auto",paddingBottom:2}}>
                {ROOMS.map(room=>(
                  <RoomThumb key={room.src} src={room.src} label={room.label}
                    active={roomSrc===room.src} onClick={()=>handleRoomSelect(room)}
                    width={128} shrink0 />
                ))}
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {ROOMS.map(room=>(
                  <RoomThumb key={room.src} src={room.src} label={room.label}
                    active={roomSrc===room.src} onClick={()=>handleRoomSelect(room)}/>
                ))}
              </div>
            )}
          </div>

          {/* Panels */}
          <div style={{padding: isMobile ? "10px 12px 18px" : "10px 12px 16px"}}>
            <SectionLabel>Panels</SectionLabel>
            {TEXTURE_GROUPS.map(group=>(
              <div key={group.group} style={{marginBottom:14}}>
                <p style={{margin:"0 0 7px",fontSize: isMobile?10:9,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)"}}>
                  {group.group}
                </p>
                <div style={{
                  display:"grid",
                  gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "1fr 1fr",
                  gap: isMobile ? 8 : 6,
                }}>
                  {group.items.map(tex=>(
                    <PanelThumb key={tex.src} src={tex.src} label={tex.label}
                      active={texSrc===tex.src} onClick={()=>setTexSrc(tex.src)}
                      size={isMobile ? 64 : 52} />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Hint — pinned at bottom, hidden on mobile to save space */}
        {!isMobile && (
          <div style={{flexShrink:0,padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            <p style={{margin:0,fontSize:10,lineHeight:1.6,color:"rgba(255,255,255,0.25)"}}>
              Wall auto-detected. Drag <span style={{color:"#f5c86a"}}>corner handles</span> to refine, then hide to preview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const btnStyle = (compact: boolean): React.CSSProperties => ({
  display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,
  padding: compact ? "8px" : "7px 12px", fontSize:12,fontWeight:500,
  borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",
  background:"rgba(20,17,12,0.72)",color:"rgba(255,255,255,0.8)",
  backdropFilter:"blur(6px)",
  cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",
  minWidth: compact ? 36 : undefined,
  boxShadow:"0 2px 12px rgba(0,0,0,0.35)",
});

function SectionLabel({children}: {children: React.ReactNode}) {
  return <p style={{margin:"0 0 8px",fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.38)"}}>{children}</p>;
}

function RoomThumb({src,label,active,onClick,width,shrink0}: {
  src:string;label:string;active:boolean;onClick:()=>void;width?:number;shrink0?:boolean;
}) {
  return (
    <button onClick={onClick} style={{
      position:"relative",overflow:"hidden",borderRadius:8,
      width: width ? width : "100%",
      flexShrink: shrink0 ? 0 : undefined,
      border:active?"2px solid #f5a623":"2px solid transparent",
      padding:0,cursor:"pointer",background:"none",outline:"none",
      opacity:active?1:0.68,transition:"opacity 0.15s,border-color 0.15s",display:"block",
    }}
      onMouseEnter={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.opacity="1";}}
      onMouseLeave={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.opacity="0.68";}}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} loading="lazy" style={{display:"block",width:"100%",height: width ? 74 : 52,objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)",pointerEvents:"none"}}/>
      <span style={{position:"absolute",bottom:6,left:8,fontSize:12,fontWeight:600,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.9)",pointerEvents:"none"}}>{label}</span>
    </button>
  );
}

function PanelThumb({src,label,active,onClick,size}: {src:string;label:string;active:boolean;onClick:()=>void;size?:number}) {
  return (
    <button onClick={onClick} style={{
      position:"relative",overflow:"hidden",borderRadius:6,
      border:active?"2px solid #f5a623":"2px solid transparent",
      padding:0,cursor:"pointer",background:"none",outline:"none",
      opacity:active?1:0.68,transition:"opacity 0.15s,border-color 0.15s",
    }}
      onMouseEnter={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.opacity="1";}}
      onMouseLeave={e=>{if(!active)(e.currentTarget as HTMLButtonElement).style.opacity="0.68";}}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} loading="lazy" style={{display:"block",width:"100%",height: size ?? 52,objectFit:"cover"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 55%)",pointerEvents:"none"}}/>
      <span style={{position:"absolute",bottom:4,left:5,right:5,fontSize: size && size > 56 ? 10.5 : 9.5,fontWeight:600,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.9)",pointerEvents:"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</span>
    </button>
  );
}

function UploadIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"/></svg>;
}

function EyeIcon({open}: {open:boolean}) {
  return open
    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>;
}

function CopyIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
}
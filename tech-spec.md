# Tech Spec - MowisAI Website

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering |
| three | ^0.172.0 | 3D instanced mesh voxel scene |
| @types/three | ^0.172.0 | Three.js type definitions |
| gsap | ^3.12.7 | Animation engine (ScrollTrigger, ticker, timelines) |
| lenis | ^1.2.3 | Smooth scroll with inertia |
| tailwindcss | ^4.1.0 | Utility CSS |
| @tailwindcss/vite | ^4.1.0 | Tailwind Vite integration |
| typescript | ^5.7.0 | Type safety |
| vite | ^6.3.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | React Vite plugin |

Fonts: PP Neue Montreal (CDN or local), JetBrains Mono (Google Fonts).

## Component Inventory

### Layout
- **AppShell** - Lenis initializer, page load overlay, custom cursor renderer, Three.js canvas container. Mounts once at root.
- **PageLoadOverlay** - Full-screen white div that fades out on mount.
- **CustomCursor** - 8px dot that follows mouse with GSAP lag; scales to ring on interactive hover.

### Sections
- **HeroSection** - Text content over the 3D canvas. H1 split into words for staggered reveal. CTA button with magnetic hover.
- **StatementSection** - Pinned 200vh section. Camera zooms into voxel structure; text lines slide in horizontally.
- **CapabilitiesSection** - 300vh horizontal scroll-jacking section. 4 panels with parallax image backgrounds.
- **SignatureSection** - 100vh with SVG Flow Field background. Centered frosted glass manifesto card.
- **FooterSection** - 100vh with SVG Looping Scroll marquee behind frosted glass footer content.

### Reusable Components
- **MagneticButton** - Pill-shaped button that magnetically attracts to cursor on hover.
- **FlowFieldSVG** - Inline SVG with 40 programmatic polyline elements driven by sine/cosine math.
- **LoopingMarquee** - Two duplicated text elements animated via GSAP for seamless horizontal loop.

### Hooks
- **useLenis** - Initializes Lenis, syncs RAF with GSAP ticker, wires ScrollTrigger update.
- **useVoxelScene** - Creates OrthographicCamera, InstancedMesh (1000 cubes), raycaster hover highlight, mouse orbit, scroll-driven camera Y sweep.

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Page load overlay fade | GSAP | gsap.to overlay opacity 0, duration 1.2s, Expo.easeOut | Low |
| Custom cursor follow | GSAP | gsap.quickTo for x/y with 0.15s duration; scale tween on hover detection | Low |
| 3D Voxel Scene | Three.js + GSAP | InstancedMesh with 1000 cubes, OrthographicCamera, mouse orbit, ScrollTrigger-driven camera Y sweep, raycaster hover color highlight | **High** |
| Hero text staggered blur-in | GSAP | Split H1 into word spans, stagger from {opacity:0, filter:'blur(10px)'} to clear | Low |
| Magnetic button hover | GSAP | Track mouse offset from button center, gsap.to button transform on enter, reset on leave | Medium |
| Statement section pinned zoom | GSAP ScrollTrigger | Pin section 200vh, slide text lines in horizontally, sync with camera zoom | Medium |
| Horizontal parallax scroll | GSAP ScrollTrigger | Container scrub x from 0 to -300vw; per-image fromTo x:20vw to x:-20vw with scale tween | **High** |
| SVG Flow Field generation | Vanilla JS + GSAP | Programmatically create 40 polylines with sine/cosine math; stagger reveal from random | Medium |
| Footer looping marquee | GSAP | gsap.fromTo x:0 to x:-50%, duration 20s, repeat:-1, ease:none | Low |

## State & Logic

- **Lenis-GSAP bridge**: Lenis RAF must feed into GSAP ticker (not separate rAF). Lenis scroll events must call `ScrollTrigger.update()`. This is critical for all scroll-driven animations to sync.
- **Three.js lifecycle**: Canvas created once in AppShell, reused across Hero and Statement sections. Scene is `position: fixed; z-index: -1` behind all DOM content. Camera Y position driven by global scroll progress.
- **Raycaster debouncing**: Voxel hover highlight reads mouse position from the same mousemove listener used for cursor/orbit. Do not create separate listeners.
- **Horizontal parallax wiring**: The `containerAnimation` parameter on per-image ScrollTriggers must reference the same timeline object as the main container tween. Store as ref.
- **Font loading**: PP Neue Montreal loaded via @font-face from local files or CDN. JetBrains Mono from Google Fonts. Ensure fonts are loaded before triggering entrance animations.

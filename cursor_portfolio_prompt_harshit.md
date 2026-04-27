# 🧠 CURSOR PROMPT — HARSHIT MATHUR PORTFOLIO
# Copy everything below this line and paste into Cursor

---

## ROLE & MISSION

You are a **Senior Creative Technologist + Awwwards-level UI Engineer**. Your mission is to build Harshit Mathur's personal portfolio — a dark, cinematic, sci-fi/futuristic developer portfolio that looks like it was designed by the intersection of a NASA control room and a Tokyo hacker lab. This site should feel alive, intelligent, and completely unlike any "template" portfolio.

**North Star**: If someone lands on this site, they should feel like they've stepped into a sci-fi command center run by an AI/ML engineer who also codes and builds startups. Every pixel, every transition, every interaction should reinforce: *this person is serious, technical, creative, and entrepreneurial.*

---

## TECH STACK (NON-NEGOTIABLE)

```
Framework:     Next.js 14+ (App Router)
Language:      TypeScript
Styling:       Tailwind CSS + custom CSS (for advanced effects)
Animation:     GSAP + ScrollTrigger + Framer Motion (use both strategically)
Smooth Scroll: Lenis
3D/Canvas:     Three.js or react-three-fiber (for hero background)
Fonts:         Space Mono (monospace/code feel) + Syne (display headers) — load from Google Fonts
Icons:         Lucide React + custom SVGs
Deploy-ready:  Vercel (ensure next.config.js is clean)
```

---

## DESIGN SYSTEM

### Color Palette (CSS variables in globals.css)
```css
--bg-void: #020408;          /* deepest background — near black with blue tint */
--bg-surface: #080d14;       /* card/panel backgrounds */
--bg-elevated: #0d1520;      /* elevated surfaces */
--grid-line: #0a1628;        /* subtle grid lines */
--neon-cyan: #00e5ff;        /* primary accent — electric cyan */
--neon-green: #39ff14;       /* secondary accent — terminal green */
--neon-purple: #7b2fff;      /* tertiary — for tags/badges */
--text-primary: #e8f4f8;     /* off-white — easier on eyes */
--text-secondary: #5a7a8a;   /* muted */
--text-dim: #1e3040;         /* very dim — grid numbers, decorative text */
--glow-cyan: rgba(0,229,255,0.15);
--glow-green: rgba(57,255,20,0.12);
--border-subtle: rgba(0,229,255,0.08);
--border-active: rgba(0,229,255,0.4);
```

### Typography Rules
- **Display/Hero text**: `font-family: 'Syne', sans-serif` — bold 700/800, massive scale (clamp 4rem to 10vw)
- **Body/Paragraphs**: `font-family: 'Space Mono', monospace` — 400 weight, slight letter-spacing
- **Labels/Badges/Numbers**: `font-family: 'Space Mono', monospace` — uppercase, 0.15em letter-spacing
- **NEVER use**: Inter, Roboto, Arial, system-ui as primary fonts

### Grid & Layout
- Background: persistent subtle dot-grid or line-grid overlay at 2% opacity across entire site
- Sections alternate between left-heavy and right-heavy asymmetric layouts
- Use `grid-template-columns: 1fr 2fr` or `3fr 1fr` asymmetry — never centered columns for hero/about
- Corner coordinates: decorate section corners with `[00:01]` style labels in `--text-dim`
- Scanline overlay: very subtle repeating horizontal lines at 0.5% opacity on hero

---

## SITE ARCHITECTURE

```
/
├── app/
│   ├── layout.tsx           (global providers, Lenis, custom cursor)
│   ├── page.tsx             (home — all sections assembled)
│   ├── blog/
│   │   ├── page.tsx         (blog listing)
│   │   └── [slug]/page.tsx  (individual post — MDX)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── Navbar.tsx
│   │   ├── GlitchText.tsx
│   │   ├── TerminalText.tsx
│   │   ├── NoiseBg.tsx
│   │   └── SectionLabel.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Timeline.tsx
│   │   ├── Achievements.tsx
│   │   ├── Blog.tsx
│   │   ├── EasterEgg.tsx
│   │   └── Contact.tsx
│   └── three/
│       └── HeroCanvas.tsx   (Three.js particle field)
├── content/
│   └── blog/                (MDX files)
├── lib/
│   ├── lenis.ts
│   └── gsap.ts
└── public/
    └── fonts/ (if self-hosting)
```

---

## PERSONAL DATA (USE EXACTLY AS PROVIDED)

```typescript
// lib/data.ts — create this file

export const personal = {
  name: "Harshit Mathur",
  tagline: "Building Intelligent Systems. Shipping Real Products.",
  subTagline: "AI/ML Engineer · Full-Stack Builder · IIT (ISM) Dhanbad · Founder",
  bio: `I sit at the intersection of research and execution — training models that see the world, building systems that ship to it, and founding ventures that make it matter. Currently pursuing B.Tech in ECE at IIT (ISM) Dhanbad (CGPA 8.91), obsessing over computer vision, LLMs, and whatever breaks next.`,
  email: "mathur.harshit96@gmail.com",
  phone: "+91 9555913188",
  location: "IIT (ISM) Dhanbad, Jharkhand",
  links: {
    github: "https://github.com/HarshitMathur01",
    linkedin: "https://www.linkedin.com/in/harshit-mathur-4b2417207/",
    kaggle: "https://www.kaggle.com/harshitmathur96",
    codeforces: "https://codeforces.com/profile/HarshitMathur",
    email: "mailto:mathur.harshit96@gmail.com",
  },
};

export const experience = [
  {
    id: "iit-roorkee",
    role: "ML Research Intern",
    company: "IIT Roorkee",
    duration: "May 2025 – July 2025",
    type: "Research",
    highlights: [
      "Developed an unsupervised vision system using ground-based visual data for real-time landslide early warning",
      "Architected scalable deep learning pipelines for domain generalization",
      "Adapted optical flow models from aerial imagery to ground-level visual streams",
    ],
    tech: ["PyTorch", "Computer Vision", "Optical Flow", "Deep Learning"],
  },
];

export const education = [
  {
    institution: "Indian Institute of Technology (ISM) Dhanbad",
    degree: "B.Tech — Electronics & Communication Engineering",
    duration: "2023 – May 2027",
    cgpa: "8.91 / 10",
    coursework: ["Linear Algebra", "Probability & Statistics", "Calculus", "DSA"],
  },
];

export const projects = [
  {
    id: "news-agent",
    title: "AI-Powered Authenticated News Agent",
    shortTitle: "NewsAgent AI",
    description:
      "Autonomous AI system for news retrieval, verification, summarization, and publishing. BERT-base semantic similarity for claim cross-verification. Gemini-powered abstractive summarization. End-to-end pipeline: web crawl → fact check → summarize → SEO → publish.",
    tech: ["PyTorch", "BERT", "Gemini", "NLP", "LangChain", "RAG"],
    category: "AI / NLP",
    github: "https://github.com/HarshitMathur01",
    featured: true,
  },
  {
    id: "land-cover",
    title: "Data-Centric Land Cover Classification",
    shortTitle: "BMVC 2024",
    description:
      "BMVC 2024 submission. Novel ranking strategy to estimate label fidelity for noise-robust training. DeepLabv3+ with ResNet152 backbone — 0.7331 Val Mean IoU. 75+ model variants submitted including Grounding SAM, DINO, UNet, Mask2Former. Kendall Tau: 0.4635.",
    tech: ["HuggingFace", "Lightning", "Hydra", "DeepLabv3+", "Voxel51", "Grounding SAM"],
    category: "Computer Vision",
    github: "https://github.com/HarshitMathur01",
    featured: true,
    badge: "BMVC 2024",
  },
];

export const skills = {
  "Languages": ["Python", "C/C++"],
  "Frameworks": ["PyTorch", "Lightning", "Hydra", "LangChain", "LangGraph"],
  "AI/ML": ["Computer Vision", "NLP", "Transformers", "LLMs", "RAG", "Transfer Learning", "CNNs", "Semantic Segmentation"],
  "Libraries": ["HuggingFace", "OpenCV", "timm", "Scikit-learn", "Librosa", "segmentation-models-pytorch"],
  "Tools": ["Git", "GitHub", "Neptune", "Voxel51", "VS Code"],
  "Concepts": ["OOP", "OS", "SQL", "DSA"],
};

export const achievements = [
  { text: "2nd Runner-Up (445 teams) — SHL Hiring Assessment Challenge, Kaggle", icon: "🏆" },
  { text: "2nd Runner-Up — AGGLOMERATION 2.0 (CSE Society) & AI of GOD 3.0 (MnC Dept, IIT Dhanbad)", icon: "🥉" },
  { text: "Codeforces Specialist — Max Rating 1461 | CodeChef 3-Star — Max Rating 1694 | 500+ problems solved", icon: "⚡" },
  { text: "Volleyball Team Captain — Winners Parakram 2024 | 1st Runner-Up Parakram 2025 & Dhanbad District Tournament", icon: "🏐" },
  { text: "Inter IIT Sports Meet — 2023 (IIT Bombay), 2024 (IIT Kanpur), 2025 (IIT Hyderabad)", icon: "🎖️" },
];

export const startup = {
  name: "MindMitra",
  tagline: "My Startup — Coming Soon",
  description: "Currently building something ambitious. Details dropping soon.",
  status: "stealth",
};
```

---

## SECTION-BY-SECTION SPECS

### 1. NAVBAR
- Fixed top, `backdrop-blur-sm` with `bg-void/80`
- Logo: `HM_` — monospace font, neon-cyan, cursor blinking after underscore
- Nav links: `ABOUT`, `WORK`, `SKILLS`, `TIMELINE`, `BLOG`, `CONTACT` — uppercase Space Mono, small
- Far right: a small `[AVAILABLE FOR OPPORTUNITIES]` pill that pulses with neon-green glow
- On mobile: hamburger → full-screen overlay menu with staggered line animations
- Scroll behavior: add thin neon-cyan `1px` border-bottom on scroll

### 2. HERO SECTION
**This is the centerpiece. Spare nothing.**

**Background**: Three.js canvas — animated particle field. ~2000 particles in deep space, slowly drifting. On mouse move, particles near cursor repel gently (within 150px radius). Color: mix of `#00e5ff` and `#7b2fff` at low opacity (0.4–0.7). Add a large, very dim wireframe sphere/torus rotating slowly in background.

**Layout**: Full viewport height. Asymmetric — content left-aligned at ~10% from left.

**Content structure**:
```
[top-left corner label: 00:00 — INIT SEQUENCE]

<small tag>  AI/ML ENGINEER · FOUNDER · IIT (ISM) DHANBAD

<H1>         HARSHIT
             MATHUR
             
<tagline>    Building Intelligent Systems.
             Shipping Real Products.

<bio>        (1 sentence, terminal-typed animation)

<CTA row>    [VIEW WORK ↗]  [GITHUB ↗]  [DOWNLOAD RESUME ↗]
```

**Animations** (GSAP timeline on mount, Lenis smooth scroll active):
1. Glitch flash on `HARSHIT MATHUR` (3 rapid frames) then settles — runs once
2. Each word of H1 slides up from below with stagger (0.08s between)
3. Tagline fades + slides in after 0.4s delay
4. Bio text: TerminalText component — types character by character
5. CTA buttons fade in last with slight scale from 0.95→1
6. Vertical `[SCROLL]` text on right edge with slowly descending arrow

**Bottom edge**: a grid of small numbers `[00] [01] [02]...` in `--text-dim`, like a control panel readout

### 3. ABOUT SECTION
**Layout**: 60/40 grid. Left: big asymmetric text block. Right: a "stats card" panel.

**Left content**:
```
SECTION LABEL: [02 — PROFILE]

Large quote-style text (Syne, 2.5rem):
"I don't just train models — I build the systems they live in."

Body paragraph about Harshit — expand from bio:
ECE student at IIT (ISM) Dhanbad (CGPA 8.91). Researcher at IIT Roorkee.
Passionate about CV, LLMs, and shipping products that matter.
Also: Volleyball team captain, competitive programmer (500+ problems),
and currently building a startup (MindMitra — stay tuned).
```

**Right: Stats cards** (dark panel, subtle neon border):
```
[ 8.91   ]  [ 700+   ]  [ 4      ]
[ CGPA   ]  [ PROBLEMS] [ Hackathon Wins ]

[ 1461   ]  [ 3★     ]  [ 3      ]
[ CF RANK]  [ CODECHEF] [ INTER IIT]
```
Each stat counter animates up from 0 when scrolled into view (GSAP CountTo).

**Startup Teaser** (bottom of this section or standalone mini-section):
A sleek, mysterious card:
```
┌─────────────────────────────────┐
│  ◈  MINDMITRA                   │
│     Something is being built.   │
│     An AI venture. Stay tuned.  │
│                                 │
│  STATUS: ████░░░░  [STEALTH]    │
└─────────────────────────────────┘
```
Animated progress bar slowly fills. Subtle pulse on the `◈` icon.

### 4. SKILLS SECTION
**DO NOT use boring skill bars or percentages.**

**Layout**: A "tech constellation" — render skills as interconnected nodes on a canvas/SVG. Group them by category. On hover, node glows neon-cyan, connected lines pulse. Click a node → show tooltip with context.

**Alternative if canvas is too complex**: Use a **hexagonal grid** of skill badges. Each hex has the skill name. On hover: scale up, neon border glows, faint description appears.

Categories to render as distinct clusters:
- AI/ML Core (center cluster — most prominent)
- Frameworks
- Languages
- Tools
- Research Methods

Add section label `[03 — ARSENAL]` top-left.

### 5. PROJECTS SECTION
**Layout**: Each project is a full-width panel, not a small card.

**Project card structure**:
```
┌──────────────────────────────────────────────────────────┐
│  [01]                              CATEGORY TAG          │
│                                                          │
│  PROJECT TITLE (Syne, large)                             │
│                                                          │
│  Description paragraph (Space Mono, small, muted)        │
│                                                          │
│  Tech pills: [PyTorch] [BERT] [LangChain]                │
│                                                          │
│  [VIEW ON GITHUB ↗]              [LIVE DEMO ↗]          │
└──────────────────────────────────────────────────────────┘
```

**On hover**: entire card's left border transitions from `--border-subtle` to neon-cyan with glow. Title gets subtle glitch effect for 0.3s.

**Scroll behavior**: Projects section uses GSAP ScrollTrigger horizontal scrub — projects slide in from right as user scrolls down (pinned container, horizontal scroll on scroll).

Add section label `[04 — PROJECTS]` + a small `FETCH /projects HTTP/1.1` text in dim color — techy flavor.

### 6. TIMELINE SECTION (RESUME VIEW)
**Label**: `[05 — TIMELINE]`

**Design**: A vertical timeline with a glowing neon-cyan vertical line on the left. Each entry appears as a "terminal log entry":

```
▶  MAY 2025 ────────────────────────────
   ML Research Intern @ IIT Roorkee
   > Landslide early warning system
   > Domain generalization for optical flow
   > Scalable DL pipelines
   [PyTorch] [CV] [Research]

▶  2023 → PRESENT ──────────────────────
   B.Tech ECE @ IIT (ISM) Dhanbad
   CGPA: 8.91/10
   [Ongoing]
```

Animation: entries slide in from left as user scrolls, with a typing effect on the role text. The vertical line draws itself downward as you scroll (GSAP DrawSVG or clip-path trick).

### 7. ACHIEVEMENTS SECTION
**Label**: `[06 — LOGS]`

**Design**: A "system log" style feed. Each achievement is a log line:
```
[SUCCESS] 2nd Runner-Up — SHL Kaggle Challenge (445 teams)
[SUCCESS] 2nd Runner-Up — AGGLOMERATION 2.0 · AI of GOD 3.0
[STATUS]  Codeforces: Specialist (1461) | CodeChef: 3★ (1694) | 500+ solved
[TROPHY]  Volleyball Captain — Parakram 2024 Winners
[TROPHY]  Inter IIT Sports Meet — Bombay · Kanpur · Hyderabad
```

Entries appear one by one with a brief delay, like a terminal printing. Color code: `[SUCCESS]` in neon-green, `[STATUS]` in cyan, `[TROPHY]` in gold/amber.

### 8. BLOG SECTION
**Label**: `[07 — TRANSMISSIONS]`

**Design**: 3-column grid of blog "signal cards". Each card:
- Dark panel with subtle border
- Post title (Syne, medium)
- Date in monospace, dim
- Tags in neon-purple pills
- `READ →` link

For now, show 3 placeholder/dummy posts with realistic AI/ML titles:
1. "How I Trained an Optical Flow Model to Detect Landslides in Real-Time"
2. "BMVC 2024: What I Learned Submitting 75+ Model Variants"
3. "RAG Pipelines vs Fine-Tuning: When to Use What"

Wire up MDX so Harshit can add real posts later. Use `contentlayer` or direct MDX with `next/mdx`.

### 9. CONTACT SECTION
**Label**: `[08 — SIGNAL]`

**Left**: Big text:
```
LET'S
BUILD
SOMETHING.
```
(Syne, massive, stacked, left-aligned)

Sub-text: `Whether it's research, a project, a startup collab, or just a good conversation — I'm open.`

**Right**: Contact panel styled as a terminal input:
```
┌─ ESTABLISH CONNECTION ─────────────┐
│                                    │
│  > name:    [________________]     │
│  > email:   [________________]     │
│  > message: [________________]     │
│             [________________]     │
│             [________________]     │
│                                    │
│  [SEND TRANSMISSION ↵]             │
└────────────────────────────────────┘
```

Form inputs: dark bg, neon-cyan bottom-border only (no full border), monospace font. On focus: entire input glows faintly.

**Social links row** below form:
`GH` `LI` `KG` `CF` `MAIL` — each as small square buttons with icon + code label

**Footer**: `HARSHIT MATHUR © 2025 — BUILT WITH NEXT.JS + GSAP + THREE.JS`

---

## CUSTOM CURSOR
Create a `CustomCursor.tsx` component:
- Hide default cursor globally: `cursor: none` on `body`
- Render two elements:
  1. **Dot**: 6px circle, neon-cyan, follows mouse with zero lag (`transform: translate` direct)
  2. **Ring**: 32px circle outline, follows with spring lag (use Framer Motion `useSpring` on x/y)
- On hover over links/buttons:
  - Dot disappears
  - Ring expands to 50px and fills with `--glow-cyan`
  - Text inside ring: `VIEW` or `OPEN`
- On hover over project cards: ring shows `↗`
- Disable on mobile/touch devices

---

## NOISE & ATMOSPHERE
Add a `NoiseBg.tsx` component that renders a full-screen fixed SVG noise texture at 3% opacity over everything — creates film grain. Use:
```svg
<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
<feColorMatrix type="saturate" values="0"/>
```
Animate the noise seed slowly for a living texture feel.

---

## EASTER EGG — THE KONAMI CODE TERMINAL

When the user types the Konami Code (`↑↑↓↓←→←→BA`) anywhere on the site:
1. Screen flashes white for 1 frame
2. A full-screen terminal overlay appears (like a hacker movie terminal):
```
┌──────────────────────────────────────────────┐
│  HARSHIT OS v2.0.25 — UNAUTHORIZED ACCESS    │
│  ──────────────────────────────────────────  │
│  > Scanning user...                          │
│  > Identity: [REDACTED]                      │
│  > Clearance level: GRANTED                  │
│                                              │
│  Fun facts loading...                        │
│                                              │
│  [01] Volleyball captain who also trains     │
│       neural networks. Two different         │
│       kinds of blocking.                     │
│                                              │
│  [02] Has submitted 75+ ML model variants    │
│       for a single competition. Perfectionism│
│       is a feature, not a bug.               │
│                                              │
│  [03] Rating on Codeforces: 1461.            │
│       Rating on IRL: higher.                 │
│                                              │
│  [04] Building a startup while maintaining   │
│       8.91 CGPA. Sleep is overrated.         │
│                                              │
│  > CONNECTION ESTABLISHED                    │
│  > Type 'exit' to return to normal mode.     │
│                                              │
│  harshit@portfolio:~$ _                      │
└──────────────────────────────────────────────┘
```
- Text types in line by line (TerminalText component)
- Functional `exit` command closes the overlay
- The blinking cursor at the bottom is real (CSS animation)
- Close also on `Escape` key
- Background: pure black, green monospace text (`#39ff14`)

---

## ANIMATIONS MASTER PLAN

### Page Load Sequence (GSAP Timeline, runs once)
```
0.0s  — Noise overlay fades in
0.2s  — Navbar slides down from top
0.5s  — Hero section lines stagger up (SplitText per word)
0.8s  — Glitch effect on name (3 rapid distortions)
1.0s  — Three.js particle field fades in
1.2s  — TerminalText starts typing bio
1.5s  — CTAs fade in + scale from 0.95
```

### Scroll Animations (GSAP ScrollTrigger)
- Every section heading: clip-path reveal `inset(0 100% 0 0)` → `inset(0 0% 0 0)`
- Stats in About: CountTo animation from 0 on enter
- Timeline entries: stagger slide from left
- Achievement log lines: stagger typewriter on enter
- Project cards horizontal scroll pin

### Hover States
- Nav links: underline draws in from left (CSS clip-path)
- CTA buttons: background fills from left on hover + icon shifts right
- Project cards: left border glow + title glitch (0.3s, once)
- Skill nodes: scale 1.1 + glow pulse
- Blog cards: subtle lift + border brighten
- Social links: scale + color shift to neon-cyan

### Lenis Smooth Scroll Config
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
})
```

---

## PERFORMANCE & POLISH

- `prefers-reduced-motion`: detect and disable all animations — content must still be accessible
- Three.js canvas: lazy-load, pause when tab is not visible (`visibilitychange`)
- Images: use `next/image` for all, WebP format
- Fonts: `next/font/google` — preload `Syne` and `Space Mono`
- SEO: proper `metadata` in `layout.tsx` — title, description, OG tags
- `next/headers` for appropriate caching
- Vercel Analytics: add `@vercel/analytics` — one-line integration

---

## RESPONSIVE BEHAVIOR

- **Desktop (1280px+)**: Full experience, all animations, custom cursor
- **Tablet (768–1280px)**: Simplified layouts, animations preserved but scaled back. Two-column grids become one or two column.
- **Mobile (<768px)**: Single column everything. Disable custom cursor, Three.js canvas replaced with animated gradient bg. Keep GSAP scroll animations (lighter variants). Hamburger menu.

---

## FILE CREATION ORDER (follow this sequence)

1. `npx create-next-app@latest harshit-portfolio --typescript --tailwind --app --src-dir=false`
2. Install deps: `npm install gsap @studio-freight/lenis framer-motion three @react-three/fiber @react-three/drei lucide-react`
3. `globals.css` — CSS variables, base resets, custom cursor hide, noise SVG, grid overlay
4. `lib/data.ts` — all personal data (use exactly what's provided above)
5. `components/ui/CustomCursor.tsx`
6. `components/ui/NoiseBg.tsx`
7. `components/ui/GlitchText.tsx`
8. `components/ui/TerminalText.tsx`
9. `components/ui/SectionLabel.tsx`
10. `components/ui/Navbar.tsx`
11. `components/three/HeroCanvas.tsx`
12. `components/sections/Hero.tsx`
13. `components/sections/About.tsx`
14. `components/sections/Skills.tsx`
15. `components/sections/Projects.tsx`
16. `components/sections/Timeline.tsx`
17. `components/sections/Achievements.tsx`
18. `components/sections/Blog.tsx`
19. `components/sections/EasterEgg.tsx`
20. `components/sections/Contact.tsx`
21. `app/layout.tsx` — assemble providers (Lenis, CustomCursor, NoiseBg)
22. `app/page.tsx` — assemble all sections
23. `app/blog/` — MDX setup + listing + detail pages

---

## QUALITY BAR — DEFINITION OF DONE

Before considering the site complete, verify:
- [ ] Custom cursor works and transforms on hover states
- [ ] Three.js particle field responds to mouse movement
- [ ] Konami code easter egg triggers and is functional
- [ ] All GSAP scroll animations fire correctly (test with Chrome)
- [ ] Lenis smooth scroll is buttery (no jank)
- [ ] Glitch effect on hero name works (3 rapid frames, not jarring)
- [ ] Stats count up from 0 on scroll-enter
- [ ] Timeline draws its line on scroll
- [ ] Contact form inputs have neon focus states
- [ ] Mobile: no broken layouts, no custom cursor, simplified animations
- [ ] Noise grain overlay is present but subtle (≤3% opacity)
- [ ] Page load sequence fires in correct order
- [ ] No layout shift (check CLS in Lighthouse)
- [ ] Dark mode is the only mode (no light mode toggle needed)
- [ ] Blog MDX pipeline works (can add `.mdx` file and it appears)
- [ ] All social links open in `_blank` with `rel="noopener noreferrer"`
- [ ] OG meta tags are set for social sharing preview
- [ ] `prefers-reduced-motion` respected

---

## FINAL INSTRUCTION TO CURSOR

Build this **file by file**, starting from the design system and working up to sections. After each component, confirm it renders before moving to the next. Do not skip the Three.js hero canvas — it is non-negotiable for the visual impact. Do not use any component library (shadcn, MUI, etc.) — build every UI element from scratch using Tailwind + custom CSS. The only exception is Lucide for icons.

The goal: Someone visiting harshit.dev should immediately feel they've encountered something rare — an engineer who thinks in systems and ships in products. Make every interaction prove that.

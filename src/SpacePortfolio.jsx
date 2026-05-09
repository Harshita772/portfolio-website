import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// add these imports
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  ChevronDown,
  Send,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Zap,
  Award,
  Briefcase,
  Menu,
  X,
  Star,
  Trophy,
  ArrowUpRight,
  Sparkles,
  Binary,
  LayoutGrid,
  Database,
  BookOpen,
  Cloud,
} from "lucide-react";

// ─────────────────────────────────────────────
// STAR FIELD CANVAS
// ─────────────────────────────────────────────
function StarCanvas({ scrollY }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const nebulasRef = useRef([]);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Three depth layers of stars
    starsRef.current = Array.from({ length: 380 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 4,
      r: Math.random() * 1.7 + 0.1,
      opacity: Math.random() * 0.8 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.004,
      depth: Math.random() * 0.5 + 0.03, // parallax factor
      color: Math.random() > 0.85 ? "#b8d8ff" : Math.random() > 0.7 ? "#ffe9c0" : "#e8eeff",
    }));

    // Nebula blobs
    nebulasRef.current = [
      { cx: 0.1,  cy: 0.08, rx: 380, ry: 200, r: "34,55,140",  a: 0.13, depth: 0.06 },
      { cx: 0.82, cy: 0.22, rx: 280, ry: 160, r: "88,35,140",  a: 0.11, depth: 0.10 },
      { cx: 0.5,  cy: 0.55, rx: 340, ry: 180, r: "20,65,130",  a: 0.14, depth: 0.05 },
      { cx: 0.88, cy: 0.72, rx: 220, ry: 130, r: "60,20,110",  a: 0.10, depth: 0.09 },
      { cx: 0.18, cy: 0.88, rx: 260, ry: 140, r: "25,55,150",  a: 0.12, depth: 0.07 },
      { cx: 0.65, cy: 1.10, rx: 300, ry: 160, r: "70,30,120",  a: 0.09, depth: 0.08 },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const sy = scrollY.current ?? 0;
      tRef.current += 1;
      const t = tRef.current;

      ctx.clearRect(0, 0, W, H);

      // Deep void gradient
      const bg = ctx.createLinearGradient(0, 0, W * 0.5, H);
      bg.addColorStop(0, "#010409");
      bg.addColorStop(0.4, "#040c1e");
      bg.addColorStop(1,   "#020810");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebulas with parallax
      nebulasRef.current.forEach((n) => {
        const px = n.cx * W;
        const py = n.cy * H - sy * n.depth;
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, n.ry / n.rx);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx);
        g.addColorStop(0,   `rgba(${n.r},${n.a})`);
        g.addColorStop(0.45,`rgba(${n.r},${n.a * 0.55})`);
        g.addColorStop(1,   `rgba(${n.r},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, n.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Stars with parallax + twinkle
      starsRef.current.forEach((s) => {
        const py = s.y - sy * s.depth;
        if (py < -8 || py > H + 8) return;
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const op = s.opacity * twinkle;

        // Halo for brighter stars
        if (s.r > 1.1) {
          const halo = ctx.createRadialGradient(s.x, py, 0, s.x, py, s.r * 5);
          halo.addColorStop(0, `rgba(180,215,255,${op * 0.25})`);
          halo.addColorStop(1, "rgba(180,215,255,0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(s.x, py, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = s.color.replace(")", `,${op})`).replace("rgb", "rgba").replace("#e8eeff", `rgba(232,238,255,${op})`).replace("#b8d8ff", `rgba(184,216,255,${op})`).replace("#ffe9c0", `rgba(255,233,192,${op})`);
        ctx.beginPath();
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// SOLAR FLARE BUTTON
// ─────────────────────────────────────────────
function SolarFlareButton({ children, href }) {
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: e.clientX - r.left, y: e.clientY - r.top });
    setActive(true);
  };

  return (
    <motion.a
      href={href || "#"}
      download
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setActive(false)}
      whileTap={{ scale: 0.95 }}
      className="solar-btn"
    >
      {/* Ambient corona */}
      <span className="solar-corona" />

      {/* Flare burst on hover */}
      <AnimatePresence>
        {active && (
          <>
            <motion.span
              key="flare1"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: origin.x,
                top: origin.y,
                width: 70,
                height: 70,
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, rgba(255,200,100,0.5) 0%, rgba(255,140,40,0.25) 35%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <motion.span
              key="flare2"
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
              style={{
                position: "absolute",
                left: origin.x,
                top: origin.y,
                width: 50,
                height: 50,
                borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                border: "1px solid rgba(255,190,80,0.5)",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Shimmer sweep */}
      <motion.span
        className="solar-shimmer"
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />

      <span className="solar-label">{children}</span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 48, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────
function Typewriter({ lines }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = lines[lineIdx % lines.length];
    let timer;
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), 52);
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), 28);
    } else {
      setDeleting(false);
      setLineIdx((i) => i + 1);
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, lineIdx, lines]);

  const word = lines[lineIdx % lines.length];
  return (
    <span className="typewriter-text">
      {word.slice(0, charIdx)}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects","Experience", "Contact"];

// Simple Icons via jsDelivr CDN — coloured amber to match design
const SI = (slug) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;


// replace your current SKILLS constant with this
const SKILLS = [
  {
    label: "Languages",
    icon: Code2,
    accent: "#5eb8ff",
    items: [
      { name: "JavaScript", icon: SI("javascript") },
      { name: "TypeScript", icon: SI("typescript") },
      { name: "Python", icon: SI("python") },
      { name: "C++", icon: SI("cplusplus") },
      { name: "C", icon: SI("c") },
    ],
  },
  {
    label: "Frontend",
    icon: LayoutGrid,
    accent: "#b48bff",
    items: [
      { name: "React", icon: SI("react") },
      { name: "HTML", icon: SI("html5") },
      { name: "CSS", icon: SI("css3") },
      { name: "Tailwind CSS", icon: SI("tailwindcss") },
      { name: "Next.js", icon: SI("nextdotjs") },
      { name: "Streamlit", icon: SI("streamlit") },
    ],
  },
  {
    label: "Backend & Tools",
    icon: Database,
    accent: "#4dd9a0",
    items: [
      { name: "Node.js", icon: SI("nodedotjs") },
      { name: "Express.js", icon: SI("express") },
      { name: "MongoDB", icon: SI("mongodb") },
      { name: "MySQL", icon: SI("mysql") },
      { name: "Postman", icon: SI("postman") },
      { name: "Arduino", icon: SI("arduino") },
      { name: "Figma", icon: SI("figma") },
    ],
  },
  {
    label: "Libraries",
    icon: BookOpen,
    accent: "#5eb8ff",
    items: [
      { name: "PyTorch", icon: SI("pytorch") },
      { name: "Scikit-learn", icon: SI("scikitlearn") },
      { name: "OpenCV", icon: SI("opencv") },
      { name: "Pandas", icon: SI("pandas") },
      { name: "NumPy", icon: SI("numpy") },
    ],
  },
  {
    label: "DevOps & Cloud",
    icon: Cloud,
    accent: "#b48bff",
    items: [
      { name: "Docker", icon: SI("docker") },
      { name: "GCP", icon: SI("googlecloud") },
      { name: "Git", icon: SI("git") },
    ],
  },
];

const PROJECTS = [
  {
    icon: <Code2 size={22} />,
    accent: "#5eb8ff",
    title: "Image Retreival",
    desc: "Developed an image retrieval system using ML techniques to classify and retrieve similar images from CIFAR-10 dataset. A classification pipeline categorizes input images and performes feature-based similarity search within the predicted class.",
    tags: ["Python", "scikit-learn", "Streamlit", "Torch", "GCP"],
    link: "https://github.com/Harshita772/Image-Retrieval_PRML",
  },
  {
    icon: <Zap size={22} />,
    accent: "#b48bff",
    title: "Typing Speed Test Game",
    desc: "Developed an interactive typing speed test web application allowing users to practice typing skills and measure their performance in real time.",
    tags: ["HTML", "CSS", "Javascript", "Git/GitHub"],
    link: "https://harshita772.github.io/TypingSpeedTest.github.io/",
  },
  {
    icon: <Binary size={22} />,
    accent: "#4dd9a0",
    title: "MIPS Simulator",
    desc: "Designed a MIPS processor simulator in Logisim implementing a single-cycle datapath with core components like ALU, register file, control unit, program counter and memory.",
    tags: ["ARM Assembly", "Logisim", "MIPS",],
    link: "https://github.com/Harshita772/MIPS-Simulator",
  },
];

const ACHIEVEMENTS = [
  { icon: <Code2 size={16} />,    label: "Codeforces",    value: "Specialist · 1400+",   accent: "#5eb8ff" },
  { icon: <Trophy size={16} />,   label: "LeetCode",      value: "Top 17 % globally",     accent: "#fbbf24" },
  { icon: <Award size={16} />,    label: "ICPC",          value: "Regionalist 2024",      accent: "#b48bff" },
  { icon: <Star size={16} />,     label: "JEE Advanced",  value: "AIR 10548",           accent: "#4dd9a0" },
];

const TYPEWRITER_LINES = [
  "Final Year Student at IIT Jodhpur",
  "Aspiring Software Developer",
  "Competitive Programmer",
  "Avid Learner",
];


function CursorTrail() {
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dots = dotsRef.current;
    const positions = Array.from({ length: dots.length }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      let x = mouseRef.current.x;
      let y = mouseRef.current.y;

      positions.forEach((pos, i) => {
        pos.x += (x - pos.x) * 0.35;
        pos.y += (y - pos.y) * 0.35;

        const dot = dots[i];
        if (dot) {
          const scale = 1 - i * 0.08;
          const opacity = 0.55 - i * 0.045;

          dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`;
          dot.style.opacity = Math.max(opacity, 0).toString();
        }

        x = pos.x;
        y = pos.y;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="cursor-trail__dot"
        />
      ))}
    </div>
  );
}


// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function SpacePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrollYRef = useRef(0);
  const { scrollY, scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      scrollYRef.current = v;
      setScrolled(v > 40);
    });
    return unsub;
  }, [scrollY]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.toLowerCase())).filter(Boolean);
  
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
  
        if (visibleSections.length > 0) {
          const id = visibleSections[0].target.id;
          const label = NAV_LINKS.find((link) => link.toLowerCase() === id);
  
          if (label) {
            setActiveSection(label);
          }
        }
      },
      {
        root: null,
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-35% 0px -45% 0px",
      }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    return () => observer.disconnect();
  }, []);
  

  return (
    <div className="portfolio-root">
      {/* ── Canvas BG ── */}
      <StarCanvas scrollY={scrollYRef} />

      <CursorTrail />

      {/* ── Progress bar ── */}
      <motion.div className="progress-bar" style={{ width: progressWidth }} />

      {/* ══ NAVBAR ══ */}
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <div className="navbar__logo">
            <span className="logo-bracket">{"<"}</span>
            <span className="logo-name">HV</span>
            <span className="logo-dot">.dev</span>
            <span className="logo-bracket">{"/>"}</span>
          </div>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <button
                  className={`nav-link ${activeSection === l ? "nav-link--active" : ""}`}
                  onClick={() => scrollTo(l)}
                >
                  {l}
                  <span className="nav-link__underline" />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  className={`mobile-nav-link ${activeSection === l ? "mobile-nav-link--active" : ""}`}
                  onClick={() => scrollTo(l)}
                >
                  {l}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero__inner">
          {/* Status pill */}
          <motion.div
            className="status-pill"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="status-dot" />
            Trying to build cool things with code
          </motion.div>

          {/* Name — main headline */}
          <div className="hero__name-wrap">
            <motion.h1
              className="hero__name"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Harshita Vachhani
            </motion.h1>
          </div>

          {/* Typewriter subtitle */}
          <motion.div
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Typewriter lines={TYPEWRITER_LINES} />
          </motion.div>

          {/* Hook statement */}
          <motion.p
            className="hero__hook"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
          >
            Started with “Hello World”, somehow ended up training models and learning how to optimize my code.
          </motion.p>

          {/* ★ SOLAR FLARE CTA ★ */}
          <motion.div
            className="hero__cta-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <SolarFlareButton href="Harshita_Vachhani_Resume.pdf">
              <Download size={17} />
              Download My Resume
            </SolarFlareButton>
          </motion.div>

          {/* Ghost links */}
          <motion.div
            className="hero__ghost-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <button className="ghost-link" onClick={() => scrollTo("Projects")}>
              View Projects ↓
            </button>
            <span className="ghost-sep" />
            <button className="ghost-link" onClick={() => scrollTo("Contact")}>
              Get In Touch
            </button>
          </motion.div>

          {/* Scroll nudge */}
          <motion.div
            className="scroll-nudge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <span className="scroll-nudge__label">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown size={15} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="section">
        <div className="section__inner">
          <Reveal>
            <span className="section-tag section-tag--blue">About Me</span>
          </Reveal>

          <div className="about-grid">
            <div className="about-grid__text">
              <Reveal delay={0.1}>
                <h2 className="section-title">
                  Engineering through
                  <span className="gradient-text"> Code</span>
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="body-text">
                I’m an Electrical Engineering undergraduate at IIT Jodhpur with a growing interest in software development, 
                system design, and problem solving. What started with curiosity about how computers work gradually turned 
                into building web applications and exploring AI and Blockchain.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="body-text" style={{ marginTop: 14 }}>
                Most of my time goes into writing assignments for college, doom scrolling, and convincing myself that I'll handle
                it at the last minute. I am currently exploring full-stack development and ML, while surviving on caffeine. When 
                I’m not coding, I’m probably thinking about random stuff, watching YouTube, or pretending I’ll finally organize my GitHub repositories someday.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.22} className="about-grid__terminal">
              <div className="terminal-card">
                <div className="terminal-card__bar">
                  <span className="tc-dot tc-dot--red" />
                  <span className="tc-dot tc-dot--yellow" />
                  <span className="tc-dot tc-dot--green" />
                  <span className="tc-title">harshita@iitj ~ $</span>
                </div>
                <div className="terminal-card__body">
                  <p><span className="tc-kw">const</span> <span className="tc-var">me</span> = {"{"}</p>
                  <p className="tc-indent"><span className="tc-key">name</span>: <span className="tc-str">"Harshita Vachhani"</span>,</p>
                  <p className="tc-indent"><span className="tc-key">university</span>: <span className="tc-str">"IIT Jodhpur"</span>,</p>
                  <p className="tc-indent"><span className="tc-key">degree</span>: <span className="tc-str">"B.Tech EE"</span>,</p>
                  <p className="tc-indent"><span className="tc-key">stack</span>: [<span className="tc-str">"Web Dev"</span>, <span className="tc-str">"AI/ML"</span>, <span className="tc-str">"Problem Solving"</span>],</p>
                  <p className="tc-indent"><span className="tc-key">passion</span>: <span className="tc-str">"Fixing Bugs I Created"</span>,</p>
                  <p className="tc-indent"><span className="tc-key">openToWork</span>: <span className="tc-bool">true</span>,</p>
                  <p>{"}"}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      {/* replace your entire SKILLS section with this */}
<section id="skills" className="section">
  <div className="section__inner">
    <Reveal>
      <span className="section-tag section-tag--violet">Technical Skills</span>
    </Reveal>

    <Reveal delay={0.1}>
      <h2 className="section-title">
        What I
        <span className="gradient-text"> Work With</span>
      </h2>
    </Reveal>

    <Reveal delay={0.14}>
      <p className="skills-subtext">
      Technologies and tools I have worked with
      </p>
    </Reveal>

    <div className="skills-layout-top">
      {SKILLS.slice(0, 3).map(({ label, icon: Icon, accent, items }, ci) => (
        <Reveal key={label} delay={ci * 0.1}>
          <motion.div
            className="skill-category-card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.28 }}
            style={{ "--card-accent": accent }}
          >
            <div className="skill-card-glow" />

            <div className="skill-category-card__header">
              <div className="skill-category-icon-wrap">
                <Icon size={18} strokeWidth={2.2} />
              </div>

              <div>
                <span className="skill-category-label">{label}</span>
                {/* <p className="skill-category-caption">Core technologies & frameworks</p> */}
              </div>
            </div>

            <div className="skill-icon-grid">
              {items.map(({ name, icon }) => (
                <motion.div
                  key={name}
                  className="skill-icon-tile"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="skill-icon-bg">
                    <img src={icon} alt={name} className="skill-icon-tile__img" />
                  </div>
                  <span className="skill-icon-tile__name">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>

    <div className="skills-layout-bottom">
      {SKILLS.slice(3).map(({ label, icon: Icon, accent, items }, ci) => (
        <Reveal key={label} delay={0.3 + ci * 0.1}>
          <motion.div
            className="skill-category-card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.28 }}
            style={{ "--card-accent": accent }}
          >
            <div className="skill-card-glow" />

            <div className="skill-category-card__header">
              <div className="skill-category-icon-wrap">
                <Icon size={18} strokeWidth={2.2} />
              </div>

              <div>
                <span className="skill-category-label">{label}</span>
                {/* <p className="skill-category-caption">Development ecosystem</p> */}
              </div>
            </div>

            <div className="skill-icon-grid">
              {items.map(({ name, icon }) => (
                <motion.div
                  key={name}
                  className="skill-icon-tile"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="skill-icon-bg">
                    <img src={icon} alt={name} className="skill-icon-tile__img" />
                  </div>
                  <span className="skill-icon-tile__name">{name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {/* ══ PROJECTS ══ */}
<section id="projects" className="section">
  <div className="section__inner">
    <Reveal>
      <span className="section-tag section-tag--blue">Projects</span>
    </Reveal>

    <Reveal delay={0.08}>
      <h2 className="section-title">
        Things I've <span className="gradient-text">Built</span>
      </h2>
    </Reveal>

    <Reveal delay={0.14}>
      <p className="projects-subtext">
        A few projects across web engineering, machine learning, and computer architecture.
      </p>
    </Reveal>

    <div className="projects-grid">
      {PROJECTS.map(({ icon, accent, title, desc, tags, link }, i) => (
        <Reveal key={title} delay={0.08 + i * 0.1}>
          <motion.a
            href={link}
            target={link === "#" ? undefined : "_blank"}
            rel={link === "#" ? undefined : "noreferrer"}
            className="project-card"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.28 }}
            style={{ "--card-accent": accent }}
          >
            <div className="project-card__glow" />

            <div className="project-card__top">
              <span className="project-card__icon">{icon}</span>
              <span className="project-card__ext">
                <ArrowUpRight size={18} />
              </span>
            </div>

            <h3 className="project-card__title">{title}</h3>
            <p className="project-card__desc">{desc}</p>

            <div className="project-card__tags">
              {tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        </Reveal>
      ))}
    </div>
  </div>
</section>


      {/* ══ EXPERIENCE ══ */}
      <section id="experience" className="section">
        <div className="section__inner">
          <Reveal>
            <span className="section-tag section-tag--amber">Experience &amp; Achievements</span>
          </Reveal>
          <Reveal delay={0.1}>
                <h2 className="section-title">
                  Where I've
                  <span className="gradient-text"> Been</span>
                </h2>
              </Reveal>

          <div className="exp-grid">
            {/* Work */}
            <div>
              <Reveal>
                <p className="sub-section-label">Work Experience</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="exp-card">
                  <div className="exp-card__header">
                    <div className="exp-card__icon-wrap">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="exp-card__role">Software Engineering Intern</p>
                      <p className="exp-card__org">Tech Mahindra · Summer 2026</p>
                    </div>
                  </div>
                  <ul className="exp-card__list">
                    {[
                      "Built RESTful microservices handling 10 000+ daily requests with Node.js & Express.",
                      "Reduced API p95 latency by 28 % through query optimisation and Redis caching.",
                      "Shipped features in agile sprints alongside a distributed team of 12 engineers.",
                      "Authored internal tooling to automate deployment pipelines, saving ~3 hrs/week.",
                    ].map((pt) => (
                      <li key={pt} className="exp-card__bullet">
                        <span className="bullet-arrow">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="exp-card">
                  <div className="exp-card__header">
                    <div className="exp-card__icon-wrap">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="exp-card__role">Undergraduate Researcher</p>
                      <p className="exp-card__org">IIT Jodhpur · Blockchain Research</p>
                    </div>
                  </div>

                  <ul className="exp-card__list">
                    {[
                      "Designed and implemented an election-based blockchain using Directed Acyclic Graphs (DAGs) to enable parallel block creation and improve transaction throughput.",
                      
                      "Implemented a validator-weighted fork selection algorithm (GHOST) for fair and efficient main-chain selection.",
                      
                      "Developed a Fruitchain-inspired reward mechanism to improve validator participation and network incentives.",
                      
                      "Built a governance system for validator management, participation incentives, and secure block finalization.",
                      
                    ].map((pt) => (
                      <li key={pt} className="exp-card__bullet">
                        <span className="bullet-arrow">▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Achievements */}
            <div>
              <Reveal>
                <p className="sub-section-label">Achievements</p>
              </Reveal>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map(({ icon, label, value, accent }, i) => (
                  <Reveal key={label} delay={0.08 + i * 0.08}>
                    <motion.div
                      className="achievement-card"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.25 }}
                      style={{ "--card-accent": accent }}
                    >
                      <span className="achievement-card__icon">{icon}</span>
                      <p className="achievement-card__value">{value}</p>
                      <p className="achievement-card__label">{label}</p>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ══ CONTACT ══ */}
<section id="contact" className="section section--last contact-section">
  <div className="section__inner contact-inner">
  <Reveal>
      <span className="section-tag section-tag--teal">Contact</span>
    </Reveal>
    <Reveal>
      <h2 className="contact-title">
        Get In <span>Touch</span>
      </h2>
    </Reveal>

    <Reveal delay={0.08}>
      <p className="contact-intro">
        Have a question or want to work together? Feel free to reach out!
      </p>
    </Reveal>

    <div className="contact-grid">
      <Reveal delay={0.16}>
        <form
          className="contact-form-card"
          action="mailto:harshitavachhani336@gmail.com"
          method="POST"
          encType="text/plain"
        >
          <label className="contact-field">
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" />
          </label>

          <label className="contact-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="your@email.com" />
          </label>

          <label className="contact-field">
            <span>Message</span>
            <textarea name="message" placeholder="Your message..." rows={6} />
          </label>

          <motion.button
            type="submit"
            className="contact-submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={21} />
            Send Message
          </motion.button>
        </form>
      </Reveal>

      <Reveal delay={0.24} className="contact-connect-wrap">
        <div className="contact-connect">
          <h3>Let’s connect!</h3>

          <div className="contact-socials">
            <motion.a
              href="https://github.com/Harshita772"
              target="_blank"
              rel="noreferrer"
              className="contact-social"
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="GitHub"
            >
              <Github size={25} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/harshita-vachhani-86340a2a0/"
              target="_blank"
              rel="noreferrer"
              className="contact-social"
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={25} />
            </motion.a>

            <motion.a
              href="mailto:harshitavachhani336@gmail.com"
              className="contact-social"
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Email"
            >
              <Mail size={25} />
            </motion.a>
          </div>
        </div>
      </Reveal>
    </div>
  </div>

  {/* Footer */}
  <div className="footer">
    <div className="footer__inner">
      <span className="footer__copy">Thanks for visiting!</span>
      {/* <div className="footer__links">
        <a href="https://github.com/Harshita772" target="_blank" rel="noreferrer" className="footer__icon">
          <Github size={16} />
        </a>
        <a href="https://www.linkedin.com/in/harshita-vachhani-86340a2a0/" target="_blank" rel="noreferrer" className="footer__icon">
          <Linkedin size={16} />
        </a>
        <a href="mailto:harshitavachhani336@gmail.com" className="footer__icon">
          <Mail size={16} />
        </a>
      </div> */}
    </div>
  </div>
</section>

    </div>
  );
}

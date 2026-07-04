import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Button from "../components/Button.jsx";

const GYM_NAME = ["Iron", "Hours"];
const GYM_SUB = "Strength Studio";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* Four even panels. Each slides to its own corner at its own speed.
   `layer` counter-offsets a full-screen inner layer so every panel
   carries its quadrant of the carved name. */
const PANELS = [
  { key: "tl", pos: { left: "-3%", top: "-3%" }, layer: { left: "3vw", top: "3svh" }, dx: -1, dy: -1, speed: 1.0, seam: "right" },
  { key: "tr", pos: { left: "50%", top: "-3%" }, layer: { left: "-50vw", top: "3svh" }, dx: 1, dy: -1, speed: 1.25, seam: "left" },
  { key: "bl", pos: { left: "-3%", top: "50%" }, layer: { left: "3vw", top: "-50svh" }, dx: -1, dy: 1, speed: 1.35, seam: "right" },
  { key: "br", pos: { left: "50%", top: "50%" }, layer: { left: "-50vw", top: "-50svh" }, dx: 1, dy: 1, speed: 0.95, seam: "left" },
];

const CARVE_SHADOW =
  "0 1px 0 rgba(255,255,255,0.10), 0 4px 10px rgba(0,0,0,0.35), inset 0 -2px 4px rgba(0,0,0,0.25)";

function Carving() {
  return (
    <h2
      className="display text-center text-[#1d1d20] text-[clamp(3.2rem,11vw,10rem)] tracking-[0.04em] leading-[0.9]"
      style={{ textShadow: CARVE_SHADOW }}
    >
      {GYM_NAME[0]}
      <br />
      {GYM_NAME[1]}
      <span
        className="block font-mono font-normal text-[0.7rem] tracking-[0.5em] uppercase text-amber/35 mt-4"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.8)", fontStretch: "100%" }}
      >
        {GYM_SUB}
      </span>
    </h2>
  );
}

function Panel({ open, cfg }) {
  const x = useTransform(open, (v) => `${cfg.dx * v * cfg.speed * 72}vw`);
  const y = useTransform(open, (v) => `${cfg.dy * v * cfg.speed * 78}vh`);

  return (
    <motion.div
      style={{ x, y, ...cfg.pos }}
      className="absolute w-[53.5%] h-[53.5%] z-10 overflow-hidden will-change-transform
                 bg-gradient-to-br from-[#343438] via-[#2a2a2d] to-[#232326]
                 shadow-[0_0_0_1px_rgba(0,0,0,0.6)]"
    >
      {/* faint brushed texture */}
      <span
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 5px, rgba(255,255,255,0.012) 5px 6px)",
        }}
      />
      {/* crisp amber seam on the inner vertical edge */}
      <span
        className={`absolute top-0 bottom-0 w-[2px] bg-amber/60 z-20 ${
          cfg.seam === "right" ? "right-0" : "left-0"
        }`}
      />
      {/* this panel's quadrant of the carving */}
      <div
        className="absolute w-screen h-svh flex items-center justify-center pointer-events-none"
        style={cfg.layer}
      >
        <Carving />
      </div>
    </motion.div>
  );
}

export default function Hero({ onStartTraining }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const open = useTransform(scrollYProgress, (p) =>
    easeOutCubic(clamp01((p - 0.06) / 0.7))
  );

  const bgScale = useTransform(open, (v) => 1.12 - v * 0.12);
  const contentOpacity = useTransform(open, (v) => clamp01((v - 0.25) / 0.5));
  const contentScale = useTransform(open, (v) => 0.96 + clamp01((v - 0.25) / 0.5) * 0.04);
  const cueOpacity = useTransform(open, [0.1, 0.2], [1, 0]);
  const seamLX = useTransform(open, (v) => `${-v * 90}vw`);
  const seamRX = useTransform(open, (v) => `${v * 90}vw`);
  const seamOpacity = useTransform(open, (v) => 1 - v);

  /* Reduced motion: skip the pin, show the gym open. */
  if (reduced) {
    return (
      <section id="entrance" className="relative min-h-svh flex items-center justify-center overflow-hidden bg-void">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-[0.72] saturate-[0.9]"
          poster="https://images.unsplash.com/photo-1504364269860-8be73aabdff2?q=80&w=1519&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-void/90 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <p className="signage text-amber mb-6">{GYM_NAME.join(" ")} / {GYM_SUB}</p>
          <h1 className="display text-[clamp(3rem,10vw,9rem)]">Train like<br />you mean it.</h1>
          <p className="mt-6 text-bone/75 max-w-md mx-auto leading-relaxed text-[0.95rem]">
            Custom workout programs built for strength, discipline, and real progress.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <Button onClick={onStartTraining}>Start Training</Button>
            <Button href="#programs" variant="ghost">View Programs</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="entrance" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-void">
        {/* ── Behind the wall: your gym footage ──
            The sample clip is a placeholder for motion.
            Drop your video at /public/hero.mp4 and change src="/hero.mp4". */}
        <div className="absolute inset-0">
          <motion.video
            style={{ scale: bgScale }}
            className="w-full h-full object-cover brightness-[0.72] saturate-[0.9]"
            poster="https://images.unsplash.com/photo-1504364269860-8be73aabdff2?q=80&w=1519&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-void/90 to-transparent" />
        </div>

      
        {/* Revealed content */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-6"
        >
          <p className="signage text-amber mb-6">
            {GYM_NAME.join(" ")} / {GYM_SUB}
          </p>
          <h1 className="display text-[clamp(3rem,10vw,9rem)]">
            Train like
            <br />
            you mean it.
          </h1>
          <p className="mt-6 text-bone/75 max-w-md leading-relaxed text-[0.95rem]">
            Custom workout programs built for strength, discipline, and real
            progress.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <Button onClick={onStartTraining}>Start Training</Button>
            <Button href="#programs" variant="ghost">
              View Programs
            </Button>
          </div>
        </motion.div>

        {/* The four panels */}
        {PANELS.map((cfg) => (
          <Panel key={cfg.key} cfg={cfg} open={open} />
        ))}

        {/* Horizontal seam light, riding out with the panel pairs */}
        <motion.span
          style={{ x: seamLX, opacity: seamOpacity }}
          className="absolute left-0 w-1/2 top-1/2 h-[2px] bg-amber/50 z-[11] pointer-events-none"
        />
        <motion.span
          style={{ x: seamRX, opacity: seamOpacity }}
          className="absolute left-1/2 right-0 top-1/2 h-[2px] bg-amber/50 z-[11] pointer-events-none"
        />

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
          <span className="signage text-ash">Scroll to open</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-9 bg-gradient-to-b from-amber to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

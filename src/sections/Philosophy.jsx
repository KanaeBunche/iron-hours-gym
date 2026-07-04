import { motion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import ZonePlate from "../components/ZonePlate.jsx";

const LINES = [
  "EVERY REP",
  "HAS A PURPOSE.",
  "MOVE WITH INTENTION.",
  "TRAIN WITH DISCIPLINE.",
  "RETURN TOMORROW.",
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative min-h-[220vh] bg-void flex items-center justify-center overflow-hidden"
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-amber/10 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
        <ZonePlate zone="04" label="Training Philosophy" />

        <Reveal delay={0.1}>
          <p className="signage text-amber mt-10">
            More than workouts.
          </p>
        </Reveal>

        {LINES.map((line, index) => (
          <Reveal key={line} delay={0.15 * (index + 1)}>
            <motion.h2
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.9 }}
              className={`display leading-[0.88] tracking-tight
                ${
                  index === LINES.length - 1
                    ? "text-amber"
                    : "text-bone"
                }
                text-[clamp(3rem,10vw,9rem)]
                mt-4`}
            >
              {line}
            </motion.h2>
          </Reveal>
        ))}

        <Reveal delay={0.9}>
          <p className="mt-16 max-w-xl text-ash leading-relaxed text-lg">
            Great training isn't built on motivation.
            It's built on consistency, structure,
            and showing up again tomorrow.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ZonePlate from "../components/ZonePlate.jsx";

const WEIGHTS = [
  { number: "045", label: "Foundation", copy: "Learn the pattern before chasing the load." },
  { number: "135", label: "Control", copy: "Every rep has a standard. Every set has a purpose." },
  { number: "225", label: "Capacity", copy: "Build strength that carries outside the gym." },
  { number: "315", label: "Discipline", copy: "Progress is earned in quiet, repeated hours." },
];

export default function TheRack() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const rackOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const plateX = useTransform(scrollYProgress, [0.1, 0.8], [220, 0]);

  if (reduced) {
    return (
      <section className="rubber px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <ZonePlate zone="03" label="The Rack" />
          <h2 className="display mt-8 text-[clamp(2.5rem,8vw,7rem)]">
            Load the work.
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="programs" className="relative h-[320vh] bg-void">
      <div className="sticky top-0 h-svh overflow-hidden rubber flex items-center justify-center px-6">
        <motion.div
          style={{ opacity: rackOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[min(82vw,980px)] h-[68vh] border-x border-amber/25">
            <div className="absolute top-[18%] left-0 right-0 h-px bg-amber/25" />
            <div className="absolute bottom-[18%] left-0 right-0 h-px bg-amber/15" />

            <motion.div
              style={{ scaleX: barScale }}
              className="absolute top-1/2 left-1/2 w-[82vw] max-w-[1100px] h-[6px] -translate-x-1/2 -translate-y-1/2 bg-bone/80 shadow-[0_0_40px_rgba(236,232,225,0.12)] origin-center"
            />

            <motion.div
              style={{ x: plateX }}
              className="absolute top-1/2 right-[7%] -translate-y-1/2 flex gap-2"
            >
              <span className="w-8 h-48 rounded-sm bg-amber/80" />
              <span className="w-6 h-40 rounded-sm bg-bone/70" />
              <span className="w-5 h-32 rounded-sm bg-ash/70" />
            </motion.div>

            <motion.div
              style={{ x: useTransform(plateX, (v) => -v) }}
              className="absolute top-1/2 left-[7%] -translate-y-1/2 flex gap-2"
            >
              <span className="w-5 h-32 rounded-sm bg-ash/70" />
              <span className="w-6 h-40 rounded-sm bg-bone/70" />
              <span className="w-8 h-48 rounded-sm bg-amber/80" />
            </motion.div>
          </div>
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <ZonePlate zone="03" label="The Rack" />

          <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <div>
              <p className="signage text-amber mb-5">Progressive Load</p>
              <h2 className="display text-[clamp(3rem,10vw,9rem)]">
                Load the
                <br />
                work.
              </h2>
            </div>

            <div className="border border-line bg-panel/70 backdrop-blur-sm rounded-sm p-6">
              {WEIGHTS.map((item) => (
                <div key={item.number} className="grid grid-cols-[80px_1fr] gap-5 py-4 border-b border-line last:border-b-0">
                  <p className="font-mono text-amber text-2xl">{item.number}</p>
                  <div>
                    <h3 className="signage text-bone">{item.label}</h3>
                    <p className="mt-2 text-sm text-ash leading-relaxed">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

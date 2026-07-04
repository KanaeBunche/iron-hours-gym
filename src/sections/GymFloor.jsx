import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import ZonePlate from "../components/ZonePlate.jsx";

const STATIONS = [
  {
    tag: "Station A",
    title: "Strength Training",
    copy: "Barbell fundamentals, progressive overload, and structured lifting blocks. Squat, hinge, press, pull - done right.",
    img: "https://images.unsplash.com/photo-1651911163752-040d6b3f52f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsYWNrJTIwbWFuJTIwaW4lMjBneW18ZW58MHx8MHx8fDA%3D",
  },
  {
    tag: "Station B",
    title: "Conditioning",
    copy: "Engine work that carries over. Intervals, sleds, and circuits built to raise your capacity without wrecking recovery.",
    img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    tag: "Station C",
    title: "Mobility",
    copy: "Positions before load. Daily mobility work targeting hips, shoulders, and ankles so your lifts stop fighting your body.",
    img:"https://images.unsplash.com/photo-1591258370814-01609b341790?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    tag: "Station D",
    title: "Nutrition Guidance",
    copy: "No 1,200-calorie nonsense. Practical fueling built around your training days, your schedule, and food you actually eat.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop",
  },
];

const MARKERS = [
  { left: "12%", label: "Entry" },
  { left: "32%", label: "ST-A" },
  { left: "51%", label: "ST-B" },
  { left: "70%", label: "ST-C" },
  { left: "89%", label: "ST-D" },
];

function StationCard({ s, imgRef }) {
  return (
    <article className="border border-line rounded-md bg-panel overflow-hidden relative flex flex-col h-[min(66vh,620px)]">
      <div className="relative flex-1 overflow-hidden">
        <img
          ref={imgRef}
          src={s.img}
          alt={s.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[35%] brightness-[0.6] scale-[1.15] will-change-transform"
        />
        <span
          className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(226,164,60,0.16), transparent 75%)",
          }}
        />
        <span className="signage absolute top-4 left-4 text-amber bg-void/60 backdrop-blur-sm border border-line px-2.5 py-1.5 rounded-sm">
          {s.tag}
        </span>
      </div>
      <div className="p-6 border-t border-line">
        <h3 className="display text-[clamp(1.3rem,2.4vw,1.9rem)]">{s.title}</h3>
        <p className="mt-2.5 text-sm text-ash leading-relaxed max-w-md">{s.copy}</p>
      </div>
    </article>
  );
}

export default function GymFloor() {
  const reduced = useReducedMotion();
  const runwayRef = useRef(null);
  const trackRef = useRef(null);
  const odoRef = useRef(null);
  const imgRefs = useRef([]);
  const [max, setMax] = useState(0);
  const [litIdx, setLitIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (p) => -p * max);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMax(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // odometer: the floor is "40m" long
    if (odoRef.current) {
      odoRef.current.textContent =
        String(Math.round(p * 40)).padStart(3, "0") + "m";
    }
    // light the marker for the current stretch
    setLitIdx(Math.min(4, Math.floor(p * 5)));
    // parallax: each photo drifts slower than the track
    imgRefs.current.forEach((img) => {
      if (!img) return;
      const r = img.getBoundingClientRect();
      const c = (r.left + r.width / 2 - window.innerWidth / 2) / window.innerWidth;
      img.style.transform = `scale(1.15) translateX(${c * 5}%)`;
    });
  });

  /* Reduced motion: no pin, no walk - a plain vertical list. */
  if (reduced) {
    return (
      <section id="floor" className="rubber py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ZonePlate zone="02" label="Weight Floor" />
          <h2 className="display text-[clamp(2rem,5vw,3.75rem)] mt-8">
            Step onto the floor.
          </h2>
          <div className="mt-12 flex flex-col gap-6">
            {STATIONS.map((s) => (
              <StationCard key={s.tag} s={s} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="floor" ref={runwayRef} className="relative h-[420vh]">
      <div className="sticky top-0 h-svh overflow-hidden rubber">
        {/* odometer */}
        <div className="signage absolute top-6 right-7 z-20 text-ash flex gap-2.5 items-baseline">
          <span>Floor</span>
          <b ref={odoRef} className="font-mono font-medium text-amber text-sm not-italic">
            000m
          </b>
        </div>

        {/* the walk */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="absolute inset-y-0 left-0 flex will-change-transform"
        >
          {/* intro cell */}
          <div className="w-[58vw] min-w-[420px] max-sm:min-w-[88vw] h-svh shrink-0 flex flex-col justify-center px-[7vw]">
            <div>
              <ZonePlate zone="02" label="Weight Floor" />
            </div>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] mt-8">
              Walk the floor.
            </h2>
            <p className="mt-5 text-ash max-w-md leading-relaxed text-[0.95rem]">
              Four stations, in the order you'd hit them. Keep scrolling - the
              page walks you past each one.
            </p>
            <div className="signage mt-10 flex items-center gap-3.5 text-amber">
              <span>This way</span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-px bg-gradient-to-r from-amber to-transparent"
              />
            </div>
          </div>

          {/* station cells */}
          {STATIONS.map((s, i) => (
            <div
              key={s.tag}
              className="w-[72vw] min-w-[560px] max-sm:min-w-[92vw] max-sm:w-[92vw] h-svh shrink-0 flex flex-col justify-center px-[7vw] max-sm:px-[6vw]"
            >
              <StationCard s={s} imgRef={(el) => (imgRefs.current[i] = el)} />
            </div>
          ))}
        </motion.div>

        {/* floor line + station markers */}
        <div className="absolute inset-x-0 bottom-14 h-px bg-white/10 z-10" />
        {MARKERS.map((m, i) => (
          <div
            key={m.label}
            style={{ left: m.left }}
            className="absolute bottom-9 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span
              className={`w-[7px] h-[7px] rounded-full transition-all duration-400 ${
                litIdx === i
                  ? "bg-amber shadow-[0_0_14px_rgba(226,164,60,0.7)]"
                  : "bg-ash"
              }`}
            />
            <span
              className={`signage text-[0.6rem] transition-colors duration-400 ${
                litIdx === i ? "text-amber" : "text-ash"
              }`}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

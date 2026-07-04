import Reveal from "./Reveal.jsx";

/* Gym wayfinding plate:  <ZonePlate zone="02" label="Weight Floor" /> */
export default function ZonePlate({ zone, label }) {
  return (
    <Reveal>
      <div className="inline-flex items-stretch border border-line rounded-sm overflow-hidden bg-panel/60 backdrop-blur-sm">
        <span className="signage px-3 py-2 text-amber border-r border-line bg-amber-dim">
          Zone {zone}
        </span>
        <span className="signage px-3 py-2 text-ash">{label}</span>
      </div>
    </Reveal>
  );
}

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />

      {/* soft amber overhead glow */}
      <div className="absolute -top-[18%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-amber/5 blur-[120px]" />

      {/* faint steel grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* dust particles */}
      <div className="dust absolute inset-0 opacity-[0.18]" />
    </div>
  );
}

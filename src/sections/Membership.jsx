import Reveal from "../components/Reveal.jsx";
import ZonePlate from "../components/ZonePlate.jsx";
import Button from "../components/Button.jsx";

const PLANS = [
  {
    name: "Foundation",
    price: "$149",
    detail: "2 sessions / week",
  },
  {
    name: "Performance",
    price: "$249",
    detail: "4 sessions / week",
  },
  {
    name: "Unlimited",
    price: "$349",
    detail: "Train without limits",
  },
];

export default function Membership({ onStartTraining }) {
  return (
    <section id="membership" className="relative bg-charcoal px-6 py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(226,164,60,0.13),transparent_35%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ZonePlate zone="05" label="Membership" />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center mt-12">
          <Reveal>
            <div>
              <p className="signage text-amber mb-6">Access granted</p>
              <h2 className="display text-[clamp(3rem,8vw,7rem)]">
                Choose your
                <br />
                hours.
              </h2>
              <p className="mt-6 text-ash leading-relaxed max-w-md">
                Simple memberships built around consistent training, real coaching,
                and measurable progress.
              </p>
              <div className="mt-9">
                <Button onClick={onStartTraining}>Start Training</Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 bg-amber/10 blur-3xl" />

              <div className="relative border border-line bg-panel rounded-md p-5 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
                <div className="border border-amber/25 bg-void rounded-sm p-6">
                  <div className="flex items-center justify-between border-b border-line pb-5">
                    <div>
                      <p className="signage text-amber">Iron Hours</p>
                      <h3 className="display text-[clamp(2rem,5vw,4rem)] mt-2">
                        Member Pass
                      </h3>
                    </div>
                    <div className="w-14 h-10 rounded-sm bg-amber/80" />
                  </div>

                  <div className="mt-6 space-y-3">
                    {PLANS.map((plan) => (
                      <div
                        key={plan.name}
                        className="grid grid-cols-[1fr_auto] gap-4 items-center border border-line bg-panel/70 p-4 rounded-sm"
                      >
                        <div>
                          <h4 className="signage text-bone">{plan.name}</h4>
                          <p className="text-sm text-ash mt-1">{plan.detail}</p>
                        </div>
                        <p className="font-mono text-amber text-2xl">
                          {plan.price}
                          <span className="text-xs text-ash">/mo</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs text-ash font-mono uppercase tracking-[0.2em]">
                    <span>Strength Studio</span>
                    <span>NYC / 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

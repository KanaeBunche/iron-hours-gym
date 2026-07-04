import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,164,60,0.10),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="display text-[clamp(3rem,8vw,7rem)] leading-[0.88]"
        >
          IRON
          <br />
          HOURS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="mt-8 max-w-md text-ash text-lg leading-relaxed"
        >
          Train hard.
          <br />
          Leave better.
        </motion.p>

        <div className="mt-20 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="signage text-ash">
            © 2026 Iron Hours
          </p>

          <div className="flex gap-8 signage">
            <a href="#membership" className="text-ash hover:text-amber transition-colors">
              Membership
            </a>

            <a href="#signup" className="text-ash hover:text-amber transition-colors">
              Start Training
            </a>

            <a href="#" className="text-ash hover:text-amber transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

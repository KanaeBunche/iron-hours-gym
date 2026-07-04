import { motion, useReducedMotion } from "framer-motion";

/* Scroll reveal. Wrap anything:  <Reveal delay={0.1}> ... </Reveal> */
export default function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

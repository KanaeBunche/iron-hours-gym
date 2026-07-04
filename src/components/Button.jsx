import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  href = "#",
  onClick,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase rounded-sm transition-colors duration-300 select-none";

  const styles = {
    primary:
      "bg-amber text-void hover:bg-[#f0b653] shadow-[0_0_32px_rgba(226,164,60,0.18)]",
    ghost:
      "border border-line text-bone hover:border-amber/50 hover:text-amber bg-transparent",
  };

  const Tag = onClick ? motion.button : motion.a;

  return (
    <Tag
      href={onClick ? undefined : href}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </Tag>
  );
}

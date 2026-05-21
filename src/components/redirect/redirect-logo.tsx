"use client";

import { motion } from "motion/react";

export function RedirectLogo() {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-extrabold tracking-tight leading-none text-[#F0922A] text-[52px] [text-shadow:0_0_48px_rgba(240,146,42,0.45)]">
        Z
      </span>
      <span className="font-extrabold tracking-tight leading-none text-foreground text-[52px]">
        yraa
      </span>
    </motion.div>
  );
}

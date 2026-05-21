"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

interface RedirectProgressProps {
  navigating?: boolean;
}

export function RedirectProgress({ navigating }: RedirectProgressProps) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    animate(progress, 0.82, { duration: 1.9, ease: [0.4, 0, 0.2, 1] });
  }, [progress]);

  useEffect(() => {
    if (navigating) {
      animate(progress, 1, { duration: 0.35, ease: "easeIn" });
    }
  }, [navigating, progress]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 h-0.5 bg-linear-to-r from-brand/50 via-brand to-brand/50"
      style={{ width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    />
  );
}

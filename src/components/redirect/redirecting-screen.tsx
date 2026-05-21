"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RedirectBg } from "@/components/redirect/redirect-bg";
import { RedirectDots } from "@/components/redirect/redirect-dots";
import { RedirectLogo } from "@/components/redirect/redirect-logo";
import { RedirectProgress } from "@/components/redirect/redirect-progress";

interface RedirectingScreenProps {
  url: string;
  name: string;
}

export function RedirectingScreen({ url, name }: RedirectingScreenProps) {
  const firstName = name.split(" ")[0];
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Let the animation breathe, then fade out and navigate
    const fadeTimer = setTimeout(() => setFading(true), 2000);
    const navTimer = setTimeout(() => {
      window.location.href = url;
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [url]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden relative">
      <RedirectBg />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <RedirectLogo />
        <RedirectDots firstName={firstName} />
      </div>

      <RedirectProgress navigating={fading} />

      {/* Full-screen fade-out overlay that masks the cross-origin navigation */}
      <AnimatePresence>
        {fading && (
          <motion.div
            className="fixed inset-0 z-50 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

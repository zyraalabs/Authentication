"use client";

import { useEffect } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

const CHANNEL = "zyraa-theme";

export function useThemeSync() {
  useEffect(() => {
    applyTheme(readTheme());

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL);
      channel.onmessage = (e: MessageEvent<Theme>) => applyTheme(e.data);
    } catch (_) {}

    return () => channel?.close();
  }, []);
}

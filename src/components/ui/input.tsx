import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-border bg-input px-3.5 text-[13.5px] text-foreground placeholder:text-muted-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

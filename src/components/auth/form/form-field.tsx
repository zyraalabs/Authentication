import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  right?: ReactNode;
  error?: string;
  inputProps: React.ComponentProps<"input">;
}

export function FormField({ label, right, error, inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-foreground">
          {label}
        </label>
        {right}
      </div>
      <Input aria-invalid={!!error} {...inputProps} />
      {error && <p className="text-[11.5px] text-destructive">{error}</p>}
    </div>
  );
}

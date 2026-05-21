"use client";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { AuthHeader } from "./form/auth-header";
import { AuthSwitcher } from "./form/auth-switcher";
import { FormField } from "./form/form-field";
import { FormMessage } from "./form/form-message";

export function ForgotPasswordForm() {
  const { form, onSubmit } = useForgotPassword();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <AuthHeader
        title="Forgot your password?"
        sub="Enter your email and we'll send you a reset link"
      />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          label="Email"
          error={errors.email?.message}
          inputProps={{
            ...register("email"),
            type: "email",
            placeholder: "you@example.com",
          }}
        />

        {errors.root && <FormMessage message={errors.root.message!} isError />}

        <Button
          type="submit"
          variant="brand"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send reset link"}
        </Button>
      </form>

      <AuthSwitcher
        prompt="Remember your password?"
        label="Sign in"
        href="/login"
      />
    </div>
  );
}

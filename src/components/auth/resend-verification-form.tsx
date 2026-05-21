"use client";

import { Button } from "@/components/ui/button";
import { useResendVerification } from "@/hooks/useResendVerification";
import { AuthHeader } from "./form/auth-header";
import { AuthSwitcher } from "./form/auth-switcher";
import { FormField } from "./form/form-field";
import { FormMessage } from "./form/form-message";

export function ResendVerificationForm() {
  const { form, onSubmit, successMessage } = useResendVerification();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <AuthHeader
        title="Verify your email"
        sub="Enter your email and we'll resend the verification link"
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
        {successMessage && (
          <FormMessage message={successMessage} isError={false} />
        )}

        <Button
          type="submit"
          variant="brand"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send verification email"}
        </Button>
      </form>

      <div className="flex flex-col gap-2">
        <AuthSwitcher
          prompt="Already verified?"
          label="Sign in"
          href="/login"
        />
        <AuthSwitcher
          prompt="Don't have an account?"
          label="Create one"
          href="/register"
        />
      </div>
    </div>
  );
}

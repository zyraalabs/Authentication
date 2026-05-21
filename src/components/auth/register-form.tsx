"use client";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { AuthDivider } from "./auth-divider";
import { AuthHeader } from "./form/auth-header";
import { AuthSwitcher } from "./form/auth-switcher";
import { FormField } from "./form/form-field";
import { FormMessage } from "./form/form-message";
import { OAuthButtons } from "./oauth-buttons";

interface RegisterFormProps {
  callbackUrl: string;
}

export function RegisterForm({ callbackUrl }: RegisterFormProps) {
  const { form, onSubmit, successMessage } = useRegister();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <AuthHeader
        title="Create account"
        sub="Start building in under a minute"
      />

      <OAuthButtons callbackUrl={callbackUrl} />
      <AuthDivider />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          label="Name"
          error={errors.name?.message}
          inputProps={{
            ...register("name"),
            type: "text",
            placeholder: "Your name",
          }}
        />
        <FormField
          label="Email"
          error={errors.email?.message}
          inputProps={{
            ...register("email"),
            type: "email",
            placeholder: "you@example.com",
          }}
        />
        <FormField
          label="Password"
          error={errors.password?.message}
          inputProps={{
            ...register("password"),
            type: "password",
            placeholder: "••••••••",
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
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <AuthSwitcher
        prompt="Already have an account?"
        label="Sign in"
        href="/login"
      />
    </div>
  );
}

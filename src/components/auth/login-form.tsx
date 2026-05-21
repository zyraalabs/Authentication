"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { AuthDivider } from "./auth-divider";
import { AuthHeader } from "./form/auth-header";
import { AuthSwitcher } from "./form/auth-switcher";
import { FormField } from "./form/form-field";
import { FormMessage } from "./form/form-message";
import { OAuthButtons } from "./oauth-buttons";

interface LoginFormProps {
  callbackUrl: string;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const { form, onSubmit } = useLogin(callbackUrl);
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <AuthHeader title="Welcome back" sub="Sign in to your Zyraa account" />

      <OAuthButtons callbackUrl={callbackUrl} />
      <AuthDivider />

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
        <FormField
          label="Password"
          error={errors.password?.message}
          right={
            <Link
              href="/forgot-password"
              className="text-[12px] text-brand hover:text-brand-l transition-colors"
            >
              Forgot password?
            </Link>
          }
          inputProps={{
            ...register("password"),
            type: "password",
            placeholder: "••••••••",
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
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <AuthSwitcher
        prompt="Don't have an account?"
        label="Create one"
        href="/register"
      />
    </div>
  );
}

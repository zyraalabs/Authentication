"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type LoginInput, loginSchema } from "@/lib/validations";

type LoginResult = { code: "success" } | { code: "error"; message: string };

async function loginWithCredentials(
  data: LoginInput,
  callbackUrl: string,
): Promise<LoginResult> {
  try {
    const result = await signIn("credentials", {
      ...data,
      callbackUrl,
      redirect: false,
    });

    if (!result || result.error) {
      return {
        code: "error",
        message: result?.error ?? "Invalid credentials.",
      };
    }

    return { code: "success" };
  } catch {
    return { code: "error", message: "Login failed. Please try again." };
  }
}

export function useLogin(callbackUrl: string) {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await loginWithCredentials(data, callbackUrl);

    if (result.code === "success") {
      window.location.href = callbackUrl;
    } else {
      form.setError("root", { message: result.message });
    }
  });

  return { form, onSubmit };
}

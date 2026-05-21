"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import { showToast } from "@/lib/toast";
import {
  type ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations";

interface ForgotPasswordResponse {
  success: boolean;
  data: { message: string };
}

const forgotPassword = requestHandler((data: ForgotPasswordInput) =>
  axiosInstance.post<ForgotPasswordResponse>("/auth/forgot-password", data),
);

export function useForgotPassword() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await forgotPassword(data);

    if (result.code === "success") {
      showToast.success(
        result.data.data.message ?? "Reset link sent! Check your inbox.",
      );
      form.reset();
    } else {
      const message = isAxiosError<{ error?: string }>(result.error)
        ? (result.error.response?.data?.error ?? "Failed to send reset email.")
        : "Network error. Please try again.";
      showToast.error(message);
      form.setError("root", { message });
    }
  });

  return { form, onSubmit };
}

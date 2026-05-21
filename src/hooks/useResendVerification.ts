"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import {
  type ResendVerificationInput,
  resendVerificationSchema,
} from "@/lib/validations";

interface ResendVerificationResponse {
  success: boolean;
  data: { message: string };
  error?: string;
}

const resendVerification = requestHandler((data: ResendVerificationInput) =>
  axiosInstance.post<ResendVerificationResponse>(
    "/auth/resend-verification",
    data,
  ),
);

export function useResendVerification() {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<ResendVerificationInput>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setSuccessMessage("");

    const result = await resendVerification(data);

    if (result.code === "success") {
      setSuccessMessage(
        result.data.data.message ??
          "Verification email sent! Check your inbox.",
      );
      form.reset();
    } else {
      const message = isAxiosError<{ error?: string }>(result.error)
        ? (result.error.response?.data?.error ??
          "Failed to send verification email.")
        : "Network error. Please try again.";
      form.setError("root", { message });
    }
  });

  return { form, onSubmit, successMessage };
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import { type RegisterInput, registerSchema } from "@/lib/validations";

interface RegisterResponse {
  success: boolean;
  data: { message: string };
  error?: string;
}

const register = requestHandler((data: RegisterInput) =>
  axiosInstance.post<RegisterResponse>("/auth/register", data),
);

export function useRegister() {
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setSuccessMessage("");

    const result = await register(data);

    if (result.code === "success") {
      setSuccessMessage(
        result.data.data.message ?? "Account created! Check your email.",
      );
      form.reset();
    } else {
      const message = isAxiosError<{ error?: string }>(result.error)
        ? (result.error.response?.data?.error ?? "Registration failed.")
        : "Network error. Please try again.";
      form.setError("root", { message });
    }
  });

  return { form, onSubmit, successMessage };
}

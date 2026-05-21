"use client";

import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { Suspense, useEffect } from "react";

function SignOutInner() {
  const params = useSearchParams();

  useEffect(() => {
    signOut({ callbackUrl: params.get("callbackUrl") ?? "/" });
  }, [params]);

  return null;
}

export default function SignOutPage() {
  return (
    <Suspense>
      <SignOutInner />
    </Suspense>
  );
}

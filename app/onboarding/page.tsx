"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { useSession } from "@/lib/auth-client";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <OnboardingFlow
      onComplete={() => {
        router.push("/dashboard");
      }}
    />
  );
}


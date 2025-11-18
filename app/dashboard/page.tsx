"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { MainApp } from "@/components/main-app";
import { getProfile } from "@/actions/profile";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (!isPending && !session) {
        router.push("/auth/signin");
        return;
      }

      if (session) {
        const { data: profile } = await getProfile();
        setHasProfile(!!profile);

        if (!profile) {
          router.push("/onboarding");
        }
      }
    };

    checkProfile();
  }, [session, isPending, router]);

  if (isPending || hasProfile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!session || !hasProfile) {
    return null;
  }

  return <MainApp />;
}


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon } from "lucide-react";
import Link from "next/link";

// Deployment on vercel for last commits 12/04/2025 8:42 PM EST

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (session && !isPending) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center starry-bg">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center starry-bg p-4">
      <Card className="w-full max-w-lg border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center moon-glow">
              <Moon className="h-10 w-10 text-slate-100" />
            </div>
            <CardTitle className="text-4xl font-bold lunar-gradient-text mt-4">
              FlowFit
            </CardTitle>
          </Link>
          <CardDescription className="text-lg text-slate-300">
            Your AI-powered fitness companion that flows with your natural
            rhythms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <div className="flex items-center gap-3 p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-lg">
              <span className="text-2xl">🌙</span>
              <p className="text-sm text-left text-slate-200">
                Workouts synced with your menstrual cycle
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-950/50 border border-purple-500/30 rounded-lg">
              <span className="text-2xl">✨</span>
              <p className="text-sm text-left text-slate-200">
                Track hormonal phases and optimize your journey
              </p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-violet-950/50 border border-violet-500/30 rounded-lg">
              <span className="text-2xl">💪</span>
              <p className="text-sm text-left text-slate-200">
                Personalized recommendations based on your goals
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/signup" className="block">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin" className="block">
              <Button
                variant="outline"
                className="w-full border-indigo-500/30 text-slate-200 hover:bg-slate-800"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

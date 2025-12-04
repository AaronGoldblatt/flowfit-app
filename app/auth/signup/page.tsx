"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Moon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to sign up");
      } else {
        toast.success("Account created! Welcome to FlowFit!");
        router.push("/onboarding");
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center starry-bg p-4">
      <Card className="w-full max-w-md border-indigo-500/30 shadow-2xl bg-slate-900/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center moon-glow">
              <Moon className="h-8 w-8 text-slate-100" />
            </div>
          </Link>
          <CardTitle className="text-3xl font-bold lunar-gradient-text">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Start your cycle-synced fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-indigo-500/30 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-indigo-500/30 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="border-indigo-500/30 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500">
                Password must be at least 8 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


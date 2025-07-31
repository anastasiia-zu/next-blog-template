"use client"

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card narrow">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--text-heading)] flex items-center justify-center">Log in</CardTitle>
          <CardDescription className="text-[var(--text-subtle)] flex items-center justify-center">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] placeholder-[var(--input-placeholder)] text-[var(--input-text)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:bg-white/20"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] placeholder-[var(--input-placeholder)] text-[var(--input-text)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:bg-white/20"
            />

            <button
              type="submit"
              className="w-full bg-[var(--btn-bg)] hover:bg-[var(--btn-bg-hover)] text-[var(--btn-text)] p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              Log in
            </button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-[var(--text-subtle)]">
            Don’t have an account?{" "}
            <a href="/signup" className="underline hover:opacity-90 ">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
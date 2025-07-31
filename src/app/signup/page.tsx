"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import bcrypt from "bcryptjs";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await fetch('/api/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: hashedPassword, name })
    });

    if (response.ok) router.push("/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card narrow">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--text-heading)] flex items-center justify-center">Registration</CardTitle>
          <CardDescription className="text-[var(--text-subtle)] flex items-center justify-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] placeholder-[var(--input-placeholder)] text-[var(--input-text)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:bg-white/20"
            />
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
              Register
            </button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-[var(--text-subtle)]">
            Already have an account?{" "}
            <a href="/signin" className="underline hover:opacity-90">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
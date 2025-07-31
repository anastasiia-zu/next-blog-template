"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center glass-card p-10 rounded-xl shadow-lg w-full max-w-[400px]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--btn-bg)]">
          {status === "loading"
            ? "Loading..."
            : session?.user?.name
            ? `Welcome back, ${session.user.name}! 🌸`
            : "Welcome to VibeDiary 🌸"}
        </h1>

        <p className="text-[var(--text-subtle)] text-lg mb-6">
          {session
            ? "Dive into your personalized feed."
            : "Create, explore, and connect with the community."}
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {session ? (
            <Link
              href="/feed"
              className="bg-[var(--btn-bg)] hover:bg-[var(--btn-bg-hover)] text-[var(--btn-text)] px-6 py-2 rounded-lg transition"
            >
              Discover
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="bg-[var(--btn-bg)] hover:bg-[var(--btn-bg-hover)] text-[var(--btn-text)] px-6 py-2 rounded-lg transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="border border-[var(--btn-bg)] text-[var(--btn-bg)] hover:bg-[var(--btn-bg)] hover:text-[var(--btn-text)] px-6 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
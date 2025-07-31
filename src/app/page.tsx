"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl glass-card p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-pink-400">
          {status === "loading"
            ? "Loading..."
            : session?.user?.name
            ? `Welcome back, ${session.user.name}! 🌸`
            : "Welcome to VibeBlog 🌸"}
        </h1>

        <p className="text-muted-foreground text-lg mb-6">
          {session
            ? "Dive into your personalized feed."
            : "Create, explore, and connect with the community."}
        </p>

        <div className="flex justify-center gap-6">
          {session ? (
            <Link
              href="/feed"
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg transition"
            >
              Discover
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-6 py-2 rounded-lg transition"
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
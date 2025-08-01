"use client"

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full px-6 py-4 bg-white/10 dark:bg-white/5 backdrop-blur shadow-sm border-b border-white/10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/feed" className="text-xl font-bold flex items-center gap-2 text-white">
          <span>🌸</span>
          <span>VibeDiary</span>
        </Link>

        <div className="flex items-center gap-4 text-sm text-white">
          <ThemeToggle />

          {status === "authenticated" ? (
            <>
              {/* <Link
                href="/create-post"
                className="hover:underline transition text-white/80 hover:text-white"
              >
                Create Post
              </Link> */}
              <Link
                href="/profile"
                className="hover:underline transition text-white/80 hover:text-white"
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:underline transition text-white/80 hover:text-white"
              >
                Exit
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="hover:underline transition text-white/80 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hover:underline transition text-white/80 hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
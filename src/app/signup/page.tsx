"use client";

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
import Image from "next/image";
import { signIn } from "next-auth/react";

const avatarOptions = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
];

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await fetch('/api/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: hashedPassword,
        name,
        image: selectedAvatar,
      })
    });

    if (response.ok) {
    const loginResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (loginResult?.ok) {
      router.push("/");
    } else {
      console.error("Login after signup failed:", loginResult);
    }
  } else {
    console.error("Registration failed");
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card narrow">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--text-heading)] flex items-center justify-center">
            Registration
          </CardTitle>
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

            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--input-placeholder)]">
                {selectedAvatar ? "Avatar selected" : "No avatar chosen"}
              </p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-sm underline text-[var(--color-3)] hover:text-[var(--color-2)]"
              >
                Choose avatar
              </button>
            </div>

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

      {showModal && (
        <div className="fixed inset-0 bg-[var(--color-3)/70] backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg max-w-md w-full"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--input-border)",
            }}
          >
            <h3 className="mb-4 text-center font-bold text-[var(--btn-bg)]">
              Choose your avatar
            </h3>
            <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
               {avatarOptions.map((src) => (
                  <Image
                  key={src}
                  src={src}
                  alt="avatar option"
                  width={64}
                  height={64}
                  onClick={() => {
                     setSelectedAvatar(src);
                     setShowModal(false);
                  }}
                  className="cursor-pointer rounded-full border-2 transition"
                  style={{
                     borderColor: selectedAvatar === src ? "var(--color-2)" : "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-3)")}
                  onMouseLeave={(e) =>
                     (e.currentTarget.style.borderColor =
                        selectedAvatar === src ? "var(--color-2)" : "transparent")
                  }
                  />
               ))}
            </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 block mx-auto text-sm text-[var(--color-2)] hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
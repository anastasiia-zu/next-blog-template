"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        authorEmail: session?.user?.email,
      }),
    });

    router.refresh();
    setTitle("");
    setContent("");
  }

  return (
    <div className="glass-card w-full p-6 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[var(--text-heading)] flex items-center justify-center">Share your thoughts</h2>

      {!session && (
        <p className="text-sm text-[var(--text-subtle)] mb-2 flex items-center justify-center mb-5">
          Please log in to publish.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] placeholder-[var(--input-placeholder)] text-[var(--input-text)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:bg-white/20"
          disabled={!session}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] placeholder-[var(--input-placeholder)] text-[var(--input-text)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:bg-white/20"
          disabled={!session}
        />

        <button
          type="submit"
          disabled={!session}
          className={`w-full bg-[var(--btn-bg)] hover:bg-[var(--btn-bg-hover)] text-[var(--btn-text)] p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
            !session ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
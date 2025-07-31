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
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="glass-card w-full max-w-400 p-6">
      <h2 className="text-xl font-bold mb-4 text-foreground">Create a Post</h2>

      {!session && (
        <p className="text-sm text-muted-foreground mb-2">
          Please log in to publish.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border border-white/30 bg-white/10 placeholder-white/60 text-white transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/20"
          disabled={!session}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded-lg border border-white/30 bg-white/10 placeholder-white/60 text-white transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/20"
          disabled={!session}
        />

        <button
          type="submit"
          disabled={!session}
          className={`w-full bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-pink-300 ${
            !session ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Publish
        </button>
      </form>
    </div>
  );
}
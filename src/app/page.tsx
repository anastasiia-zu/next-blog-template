import CreatePostWrapper from "@/components/CreatePostWrapper";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-center text-foreground dark:text-pink-200">
          ✨ Feed
        </h1>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass-card transition hover:shadow-xl hover:scale-[1.01] bg-white dark:bg-gray-800"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-1">
                  {post.title}
                </h2>
                <p className="text-base text-muted-foreground mb-3 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Author: {post.author?.name || "unknown"}</span>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-pink-400 hover:text-pink-500 dark:text-pink-300 dark:hover:text-pink-400 font-medium transition"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md mb-60">
          <CreatePostWrapper />
        </div>
      </div>
    </main>
  );
}

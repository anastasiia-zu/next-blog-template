import CreatePostWrapper from "@/components/CreatePostWrapper";
import prisma from "@/lib/prisma";
// import Image from "next/image";
import Link from "next/link";

export default async function FeedPage() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
    take: 10,
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
                  {post.content.length > 300
                    ? `${post.content.slice(0, 300)}...`
                    : post.content}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 shadow-sm">
                      {post.author?.image ? (
                        <img
                          src={post.author.image}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 dark:bg-zinc-700 flex items-center justify-center text-xs text-white font-bold rounded-full">
                          {post.author?.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                      )}
                    </div>
                    <span>{post.author?.name || "unknown"}</span>
                  </div>

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

        <div className="text-center mt-10">
          <Link
            href="/feed/all"
            className="inline-block px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg transition"
          >
            Read more
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <div className="w-full max-w-md sticky top-24">
          <CreatePostWrapper />
        </div>
      </div>
    </main>
  );
}
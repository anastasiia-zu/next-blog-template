import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = Number(params.id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) return notFound();

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto font-serif text-lg text-foreground">
      <div className="relative glass-card p-8 max-w-3xl mx-auto">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-white/40 shadow-md">
            {post.author?.image && (
              <Image
                src={post.author.image}
                alt="avatar"
                width={48}
                height={48}
                className="rounded-full border border-white/30"
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Author: {post.author?.name || "unknown"} ·{" "}
              {post.createdAt.toLocaleString()}
            </div>
          </div>
        </div>

        <article className="leading-relaxed whitespace-pre-line">
          {post.content}
        </article>
      </div>
    </main>
  );
}
import prisma from "@/lib/prisma";
import Image from "next/image";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const postId = Number(params.id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    return <div className="text-center text-lg mt-20">Post not found | 404</div>;
  }

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto font-serif text-lg text-foreground">
      <div className="relative glass-card p-8 max-w-3xl mx-auto">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-white/40 shadow-md">
            {/* <Image
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${post.author?.name || "anon"}`}
              width={64}
              height={64}
              alt="User avatar"
            /> */}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Author: {post.author?.name || "unknown"} · {post.createdAt.toLocaleString()}
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
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
   const posts = await prisma.post.findMany({
      include: {author: true},
      orderBy: {createdAt: 'desc'}
   });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="mb-8 text-bold text-3xl">
         Feed
      </h1>

      {posts?.map(post => (
         <div
         key={post.id}
         className="mb-6 p-4 border rounded-lg"
         >
            <h2 className="text-xl font-semibold">
               {post.title}
            </h2>
            <p className="text-gray-600 mt-2">
               {post.content}
            </p>
            <div className="text-sm mt-4 text-gray-500">
               Author: {' '}
               {post.author?.name || 'unknown'}
            </div>
            
            <Link href={`/posts/${post.id}`}>
            To post
            </Link>
        </div>
      ))}
    </main>
  );
}

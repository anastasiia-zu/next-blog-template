import prisma from "@/lib/prisma";

interface PostPageProps {
  params: {id: string}
};

export default async function PostPage({params}: PostPageProps) {
  const postId = Number(params.id);

  const post = await prisma.post.findUnique({
   where: {id: postId}, include: {author: true}
})

  if (!post) {
   return (<div>Post not found | 404</div>)
  }

  return (
   <main className="max-w-3xl p-4">
      <h1 className="font-bold mb-4">
         {post.title}
      </h1>
      <p className="text-gray-600 mt-2">
         {post.content}
      </p>
      <div className="text-sm mt-4 text-gray-500">
         Author: {' '}
         {post.author?.name || 'unknown'}
      </div>
      <div className="text-xs text-gray-400">
         Created at: {' '}
         {post.createdAt.toLocaleString()}
      </div>
   </main>
  );
};
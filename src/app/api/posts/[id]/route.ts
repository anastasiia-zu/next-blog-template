import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{id:string}>

export async function DELETE( req: NextRequest, context: { params: Params }) {
  const context_id = await context.params;
  const postId = Number(context_id.id);

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(deletedPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Post not found or already deleted" },
      { status: 404 }
    );
  }
}
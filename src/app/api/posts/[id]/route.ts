import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const postId = Number(context.params.id);

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    return NextResponse.json(
      { message: "Post not found or already deleted" },
      { status: 404 }
    );
  }
}
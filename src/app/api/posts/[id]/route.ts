import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);

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
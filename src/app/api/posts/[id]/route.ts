import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE( req: NextRequest ) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const postId = Number(id);

  if (isNaN(postId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

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
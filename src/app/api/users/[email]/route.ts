import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true,
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
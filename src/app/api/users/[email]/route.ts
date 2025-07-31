import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{email:string}>

export async function GET(req: Request, context: { params: Params }) {
  const { email } = await context.params;


  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

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
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { email, image } = await req.json();

  if (!email || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { image },
  });

  return NextResponse.json(updatedUser);
}
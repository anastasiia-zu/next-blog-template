import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
   const { title, authorEmail, content } = await req.json();

   if (!authorEmail) {
      return NextResponse.json({error: 'authorization needed'}, {status: 401});
   }

   const post = await prisma.post.create({
      data: {title, authorEmail, content}
   });

   return NextResponse.json(post);
};
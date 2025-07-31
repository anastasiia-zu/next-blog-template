import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
   const { email, password, name } = await req.json();

   try {
      const user = await prisma.user.create({
         data: {email, password, name}
      })
      return NextResponse.json(user);
   } catch (err) {
      console.error(err);
      return NextResponse.json({message: "user is already exist"}, {status: 400});
   };
};
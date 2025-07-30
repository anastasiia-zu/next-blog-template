"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import bcrypt from "bcryptjs";

export default function SignUp() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');

   const router = useRouter();

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await fetch('/api/signup', {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({email, password: hashedPassword, name})
      });

      if (response.ok) {
         router.push("/signin")
      };
   };

   return (
      <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card">
      <CardHeader>
         <CardTitle className="text-lg text-white">Registration</CardTitle>
         <CardDescription className="text-white/80">
            Create your account to get started
         </CardDescription>
      </CardHeader>

      <CardContent>
         <form onSubmit={handleSubmit} className="space-y-3">
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-lg border border-white/30 bg-white/10 placeholder-white/60 text-white transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/20"
            />
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg border border-white/30 bg-white/10 placeholder-white/60 text-white transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/20"
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-white/30 bg-white/10 placeholder-white/60 text-white transition focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/20"
            />

            <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
            Register
            </button>
         </form>
      </CardContent>

         <CardFooter>
            <p className="text-sm text-white/70">
               Already have an account?{" "}
               <a href="/signin" className="text-white underline hover:text-white/90">
               Log in
               </a>
            </p>
         </CardFooter>
         </Card>
    </div>
  );
};
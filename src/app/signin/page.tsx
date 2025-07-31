"use client"

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function SignIn() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      await signIn("credentials", {email, password, callbackUrl: "/"})
   };

   return (
     <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="glass-card">
         <CardHeader>
            <CardTitle className="text-lg text-white">Log in</CardTitle>
            <CardDescription className="text-white/80">
               Enter your email and password to continue
            </CardDescription>
         </CardHeader>

         <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
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
               Log in
               </button>
            </form>
         </CardContent>

      <CardFooter>
         <p className="text-sm text-white/70">
            Don’t have an account?{" "}
            <a href="/signup" className="text-white underline hover:text-white/90">
            Sign up
            </a>
         </p>
      </CardFooter>
      </Card>
   </div>
  );
};
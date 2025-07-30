"use client"

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";


export default function SignIn() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      await signIn("credentials", {email, password, callbackUrl: "/"})
   };

   return (
      <div className="max-w-md mx-auto p-4">
         <h1 className="mb-4 text-bold text-2xl">
            Log in 
         </h1>

         <form 
         onSubmit={handleSubmit}
         >
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            />

            <button type="submit" className="bg-purple-300 text-white p-2 rounded">
               Log in
            </button>
         </form>
      </div>
   );
};
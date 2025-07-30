"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
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
      <div className="max-w-md mx-auto p-4">
         <h1 className="mb-4 text-bold text-2xl">
            Registration
         </h1>

         <form 
         onSubmit={handleSubmit}
         >
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            />
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
               Register
            </button>
         </form>
      </div>
   );
};
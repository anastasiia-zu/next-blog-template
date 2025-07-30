"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function CreatePost() {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const { data: session } = useSession();

   const router = useRouter();

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      await fetch('/api/posts', {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({title, content, authorEmail: session?.user?.email})
      })

      router.push('/');
   };

   if (!session) {
      return (<div>authorization needed</div>)
   };

   return (
      <div className="max-w-md mx-auto p-4">
         <h1 className="mb-4 text-bold text-2xl">
            New post 
         </h1>

         <form 
         onSubmit={handleSubmit}
         >
            <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            />

            <textarea
            placeholder="description"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-2 mb-4 border rounded h-40"
            />

            <button type="submit" className="bg-green-500 text-white p-2 rounded">
               Publish
            </button>
         </form>
      </div>
   );
};
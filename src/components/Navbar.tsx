"use client"

import { useSession, signOut } from "next-auth/react"
import { Newspaper } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
   const { data: session, status } = useSession();

   return (
      <nav className="p-4">
         <div className="container mx-auto flex justify-between items-center">
            <Link href={'/'} className="text-xl font-bold flex items-center gap-2">
               <Newspaper className="w-6 h-6" />
               <span>Blog</span>
            </Link>

            <div className="flex items-center gap-4">
               <ThemeToggle />

               {status === 'authenticated' ? (
                  <>
                     <Link
                        href={'/create-post'}
                        className="hover:underline text-sm"
                     >
                        Create Post
                     </Link>
                     <button
                        onClick={() => signOut()}
                        className="hover:underline text-sm"
                     >
                        Exit
                     </button>
                  </>
               ) : (
                  <>
                     <Link href="/signin" className="hover:underline text-sm">Sign In</Link>
                     <Link href="/signup" className="hover:underline text-sm">Sign Up</Link>
                  </>
               )}
               {status === "authenticated" && (
                  <Link href="/profile" className="hover:underline text-sm">
                     My Profile
                  </Link>
               )}
            </div>
         </div>
      </nav>
   )
}
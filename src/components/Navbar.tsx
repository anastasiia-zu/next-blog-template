"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
   const {data: session, status} = useSession();

   return (
      <nav className="bg-grey-800 text-white p-4">
         <div className="container mx-auto flex justify-between items-center">
            <Link href={'/'} className="text-xl font-bold">
            Logo
            </ Link>
            <div className="space-x-4 flex">
               {status === 'authenticated' ? (
                  <>
                  <Link href={'/create-post'}>
                   Create post
                  </Link>

                  <button onClick={() => signOut()}>
                   Exit
                  </button>
                  </>
               ) : (
                  <>
                  <Link href={"/signin"}>
                  Sign in
                  </Link>
                  <Link href={"/signup"}>
                  Sign Up
                  </Link>
                  </>
               )}
            </div>
         </div>
      </nav>
   )
};
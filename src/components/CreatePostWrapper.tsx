"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreatePost = dynamic(() => import("@/app/create-post/page"), {
  ssr: false,
});
// const CreatePostForm = dynamic(() => import("./CreatePostForm"), {
//   ssr: false,
// });

export default function CreatePostWrapper() {
  return (
   // <div className="w-full flex justify-center">
   //    <div className="glass-card w-full max-w-md p-6">
         <Suspense fallback={<div>Loading post form...</div>}>
            <CreatePost />
            {/* <CreatePostForm /> */}
         </Suspense>
   //    </div>
   // </div>
  );
}
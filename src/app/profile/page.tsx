"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface UserProfile {
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
  posts: {
    id: number;
    title: string;
    createdAt: string;
  }[];
}

const avatarOptions = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProfile = () => {
    if (session?.user?.email) {
      fetch(`/api/users/${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;

    setDeletingId(id);

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    fetchProfile();
    setDeletingId(null);
  };

  if (status === "loading" || loading) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  if (!session || !profile) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Please log in to view your profile.
      </p>
    );
  }

   const handleSelectAvatar = async (newImage: string) => {
   if (!session?.user?.email) return;

   await fetch("/api/users/avatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, image: newImage }),
   });

   setShowModal(false);
   fetchProfile();
   };

  return (
    <div className="glass-card w-full max-w-2xl p-8 mx-auto mt-12 text-foreground bg-[var(--background)] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>

      <div className="flex flex-col items-center gap-4">
        {profile.image ? (
         <button onClick={() => setShowModal(true)}>
            <Image
               src={profile.image}
               alt="avatar"
               width={96}
               height={96}
               className="rounded-full border-2 border-pink-300"
            />
         </button>
         ) : (
         <button
            onClick={() => setShowModal(true)}
            className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white"
         >
            {profile.name?.charAt(0).toUpperCase() || "?"}
         </button>
         )}

         {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
               <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
                  <h3 className="mb-4 text-center font-bold">Choose your avatar</h3>
                  <div className="grid grid-cols-3 gap-4">
                  {avatarOptions.map((src) => (
                     <Image
                        key={src}
                        src={src}
                        alt="avatar option"
                        width={64}
                        height={64}
                        onClick={() => handleSelectAvatar(src)}
                        className="cursor-pointer rounded-full border-2 hover:border-pink-400"
                     />
                  ))}
                  </div>
                  <button
                  onClick={() => setShowModal(false)}
                  className="mt-6 block mx-auto text-sm text-muted-foreground hover:underline"
                  >
                  Cancel
                  </button>
               </div>
            </div>
            )}

        <div className="text-center">
          <p className="text-lg font-semibold">
            {profile.name || "Anonymous"}
          </p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Joined: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <hr className="my-6 border-muted" />

      <div>
        <h3 className="text-lg font-semibold mb-3">Posts</h3>
        {profile.posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven’t created any posts yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {profile.posts.map((post) => (
              <li
                key={post.id}
                className="p-4 rounded-md bg-white/10 backdrop-blur border border-white/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-base font-medium underline hover:text-pink-400"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-xs text-red-400 hover:text-red-500"
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "Deleting..." : "Delete"}
                    </button>

                    <Link
                      href={`/edit/${post.id}`}
                      className="text-xs text-blue-400 hover:text-blue-500"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
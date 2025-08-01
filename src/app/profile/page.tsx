"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import FlowerLoader from "@/components/FlowerLoader";
import { X, Pencil, Settings } from 'lucide-react';

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

  if (status === "loading" || loading) {
    return <FlowerLoader />;
  }

  if (!session || !profile) {
    return (
      <p className="text-center text-sm" style={{ color: "var(--color-2)" }}>
        Please log in to view your profile.
      </p>
    );
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    setDeletingId(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchProfile();
    setDeletingId(null);
  };

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
    <div className="glass-card w-full max-w-2xl p-8 mx-auto mt-12 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--color-3)" }}>
        {(profile.name ? profile.name.charAt(0).toUpperCase() + profile.name.slice(1) : "User")}’s Profile
      </h2>

      <div className="flex flex-col items-center gap-4 relative">
        {profile.image ? (
          <Image
            src={profile.image}
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full border-2 shadow-lg"
            style={{ borderColor: "var(--color-3)" }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--btn-text)",
              border: "1px solid var(--input-border)",
            }}
          >
            {profile.name?.charAt(0).toUpperCase() || "?"}
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="absolute top-0 right-0 p-2 rounded-full shadow-md transition"
          style={{
            backgroundColor: "var(--btn-bg)",
            color: "var(--btn-text)",
          }}
          title="Edit profile"
        >
          <Settings size={16} className="cursor-pointer"/>
        </button>

        <div className="text-center">
          <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            {profile.name || "Anonymous"}
          </p>
          <p className="text-sm" style={{ color: "var(--color-5)" }}>{profile.email}</p>
          <p className="text-xs mt-1" style={{ color: "var(--color-5)" }}>
            Joined: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <hr className="my-6" style={{ borderColor: "var(--input-border)" }} />

      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          {(profile.name ? profile.name.charAt(0).toUpperCase() + profile.name.slice(1) : "User")}’s diary
        </h3>

        {profile.posts.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-5)" }}>
            You haven’t created any posts yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {profile.posts.map((post) => (
              <li
                key={post.id}
                className="p-4 rounded-md border"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      href={`/posts/${post.id}`}
                      className="font-medium underline"
                      style={{ color: "var(--foreground)" }}
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs" style={{ color: "var(--color-5)" }}>
                      Created: {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="hover:underline text-sm"
                      style={{ color: deletingId === post.id ? "var(--color-2)" : "var(--btn-text)" }}
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "Deleting..." : <X width={25} height={25} className="cursor-pointer hover:text-red-400 transition-colors duration-200"/>}
                    </button>
                    <Link href={`/edit/${post.id}`} style={{ color: "var(--color-3)" }}>
                      <Pencil width={20} height={20} className="mt-[2px]" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-var(--color-3)/70 backdrop-blur-md flex items-center justify-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--input-border)",
            }}
          >
            <h3 className="mb-4 text-center font-bold" style={{ color: "var(--foreground)" }}>
              Choose your avatar
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {avatarOptions.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt="avatar option"
                  width={64}
                  height={64}
                  onClick={() => handleSelectAvatar(src)}
                  className="cursor-pointer rounded-full border-2 transition"
                  style={{
                    borderColor: "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                />
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 block mx-auto text-sm hover:underline"
              style={{ color: "var(--color-2)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
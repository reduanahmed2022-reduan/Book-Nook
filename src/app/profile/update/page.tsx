
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }

    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Profile update failed");
        return;
      }

      toast.success("Profile successfully updated!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-2xl font-bold">
          Update Profile
        </h1>

        <p className="mb-6 text-sm text-base-content/60">
          Update your personal information.
        </p>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={session.user.email}
              readOnly
              className="input input-bordered w-full"
            />
            <p className="mt-1 text-xs text-base-content/50">
              Email cannot be changed here.
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Profile Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

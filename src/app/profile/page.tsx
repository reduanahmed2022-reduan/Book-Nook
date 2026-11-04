
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-emerald-700">
          Loading Profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-[#102a27]">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your BookNook account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="bg-[#102a27] px-6 py-10 text-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={100}
                height={100}
                unoptimized
                className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-4xl font-bold text-emerald-800">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <h2 className="mt-4 text-2xl font-bold text-white">
              {user.name || "BookNook User"}
            </h2>

            <p className="mt-1 text-sm text-emerald-200">
              BookNook Member
            </p>
          </div>

          <div className="space-y-5 p-6 md:p-8">

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Full Name
              </label>
              <p className="mt-2 rounded-lg bg-slate-50 p-4 font-medium text-[#102a27]">
                {user.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Email Address
              </label>
              <p className="mt-2 break-all rounded-lg bg-slate-50 p-4 font-medium text-[#102a27]">
                {user.email}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Account Status
              </label>
              <p className="mt-2 rounded-lg bg-emerald-50 p-4 font-semibold text-emerald-700">
                Active Member
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">

              <Link
                href="/profile/update"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Update Profile
              </Link>

              <Link
                href="/"
                className="rounded-full bg-[#102a27] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Back to Home
              </Link>

              <Link
                href="/books"
                className="rounded-full border border-[#102a27] px-6 py-3 text-sm font-bold text-[#102a27] transition hover:bg-emerald-50"
              >
                Explore Books
              </Link>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

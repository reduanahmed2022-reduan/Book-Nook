
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";


const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    setProfileOpen(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const links = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
     <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102a27] text-2xl text-emerald-300 shadow-md transition group-hover:bg-emerald-800">
            📚
          </div>

          <div>
            <h1 className="text-[25px] font-extrabold tracking-tight text-[#102a27]">
              BookNook
            </h1>
            <p className="text-[9px] font-bold tracking-[0.22em] text-slate-500">
              YOUR ONLINE LIBRARY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-full border border-slate-200 p-1.5 pr-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                aria-expanded={profileOpen}
                aria-label="Open user menu"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={38}
                    height={38}
                    unoptimized
                    className="h-[38px] w-[38px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-bold text-[#102a27]">
                  {user.name || "My Account"}
                </span>

                <span className="text-xs text-slate-500">▼</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="font-bold text-[#102a27]">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-3 text-sm font-bold text-[#102a27] transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#102a27] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
         <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-[#102a27] transition hover:bg-emerald-50 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button> 

        {/* <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-[#102a27] transition hover:bg-emerald-50 md:hidden"
      aria-label="Toggle menu"
    >
      {menuOpen ? "✕" : "☰"}
    </button> */}
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100" />

            {isPending ? (
              <p className="px-4 py-3 text-sm text-slate-500">
                Loading...
              </p>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={42}
                      height={42}
                      unoptimized
                      className="h-[42px] w-[42px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-bold text-[#102a27]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex-1 rounded-full border border-[#102a27] py-3 text-center text-sm font-bold text-[#102a27]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="flex-1 rounded-full bg-[#102a27] py-3 text-center text-sm font-bold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

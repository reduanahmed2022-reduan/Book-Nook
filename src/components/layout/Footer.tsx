import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#102a27] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-emerald-300">
              BookNook
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Discover books, explore knowledge and enjoy your reading journey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <Link href="/">Home</Link>
              <Link href="/books">Books</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <p className="mt-3 text-sm text-white/60">
              Welcome to BookNook Library.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
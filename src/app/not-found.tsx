import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-8xl font-extrabold text-emerald-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        Page Not Found!
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Sorry, the page you are looking for does not exist
        or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
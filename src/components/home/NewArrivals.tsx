
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  totalCopies: number;
  availableCopies?: number;
};

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/backend/books?limit=8");

        if (!response.ok) {
          throw new Error("Could not load books");
        }

        const result = await response.json();

        const bookList = Array.isArray(result)
          ? result
          : result.books || result.data || [];

        setBooks(bookList.slice(0, 8));
      } catch {
        setError("Books could not be loaded. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="bg-[#fafbf9] px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Fresh From Our Library
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102a27] md:text-4xl">
              New Arrivals
            </h2>
            {/* এখানে mx-auto যোগ করা হয়েছে যাতে প্যারাগ্রাফটি একদম মাঝখানে থাকে */}
            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
              Explore the latest additions to our collection and discover
              something wonderful to read.
            </p>
          </div>
          <div className="flex justify-start">
      <Link
        href="/books"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-700 px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-700 hover:text-white"
      >
        See All Books <span>→</span>
      </Link>
    </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                <div className="aspect-[3/4] w-full animate-pulse bg-slate-200" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">
            {error}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-4xl">📚</p>
            <h3 className="mt-4 text-xl font-bold text-[#102a27]">
              No Books Available Yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              New books will appear here when they are added to our library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.slice(0, 8).map((book) => (
              <article
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Book Image with controlled aspect ratio so it doesn't get too big */}
                <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-slate-100">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">
                      📖
                    </div>
                  )}

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-emerald-800 shadow">
                    {book.category}
                  </span>
                </div>

                {/* Book Information */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-1 text-base font-bold text-[#102a27]">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    By {book.author}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Available Copies: {book.availableCopies ?? book.totalCopies}
                  </p>

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/books/${book._id}`}
                      className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#102a27] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
                    >
                      View Details <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
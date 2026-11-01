
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Book = {
//   _id: string;
//   title: string;
//   author: string;
//   category: string;
//   image?: string;
//   totalCopies: number;
// };

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function AllBooksPage() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch(`${API_URL}/books?limit=20`);

//         if (!response.ok) {
//           throw new Error("Could not load books");
//         }

//         const result = await response.json();

//         const bookList = Array.isArray(result)
//           ? result
//           : result.books || result.data || [];

//         setBooks(bookList.slice(0, 20));
//       } catch {
//         setError("Books could not be loaded. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#fafbf9] px-4 py-12 sm:px-6">
//       <div className="mx-auto max-w-7xl">

//         <div className="mb-10 text-center">
//           <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
//             Explore Our Library
//           </p>

//           <h1 className="mt-3 text-3xl font-extrabold text-[#102a27] sm:text-4xl">
//             All Books
//           </h1>

//           <p className="mt-3 text-slate-500">
//             Discover and explore books from our collection.
//           </p>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {Array.from({ length: 20 }).map((_, index) => (
//               <div key={index} className="overflow-hidden rounded-2xl bg-white">
//                 <div className="h-64 animate-pulse bg-slate-200" />
//                 <div className="space-y-3 p-5">
//                   <div className="h-5 animate-pulse rounded bg-slate-200" />
//                   <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="rounded-xl bg-red-50 p-8 text-center text-red-700">
//             {error}
//           </div>
//         ) : books.length === 0 ? (
//           <div className="rounded-xl bg-white p-12 text-center">
//             <p className="text-5xl">📚</p>
//             <h2 className="mt-4 text-xl font-bold text-[#102a27]">
//               No Books Available
//             </h2>
//             <p className="mt-2 text-slate-500">
//               No books have been added yet.
//             </p>
//           </div>
//         ) : (
//           <>
//             <p className="mb-6 text-sm font-medium text-slate-500">
//               Showing {books.length} books
//             </p>

//             <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//               {books.map((book) => (
//                 <article
//                   key={book._id}
//                    className="group w-full min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
//                 >
//                   {/* <div className="h-64 overflow-hidden bg-slate-100">
//                     {book.image ? (
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                       /> */}

//                   <div className="h-64 overflow-hidden bg-slate-100">
//                     {book.image ? (
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex h-full items-center justify-center text-6xl">
//                         📖
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-1 flex-col p-2">
//                     <span className="mb-2 w-fit rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
//                       {book.category}
//                     </span>

//                     <h2 className="text-lg font-bold text-[#102a27]">
//                       {book.title}
//                     </h2>

//                     <p className="mt-2 text-sm text-slate-500">
//                       By {book.author}
//                     </p>

//                     <p className="mt-2 text-sm text-slate-500">
//                       Available Copies: {book.totalCopies}
//                     </p>

//                     <Link
//                       href={`/books/${book._id}`}
//                       className="mt-auto pt-5"
//                     >
//                       <span className="flex w-full justify-center rounded-xl bg-[#102a27] px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800">
//                         View Details →
//                       </span>
//                     </Link>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }



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
  availableCopies: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books?limit=20`);

        if (!response.ok) {
          throw new Error("Could not load books");
        }

        const result = await response.json();

        const bookList = Array.isArray(result)
          ? result
          : result.books || result.data || [];

        setBooks(bookList.slice(0, 20));
      } catch {
        setError("Books could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafbf9] px-2 py-10 sm:px-4">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Explore Our Library
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#102a27] sm:text-4xl">
            All Books
          </h1>

          <p className="mt-3 text-slate-500">
            Discover and explore books from our collection.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white">
                <div className="aspect-[3/4] w-full animate-pulse bg-slate-200" />
                <div className="space-y-2 p-2">
                  <div className="h-4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-8 text-center text-red-700">
            {error}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center">
            <p className="text-5xl">📚</p>
            <h2 className="mt-4 text-xl font-bold text-[#102a27]">
              No Books Available
            </h2>
            <p className="mt-2 text-slate-500">
              No books have been added yet.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm font-medium text-slate-500">
              Showing {books.length} books
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <article
                  key={book._id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Book Image - aspect-[3/4] and object-cover used here */}
                  <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-slate-100">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        📖
                      </div>
                    )}
                  </div>

                  {/* Book Information */}
                  <div className="flex flex-1 flex-col p-2">
                    <span className="mb-2 w-fit rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {book.category}
                    </span>

                    <h2 className="line-clamp-1 text-sm font-bold text-[#102a27]">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      By {book.author}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                     Available Copies: {book.availableCopies ?? book.totalCopies}
                    </p>

                    <Link
                      href={`/books/${book._id}`}
                      className="mt-3 block w-full rounded-lg bg-[#102a27] px-2 py-2 text-center text-xs font-bold text-white transition hover:bg-emerald-800"
                    >
                      View Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}


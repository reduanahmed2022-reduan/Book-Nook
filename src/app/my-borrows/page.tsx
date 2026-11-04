
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage?: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

export default function MyBorrowsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState<string | null>(null);

  const user = session?.user;

  // Load borrowed books
  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchBorrows = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/backend/borrows", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Could not load borrowed books.");
        }

        const data = await response.json();
        setBorrows(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [user, isPending, router]);

  // Return borrowed book
  const handleReturn = async (borrowId: string) => {
    try {
      setReturningId(borrowId);

      const response = await fetch(
        `/api/backend/borrows/${borrowId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book.");
      }

      setBorrows((previousBorrows) =>
        previousBorrows.filter(
          (borrow) => borrow._id !== borrowId
        )
      );

      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || loading || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafbf9] px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-extrabold text-[#102a27] sm:text-3xl">
            My Borrows
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your borrowed books and return them when finished.
          </p>
        </div>

        {/* Borrow Count */}
        <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-800 sm:text-base">
            Total Borrowed Books: {borrows.length}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && borrows.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center sm:py-16">
            <p className="text-5xl sm:text-6xl">📚</p>

            <h2 className="mt-5 text-lg font-bold text-[#102a27] sm:text-xl">
              No Borrowed Books
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You have not borrowed any books yet.
            </p>

            <button
              onClick={() => router.push("/books")}
              className="mt-6 rounded-lg bg-[#102a27] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:text-base"
            >
              Explore Books
            </button>
          </div>
        )}

        {/* Mobile & Tablet Card Layout */}
        {borrows.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
            {borrows.map((borrow) => (
              <div
                key={borrow._id}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                {/* Book Image */}
                <div className="flex h-28 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:h-32 sm:w-24">
                  {borrow.bookImage ? (
                    <img
                      src={borrow.bookImage}
                      alt={borrow.bookTitle}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl">📖</span>
                  )}
                </div>

                {/* Book Information */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="line-clamp-2 text-base font-bold text-[#102a27] sm:text-lg">
                    {borrow.bookTitle}
                  </h2>

                  <div className="mt-3 space-y-2 text-xs text-slate-600 sm:text-sm">
                    <p>
                      <span className="font-semibold text-slate-700">
                        Borrowed:
                      </span>{" "}
                      {borrow.borrowDate}
                    </p>

                    <p>
                      <span className="font-semibold text-slate-700">
                        Return Date:
                      </span>{" "}
                      {borrow.returnDate}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReturn(borrow._id)}
                    disabled={returningId !== null}
                    className="mt-auto w-full rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  >
                    {returningId === borrow._id
                      ? "Returning..."
                      : "Return Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop Table Layout */}
        {borrows.length > 0 && (
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#102a27] text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold">
                      Book Image
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold">
                      Book Title
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold">
                      Borrow Date
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold">
                      Return Date
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {borrows.map((borrow) => (
                    <tr
                      key={borrow._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex h-20 w-16 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                          {borrow.bookImage ? (
                            <img
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-3xl">📖</span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[220px] font-semibold text-[#102a27]">
                          {borrow.bookTitle}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {borrow.borrowDate}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {borrow.returnDate}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleReturn(borrow._id)}
                          disabled={returningId !== null}
                          className="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {returningId === borrow._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

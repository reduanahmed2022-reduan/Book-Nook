
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

type Book = {
    _id: string;
    title: string;
    author: string;
    category: string;
    image?: string;
    description: string;
    totalCopies: number;
    availableCopies?: number;
    userName: string;
    userEmail: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BookDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const id = params.id as string;

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [borrowing, setBorrowing] = useState(false);

    const user = session?.user;

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${API_URL}/books/${id}`);

                if (!response.ok) {
                    throw new Error("Book not found");
                }

                const data = await response.json();
                setBook(data);
            } catch {
                setError("Book details could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    const availableCopies =
        book?.availableCopies ?? book?.totalCopies ?? 0;

    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
    });

    const tomorrow = new Date(
        new Date(`${today}T00:00:00+06:00`).getTime() + 24 * 60 * 60 * 1000
    )
        .toLocaleDateString("en-CA", {
            timeZone: "Asia/Dhaka",
        });

    const openBorrowModal = () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setShowModal(true);
    };

    const handleBorrow = async () => {
        if (!book || !user || !returnDate) {
            toast.error("Please select a return date.");
            return;
        }

        if (returnDate <= today) {
            toast.error("Return date must be after today.");
            return;
        }

        try {
            setBorrowing(true);

            const response = await fetch(`${API_URL}/borrows`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: book._id,
                    bookTitle: book.title,
                    bookImage: book.image || "",
                    borrowDate: today,
                    returnDate,
                }),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || "Borrow failed");
            }

            toast.success("Book borrowed successfully!");
            setShowModal(false);
            setReturnDate("");

            // Reload updated book availability
            const updatedResponse = await fetch(`${API_URL}/books/${id}`);

            if (updatedResponse.ok) {
                const updatedBook = await updatedResponse.json();
                setBook(updatedBook);
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setBorrowing(false);
        }
    };

    if (isPending || loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-emerald-600" />
            </main>
        );
    }

    if (error || !book) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <p className="text-5xl">📚</p>
                <h2 className="mt-4 text-2xl font-bold text-[#102a27]">
                    Book Not Found
                </h2>
                <p className="mt-2 text-slate-500">
                    {error || "This book does not exist."}
                </p>
                <Link
                    href="/books"
                    className="mt-6 rounded-lg bg-[#102a27] px-5 py-3 text-white"
                >
                    Back to All Books
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafbf9] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-6xl">

                <Link
                    href="/books"
                    className="mb-6 inline-block text-sm font-semibold text-emerald-700 hover:underline"
                >
                    ← Back to All Books
                </Link>

                <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">

                    {/* Book Image */}
                    <div className="flex min-h-[350px] items-center justify-center bg-slate-100 p-6 sm:min-h-[450px]">
                        {book.image ? (
                            <img
                                src={book.image}
                                alt={book.title}
                                className="h-[350px] w-full object-contain sm:h-[420px]"
                            />
                        ) : (
                            <span className="text-8xl">📖</span>
                        )}
                    </div>

                    {/* Book Information */}
                    <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">

                        <span className="mb-4 w-fit rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                            {book.category}
                        </span>

                        <h1 className="text-2xl font-extrabold text-[#102a27] sm:text-3xl lg:text-4xl">
                            {book.title}
                        </h1>

                        <p className="mt-3 text-slate-500">
                            By <span className="font-semibold text-[#102a27]">{book.author}</span>
                        </p>

                        <div className="my-6 border-t border-slate-200" />

                        <h2 className="text-lg font-bold text-[#102a27]">
                            Book Description
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            {book.description}
                        </p>

                        <div className="my-6 space-y-4 rounded-xl bg-slate-50 p-4">

                            <div className="flex justify-between gap-3">
                                <span className="text-sm text-slate-500">
                                    Added By
                                </span>
                                <span className="text-right text-sm font-semibold text-[#102a27]">
                                    {book.userName}
                                </span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span className="text-sm text-slate-500">
                                    Available Copies
                                </span>
                                <span className="text-sm font-bold text-emerald-700">
                                    {availableCopies}
                                </span>
                            </div>

                        </div>

                        {availableCopies > 0 ? (
                            <button
                                onClick={openBorrowModal}
                                className="w-full rounded-xl bg-[#102a27] px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
                            >
                                Borrow This Book
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full cursor-not-allowed rounded-xl bg-slate-300 px-5 py-3 font-bold text-slate-600"
                            >
                                Not Available
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {/* Borrow Modal */}
            {showModal && user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-7">

                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#102a27]">
                                Borrow This Book
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                disabled={borrowing}
                                className="text-2xl text-slate-500 hover:text-red-500"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-600">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    value={user.name || ""}
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-600">
                                    User Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email || ""}
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-600">
                                    Borrow Date
                                </label>
                                <input
                                    type="date"
                                    value={today}
                                    readOnly
                                    className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-600">
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    min={tomorrow}
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                                />
                            </div>

                        </div>

                        <button
                            onClick={handleBorrow}
                            disabled={borrowing || !returnDate}
                            className="mt-6 w-full rounded-xl bg-[#102a27] px-5 py-3 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {borrowing ? "Processing..." : "Confirm Borrow"}
                        </button>

                    </div>
                </div>
            )}
        </main>
    );
}

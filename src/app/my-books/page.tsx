
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function MyBooksPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const [deleteBookId, setDeleteBookId] = useState<string | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
        totalCopies: 1,
    });

    const user = session?.user;

    // Load books added by the logged-in user
    useEffect(() => {
        if (isPending) return;

        if (!user) {
            router.push("/login");
            return;
        }

        const fetchMyBooks = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${API_URL}/books`);

                if (!response.ok) {
                    throw new Error("Failed to load books.");
                }

                const data = await response.json();

                const myBooks = data.filter(
                    (book: Book) => book.userEmail === user.email
                );

                setBooks(myBooks);
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Could not load your books."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyBooks();
    }, [user, isPending, router]);

    // Open edit modal
    const handleEdit = (book: Book) => {
        setEditingBook(book);

        setFormData({
            title: book.title,
            author: book.author,
            category: book.category,
            image: book.image || "",
            description: book.description,
            totalCopies: book.totalCopies,
        });
    };

    // Update form fields
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: name === "totalCopies" ? Number(value) : value,
        }));
    };

    // Update book
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingBook) return;

        try {
            setSaving(true);

            const response = await fetch(
                `${API_URL}/books/${editingBook._id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update book.");
            }

            setBooks((previous) =>
                previous.map((book) =>
                    book._id === editingBook._id
                        ? { ...book, ...formData }
                        : book
                )
            );

            toast.success("Book updated successfully!");
            setEditingBook(null);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete book
    const handleDelete = async (bookId: string) => {
        try {
            const response = await fetch(
                `${API_URL}/books/${bookId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete book.");
            }

            setBooks((previous) =>
                previous.filter((book) => book._id !== bookId)
            );

            toast.success("Book deleted successfully!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        }
    };

    if (isPending || loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-emerald-600" />
            </main>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#102a27]">
                            My Books
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Manage the books you have added.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/add-book")}
                        className="rounded-lg bg-[#102a27] px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                    >
                        + Add New Book
                    </button>
                </div>

                <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">Total books added</p>
                    <h2 className="mt-1 text-3xl font-bold text-[#102a27]">
                        {books.length}
                    </h2>
                </div>

                {books.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                        <p className="text-5xl">📚</p>
                        <h2 className="mt-4 text-xl font-bold text-slate-800">
                            You have not added any books yet.
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Add your first book to see it here.
                        </p>
                        <button
                            onClick={() => router.push("/add-book")}
                            className="mt-5 rounded-lg bg-[#102a27] px-5 py-3 text-white"
                        >
                            Add Book
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                            >
                                <div className="flex h-56 items-center justify-center bg-slate-100 p-4">
                                    {book.image ? (
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-6xl">📖</span>
                                    )}
                                </div>

                                <div className="p-5">
                                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                        {book.category}
                                    </span>

                                    <h2 className="mt-3 text-xl font-bold text-[#102a27]">
                                        {book.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        By {book.author}
                                    </p>

                                    <p className="mt-3 text-sm text-slate-600">
                                        Total Copies: {book.totalCopies}
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        Available Copies:{" "}
                                        {book.availableCopies ??
                                            book.totalCopies}
                                    </p>

                                    <div className="mt-5 flex gap-3">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="flex-1 rounded-lg border border-emerald-700 px-4 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                setDeleteBookId(book._id)
                                            }
                                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteBookId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-slate-800">
                            Delete Book?
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Are you sure you want to delete this book?
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteBookId(null)}
                                className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    const bookId = deleteBookId;
                                    setDeleteBookId(null);
                                    await handleDelete(bookId);
                                }}
                                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Book Modal */}
            {editingBook && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
                    <div className="my-4 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl bg-white p-4 sm:p-5 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-[#102a27]">
                                Edit Book
                            </h2>

                            <button
                                onClick={() => setEditingBook(null)}
                                className="text-2xl text-slate-500 hover:text-red-600"
                                aria-label="Close edit form"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Book Title
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Author
                                </label>
                                <input
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Category
                                </label>
                                <input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Image URL
                                </label>
                                <input
                                    name="image"
                                    type="url"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Total Copies
                                </label>
                                <input
                                    name="totalCopies"
                                    type="number"
                                    min="1"
                                    value={formData.totalCopies}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                                />
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => setEditingBook(null)}
                                    className="flex-1 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 rounded-lg bg-[#102a27] px-5 py-3 font-semibold text-white disabled:opacity-60"
                                >
                                    {saving ? "Updating..." : "Update Book"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

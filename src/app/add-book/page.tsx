
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";


const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    totalCopies: "1",
  });

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/backend/books", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalCopies: Number(formData.totalCopies),
          userName: user.name,
          userEmail: user.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
        totalCopies: "1",
      });

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-[#102a27] sm:text-4xl">
            Add a New Book
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Book Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Category and Copies */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Total Copies *
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  min="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Book Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste your book image URL"
                className="input input-bordered w-full"
              />
              <p className="mt-1 text-xs text-slate-400">
                Upload your image to an image hosting service and paste its URL here.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the book..."
                rows={4}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 gap-5 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-500">
                  Added By
                </label>
                <input
                  type="text"
                  value={user.name || ""}
                  readOnly
                  className="input input-bordered w-full bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-500">
                  User Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full bg-white"
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] shadow-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding Book...</span>
                </>
              ) : (
                <span>Add Book</span>
              )}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

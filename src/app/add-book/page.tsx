

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

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

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
    <main className="min-h-screen bg-[#f7faf8] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3 inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              BookNook Library
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#102a27] sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Share your favorite books with the BookNook community
            and help others discover their next great read.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(16,42,39,0.05)]">

          <div className="h-1.5 bg-emerald-700" />

          <div className="p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Book Title */}
              <div>
                <label htmlFor="title" className={labelClass}>
                  Book Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  className={inputClass}
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className={labelClass}>
                  Author Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="author"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className={inputClass}
                  required
                />
              </div>

              {/* Category and Copies */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="category" className={labelClass}>
                    Category <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
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
                  <label htmlFor="totalCopies" className={labelClass}>
                    Total Copies <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="totalCopies"
                    type="number"
                    name="totalCopies"
                    min="1"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className={labelClass}>
                  Book Image URL
                </label>

                <input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/book-image.jpg"
                  className={inputClass}
                />

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Upload your book cover to an image hosting service
                  and paste the image URL here.
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelClass}>
                  Short Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about the book..."
                  rows={5}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              {/* User Information */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-[#102a27]">
                    Contributor Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your account information is added automatically.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label htmlFor="userName" className={labelClass}>
                      Added By
                    </label>

                    <input
                      id="userName"
                      type="text"
                      value={user.name || ""}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="userEmail" className={labelClass}>
                      User Email
                    </label>

                    <input
                      id="userEmail"
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 outline-none"
                    />
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-700/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-base"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>

                    Adding Book...
                  </>
                ) : (
                  <>
                    Add Book
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                Fields marked with * are required.
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}


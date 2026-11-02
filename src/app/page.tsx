
import type { Metadata } from "next";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover, borrow and explore your favorite books at BookNook Online Library.",
};

const categories = [
  {
    name: "Fiction",
    description: "Discover unforgettable stories and imagination.",
    icon: "📖",
  },
  {
    name: "Science",
    description: "Explore discoveries, technology and knowledge.",
    icon: "🔬",
  },
  {
    name: "History",
    description: "Travel through time and explore our past.",
    icon: "🏛️",
  },
  {
    name: "Kids",
    description: "Wonderful reading experiences for young minds.",
    icon: "🧸",
  },
  {
    name: "Others",
    description: "Find something new and interesting to read.",
    icon: "📚",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore Books",
    description:
      "Browse our growing collection and discover books that match your interests.",
    icon: "🔎",
  },
  {
    number: "02",
    title: "Borrow Your Book",
    description:
      "Choose an available book and confirm your borrowing request.",
    icon: "📕",
  },
  {
    number: "03",
    title: "Read & Return",
    description:
      "Enjoy your reading journey and return the book when you finish.",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbf9]">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Welcome Section */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Welcome to BookNook
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#102a27] md:text-5xl">
            A Place Where Every Book
            <span className="text-emerald-700"> Has a Story</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
            Reading opens the door to new ideas, knowledge and imagination.
            Explore our online library, discover interesting books and make
            reading a part of your everyday life.
          </p>

          <Link
            href="/books"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#102a27] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-800"
          >
            Explore Our Library <span>→</span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <NewArrivals />

      {/* Explore Categories */}
      <section className="bg-white px-4 py-20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Explore Your Interests
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#102a27] md:text-4xl">
              Browse by Categories
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
              Find your next favorite book from our different reading
              categories.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="/books"
                className="group rounded-2xl border border-slate-100 bg-[#fafbf9] p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm transition group-hover:bg-emerald-100">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#102a27]">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-emerald-700">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Borrowing Works */}
      <section className="bg-[#102a27] px-4 py-20 text-white md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Simple Reading Journey
            </p>

            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              How BookNook Works
            </h2>

            <p className="mt-5 leading-7 text-white/65">
              Getting your favorite book is simple. Follow three easy steps
              and enjoy your reading experience.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{step.icon}</span>

                  <span className="text-4xl font-extrabold text-emerald-300/40">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold">{step.title}</h3>

                <p className="mt-4 leading-7 text-white/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 to-[#102a27] px-7 py-14 text-center text-white md:px-16 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            Your Next Chapter Starts Here
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold md:text-4xl">
            Ready to Discover Your Next Favorite Book?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
            Explore our collection and start your reading journey with BookNook.
          </p>

          <Link
            href="/books"
            className="mt-8 inline-flex rounded-full bg-emerald-400 px-8 py-4 text-sm font-bold text-[#102a27] transition hover:bg-emerald-300"
          >
            Browse All Books →
          </Link>
        </div>
      </section>
    </main>
  );
}

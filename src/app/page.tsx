
import HeroSlider from "@/components/home/HeroSlider";

const categories = [
  { name: "Fiction", icon: "📖", description: "Stories and imagination" },
  { name: "Science", icon: "🔬", description: "Explore new discoveries" },
  { name: "History", icon: "🏛️", description: "Learn from the past" },
  { name: "Kids", icon: "🧸", description: "Books for young readers" },
  { name: "Others", icon: "📚", description: "More to explore" },
];

const steps = [
  {
    number: "01",
    title: "Discover Books",
    description: "Explore our collection and find books that interest you.",
  },
  {
    number: "02",
    title: "Borrow a Book",
    description: "Choose an available book and confirm your borrowing.",
  },
  {
    number: "03",
    title: "Enjoy & Return",
    description: "Enjoy reading and return the book when you finish.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbf9] text-slate-900">
      <HeroSlider />

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            About BookNook
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            A Little Space for Big Ideas
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            BookNook brings readers and books together. Discover your next
            favorite read, borrow books and share the joy of knowledge.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                Find Your Interest
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Explore Categories
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-500">
              From fascinating stories to useful knowledge, choose a category
              and start exploring.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-slate-100 bg-[#fafbf9] p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <span className="text-4xl">{category.icon}</span>
                <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals placeholder for database integration */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Fresh From Our Library
          </p>
          <h2 className="mt-3 text-3xl font-bold">New Arrivals</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            Discover the latest books added to our library.
          </p>
          <p className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
            Latest 6 books will appear here from the MongoDB database.
          </p>
          <a
            href="/books"
            className="mt-7 inline-flex rounded-full bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            See All Books →
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#102a27] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
              Simple & Easy
            </p>
            <h2 className="mt-3 text-3xl font-bold">How BookNook Works</h2>
            <p className="mt-4 text-white/60">
              Three simple steps to enjoy your reading journey.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <span className="text-4xl font-bold text-emerald-300">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/65">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

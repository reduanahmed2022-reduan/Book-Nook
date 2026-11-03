
// "use client";

// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// const slides = [
//   {
//     eyebrow: "WELCOME TO BOOKNOOK",
//     title: "Every Book Opens a New World.",
//     description:
//       "Discover inspiring stories, explore new ideas and find your next favorite book in our growing online library.",
//     button: "Explore Books",
//     number: "01",
//     bg: "from-[#102a27] via-[#17483d] to-[#0b2528]",
//   },
//   {
//     eyebrow: "EXPLORE. READ. GROW.",
//     title: "Knowledge Begins With Reading.",
//     description:
//       "Explore fiction, science, history and more. There is always something new waiting for curious minds.",
//     button: "Discover Collection",
//     number: "02",
//     bg: "from-[#17243c] via-[#243c5d] to-[#101a30]",
//   },
//   {
//     eyebrow: "SHARE THE LOVE OF READING",
//     title: "Borrow a Book. Build a Better Habit.",
//     description:
//       "Borrow books for a few days, enjoy your reading journey and return them for the next reader.",
//     button: "Browse Library",
//     number: "03",
//     bg: "from-[#3b2921] via-[#704a35] to-[#251b19]",
//   },
// ];

// export default function HeroSlider() {
//   return (
//     <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         slidesPerView={1}
//         loop
//         autoplay={{
//           delay: 4500,
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }}
//         className="booknook-slider overflow-hidden rounded-3xl"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.number}>
//             <div
//               className={`relative min-h-[490px] overflow-hidden bg-gradient-to-br ${slide.bg} px-7 py-16 text-white md:min-h-[540px] md:px-16 md:py-20`}
//             >
//               {/* Decorative circles */}
//               <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />
//               <div className="absolute -right-5 -top-10 h-60 w-60 rounded-full border border-white/10" />
//               <div className="absolute -bottom-40 right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

//               <div className="relative z-10 flex min-h-[350px] max-w-3xl flex-col justify-center">
//                 <span className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-emerald-300">
//                   <span className="h-px w-9 bg-emerald-300" />
//                   {slide.eyebrow}
//                 </span>

//                 <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
//                   {slide.title}
//                 </h1>

//                 <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
//                   {slide.description}
//                 </p>

//                 <div className="mt-9">
//                   <Link
//                     href="/books"
//                     className="inline-flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-4 text-sm font-bold text-[#102a27] transition hover:bg-emerald-300"
//                   >
//                     {slide.button}
//                     <span aria-hidden="true">→</span>
//                   </Link>
//                 </div>
//               </div>

//               <span className="absolute bottom-8 right-9 text-6xl font-bold text-white/10 md:text-8xl">
//                 {slide.number}
//               </span>

//               <div className="absolute right-16 top-1/2 hidden -translate-y-1/2 rotate-6 lg:block">
//                 <div className="flex h-64 w-48 items-center justify-center rounded-r-xl rounded-l-md border-l-8 border-emerald-300 bg-gradient-to-br from-[#e8dfc7] to-[#b9a989] p-5 shadow-2xl">
//                   <div className="flex h-full w-full flex-col justify-between border border-[#75654c]/40 p-4 text-center text-[#344238]">
//                     <span className="text-xs tracking-[0.3em]">BOOKNOOK</span>
//                     <div>
//                       <span className="text-4xl">✦</span>
//                       <p className="mt-3 text-xl font-bold">THE ART OF READING</p>
//                     </div>
//                     <span className="text-[10px] tracking-widest">
//                       DISCOVER • LEARN • GROW
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }



"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    eyebrow: "WELCOME TO BOOKNOOK",
    title: "Every Book Opens a New World.",
    description:
      "Discover inspiring stories, explore new ideas and find your next favorite book in our growing online library.",
    button: "Explore Books",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85",
  },
  {
    eyebrow: "EXPLORE. READ. GROW.",
    title: "Knowledge Begins With Reading.",
    description:
      "Explore fiction, science, history and more. There is always something new waiting for curious minds.",
    button: "Discover Collection",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2000&q=85",
  },
  {
    eyebrow: "SHARE THE LOVE OF READING",
    title: "Borrow a Book. Build a Better Habit.",
    description:
      "Borrow books for a few days, enjoy your reading journey and return them for the next reader.",
    button: "Browse Library",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="booknook-slider overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.number}>
            <div
              className="relative flex min-h-[430px] items-center overflow-hidden bg-cover bg-center px-6 py-14 text-white sm:min-h-[480px] sm:px-10 md:min-h-[540px] md:px-16"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(7, 25, 23, 0.94) 0%, rgba(7, 25, 23, 0.78) 50%, rgba(7, 25, 23, 0.30) 100%), url("${slide.image}")`,
              }}
            >
              {/* Decorative Overlay */}
              <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />
              <div className="absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 max-w-3xl">
                <span className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-emerald-300 sm:text-xs sm:tracking-[0.25em]">
                  <span className="h-px w-8 bg-emerald-300" />
                  {slide.eyebrow}
                </span>

                <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:mt-6 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                <div className="mt-7 sm:mt-9">
                  <Link
                    href="/books"
                    className="inline-flex items-center gap-3 rounded-full bg-emerald-400 px-6 py-3 text-xs font-bold text-[#102a27] shadow-lg transition hover:bg-emerald-300 sm:px-7 sm:py-4 sm:text-sm"
                  >
                    {slide.button}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Slide Number */}
              <span className="absolute bottom-5 right-6 text-5xl font-bold text-white/20 sm:bottom-8 sm:right-9 sm:text-7xl md:text-8xl">
                {slide.number}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}






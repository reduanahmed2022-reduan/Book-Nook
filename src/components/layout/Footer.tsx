
// import Link from "next/link";
// import { BookOpen, Mail, Phone } from "lucide-react";
// import { SiX, SiGithub, SiFacebook } from "react-icons/si";

// export default function Footer() {
//   return (
//     <footer className="bg-[#102a27] text-white">
//       <div className="mx-auto max-w-7xl px-6 py-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

//          {/* BookNook Brand */}
// <div>
//   <Link href="/" className="group inline-flex items-center gap-3">
//     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-xl text-[#102a27] shadow-md transition group-hover:bg-emerald-300">
//       📚
//     </div>

//     <h2 className="text-2xl font-extrabold tracking-tight text-white">
//       BookNook
//     </h2>
//   </Link>

//   <p className="mt-3 max-w-xs text-xs leading-6 text-white/60">
//     Discover books, explore knowledge and enjoy your reading journey.
//   </p>
// </div>


//           {/* Contact Us */}
//           <div>
//             <h3 className="mb-3 text-sm font-semibold text-emerald-300">
//               Contact Us
//             </h3>

//             <div className="flex flex-col gap-3 text-xs text-white/60">
//               <a
//                 href="tel:+8801XXXXXXXXX"
//                 className="flex items-center gap-2 transition hover:text-emerald-300"
//               >
//                 <Phone size={15} />
//                 +880 1700000000
//               </a>

//               <a
//                 href="mailto:your-email@gmail.com"
//                 className="flex items-center gap-2 transition hover:text-emerald-300"
//               >
//                 <Mail size={15} />
//                reduanahmed2022@gmail.com
//               </a>
//             </div>
//           </div>

//           {/* Follow Us */}
//           <div>
//             <h3 className="mb-3 text-sm font-semibold text-emerald-300">
//               Follow Us
//             </h3>

//             <div className="flex items-center gap-3">
//               {/* X */}
//               <a
//                 href="https://x.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="X"
//                 className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm font-bold transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
//               >
//                 X
//               </a>

//               {/* GitHub */}
//               <a
//                 href="https://github.com/reduanahmed2022-reduan"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="GitHub"
//                 className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
//               >
//                 <SiGithub size={17} />
//               </a>

//               {/* Facebook */}
//               <a
//                 href="https://facebook.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
//               >
//                 <SiFacebook size={17} />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 border-t border-white/10 pt-4 text-center text-xs text-white/40">
//           © {new Date().getFullYear()} BookNook. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }




import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SiX, SiGithub, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#102a27] text-white">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6">

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">

          {/* BookNook Brand */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-xl text-[#102a27] shadow-md transition group-hover:bg-emerald-300">
                📚
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                BookNook
              </h2>
            </Link>

            <p className="mt-3 max-w-xs text-xs leading-6 text-white/60">
              Discover books, explore knowledge and enjoy your reading journey.
            </p>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Contact Us
            </h3>

            <div className="flex flex-col items-center gap-3 text-xs text-white/60 sm:items-start">
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 transition hover:text-emerald-300"
              >
                <Phone size={15} />
                +880 1700000000
              </a>

              <a
                href="mailto:reduanahmed2022@gmail.com"
                className="flex items-center gap-2 transition hover:text-emerald-300"
              >
                <Mail size={15} />
                reduanahmed2022@gmail.com
              </a>
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Follow Us
            </h3>

            <div className="flex items-center gap-3">

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
              >
                <SiX size={16} />
              </a>

              <a
                href="https://github.com/reduanahmed2022-reduan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
              >
                <SiGithub size={17} />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#102a27]"
              >
                <SiFacebook size={17} />
              </a>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-white/40">
          © {new Date().getFullYear()} BookNook. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
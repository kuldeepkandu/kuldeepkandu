'use client'

import Link from "next/link";
import { forwardRef, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSplitHoverAnimation } from "@/hooks/useSplitHoverAnimation";
import { useTransitionRouter } from "next-view-transitions";
import ContactModal from "@/components/contact/ContactModal";
import CircularSocial from "../circularSocials/CircularSocial";
import Divider from '../divider/Divider';
import { usePathname } from "next/navigation";
import { FiMessageCircle } from "react-icons/fi";
import Image from "next/image";
import Resume from "../resume/Resume";


const Menu = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Work", href: "/work" },
  // { text: "Contact", href: "/contact" },
];

const Navbar = ({
  logo = "/Assets/Logo/logo.png",
  logo1 = "/Assets/Logo/logo1.png",
}) => {

  const pathname = usePathname();

  const router = useTransitionRouter();

  function slideInOut() {
    try {
      document.documentElement.animate(
        [
          { opacity: 1, scale: 1, transform: "translateY(0)" },
          { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        }
      );

      document.documentElement.animate(
        [
          { transform: "translateY(100%)" },
          { transform: "translateY(0)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch (err) {
      // fallback: a simple, safe CSS class toggle could be used instead
      // console.warn('view-transition animation failed', err);
    }
  }

  const { containerRef: navRef } = useSplitHoverAnimation("letter", 0.04);
  const { containerRef: overlayRef } = useSplitHoverAnimation("letter", 0.04);
  const [open, setOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="w-full sticky top-0 z-50 backdrop-blur-sm text-slate-600 flex items-center justify-between px-6 md:px-20 h-10 md:py-8"
      >
        {/* Logo */}
        <Link
          onClick={(e) => {
            e.preventDefault();
            router.push("/", {
              onTransitionReady: slideInOut,
            });
          }}
          className="font-sarif text-lg md:text-xl font-bold uppercase"
          href={"/"}
        >
          <div className="w-8 md:w-10 h-10 flex items-center justify-center md:pt-1 pt-3">
            <Image
              src={logo}
              alt="Kuldeep Logo"
              width={50}
              height={40}
              priority
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-16 text-sm py-2 px-6 text-lg font-semibold backdrop-blur-sm bg-black/10 text-gray-600 border rounded-full mt-4">
          {Menu.map(({ text, href }, idx) => {
            const isActive = pathname === href;
            return (
              <li key={idx}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(href, {
                      onTransitionReady: slideInOut,
                    });
                  }}
                  href={href}
                  className={`hoverTextSplit ${isActive ? "bg-gray-200" : "hover:bg-gray-200"} px-2 py-1 rounded-full transition-colors  dark:text-red-500`}>
                  {text}
                </Link>

              </li>
            )
          }
          )}
        </ul>

        <ul className="hidden md:flex text-sm py-2 px-6 text-black mt-4">
          <li>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 text-slate-600 hover:bg-gray-800/10 transition-colors rounded-full">
              <FiMessageCircle size={30} className="hover:scale-110 transition-all duration-300" />
            </button>
          </li>
        </ul>


<div className="md:hidden">
<Resume />
</div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
        >
          <HiMenuAlt3 />
        </button>
      </nav>



      {/* MOBILE MENU OVERLAY */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 backdrop-blur-md transition-all duration-300 md:hidden flex
    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        {/* BOX */}
        <div
          className="
      fixed inset-0
      min-h-screen
      flex flex-col
      justify-between
      bg-gradient-to-b from-black via-black to-gray-900
      px-5 py-6
      text-center
      shadow-2xl
      overflow-hidden

      sm:inset-auto
      sm:left-1/2 sm:top-1/2
      sm:-translate-x-1/2 sm:-translate-y-1/2
      sm:min-h-0
      sm:w-[90%] sm:max-w-2xl
      sm:rounded-3xl
      sm:py-8
    "
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="w-6" />
            <div className="flex-cols justify-center items-center">
               <button
                onClick={() => {
                  setOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="py-1 text-lg font-semibold text-white hover:text-gray-300 transition-colors cursor-pointer animate-bounce"
              >
                <FiMessageCircle size={30} className="" />
              </button>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-light">
                Welcome
              </p>
             
              
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close Menu"
              className="text-white text-xl hover:rotate-90 transition-transform duration-300 hover:text-gray-400"
            >
              <GiTireIronCross />
            </button>
          </div>

          <Divider />

          {/* Intro */}
          <div className="space-y-2">


            {/* <h2 className="text-xl font-bold text-white">
              Kuldeep Kumar
            </h2> */}

            {/* <p className="text-xs text-gray-400 font-light">
              Full-Stack Developer & UI/UX Designer
            </p> */}
          </div>

          {/* <Divider /> */}

          {/* Menu */}
          <ul className="flex flex-col gap-2">
            {Menu.map(({ text, href }, idx) => (
              <li key={idx}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="hoverTextSplit block py-1 text-lg font-semibold text-white hover:text-gray-300 transition-colors"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          <Divider />

          {/* Social */}
          <div className="space-y-3">
            <div className="flex justify-center mt-2 mb-2">
              <CircularSocial variant="mobile" />
            </div>
          </div>

          <Divider />

          {/* Footer */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              Made with <span className="text-red-500">❤️</span> by{" "}
              <span className="font-medium text-gray-400">Kuldeep</span>
            </p>
            <p>&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>



      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>

  );
};

export default Navbar;

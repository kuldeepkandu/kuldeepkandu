"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { FaArrowRight } from "react-icons/fa";

interface ProjectCardItem {
  id?: number | string;
  title?: string;
  thumbnail?: string;
  href?: string;
  link?: string;
}

const ProjectCard = ({ items }: { items: ProjectCardItem[] }) => {
  const router = useTransitionRouter();

  const slideInOut = () => {
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
        },
      );

      document.documentElement.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (err) {
      // fallback
    }
  };

  return (
    <div className="w-full max-w-6xl p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
      {items.map((item) => {
        const targetHref = item.id ? `/work/${item.id}` : "/work";

        return (
          <Link
            key={item.id}
            href={targetHref}
            onClick={(e) => {
              e.preventDefault();
              router.push(targetHref, {
                onTransitionReady: slideInOut,
              });
            }}
            className="group rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 md:hover:-translate-y-1 md:hover:shadow-xl"
          >
            <div className="relative w-full h-56 sm:h-60 md:h-64 lg:h-64 xl:h-72 overflow-hidden">
              <Image
                src={item.thumbnail || "/placeholder.jpg"}
                alt={item.title || "Project"}
                fill
                className="object-cover transition duration-700 ease-out md:group-hover:scale-105 md:group-hover:brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between">
                <p className="text-xs sm:text-sm tracking-wide font-medium text-white/95">
                  View Project
                </p>
                <span className="h-8 w-8 rounded-full bg-white/90 text-black flex items-center justify-center text-base leading-none">
                  <FaArrowRight />
                </span>
              </div>
            </div>
            <div className="px-4 sm:px-5 py-4 sm:py-5">
              <h1 className="text-black text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight line-clamp-2">
                {item.title || "Untitled Project"}
              </h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectCard;

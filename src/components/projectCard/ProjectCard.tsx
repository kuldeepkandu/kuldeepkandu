"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";

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
    <div className="w-full p-4 grid grid-cols-1 gap-6">
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
            className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105"
          >
            <div className="mb-4 px-1">
              <h1 className="text-black font-base text-4xl sm:text-2xl lg:text-4xl z-10">
                {item.title}
              </h1>
            </div>
            <div className="relative w-full h-60 sm:h-72 lg:h-64">
              <Image
                src={item.thumbnail || "/placeholder.jpg"}
                alt={item.title || "Project"}
                fill
                className="object-cover group-hover:brightness-90 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectCard;

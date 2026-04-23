"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Card from "../cards/Card";
import { HiOutlineMap } from "react-icons/hi";
import { BsBoundingBox, BsWindowSplit } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const Skills = [
  {
    number: "01",
    title: "Full Stack Development",
    description:
      "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.",
    icon: HiOutlineMap,
  },
  {
    number: "02",
    title: "UI/UX Design & Frontend",
    description:
      "Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
    icon: BsWindowSplit,
  },
  {
    number: "03",
    title: "API & System Architecture",
    description:
      "Designing maintainable APIs with PostgreSQL, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and reliable data flow.",
    icon: BsBoundingBox,
  },
];

const SkillCard = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const offset = 120;

    gsap.to(track, {
      x: -(scrollWidth - viewportWidth + offset),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: "top+=210 top",
        end: () => `+=${scrollWidth - viewportWidth + offset}`,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-custom-gradient overflow-hidden py-16 md:py-24 lg:py-28 xl:py-32"
    >
      {/* Heading */}
      <div className="section-shell mb-10 md:mb-12 lg:mb-16">
        <p className="text-xl md:text-3xl lg:text-4xl xl:text-[2.8rem] max-w-5xl leading-tight">
          Transforming ideas into exceptional digital experiences through expertise and innovation
        </p>
      </div>

      {/* Cards */}
      <div
        ref={trackRef}
        className="
          flex 
          flex-col md:flex-row 
          gap-8 md:gap-10 lg:gap-12 
          section-shell 
          pb-10
          h-full
        "
      >
        {Skills.map((card, idx) => (
          <div
            key={idx}
            className="
              flex-shrink-0 
              w-full md:w-[360px] lg:w-[400px] xl:w-[420px] 2xl:w-[460px] h-full
            "
          >
            <Card
              number={card.number}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillCard;

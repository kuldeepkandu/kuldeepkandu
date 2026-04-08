import ScrollFloat from "../ScrollFloat";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SkillCategory from "./SkillCategory";

gsap.registerPlugin(ScrollTrigger);

const TechnologyArsenal = ({ tech, onDeleteSuccess }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || !Array.isArray(tech) || tech.length === 0) return;

      gsap.from(container.children, {
        opacity: 0,
        y: -600,
        duration: 1,
        ease: "power3.inOut",
        stagger: 0.3,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          // markers: true, // remove in production
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [tech],
      revertOnUpdate: true,
    },
  );
  return (
    <section className="bg-custom-gradient py-20 md:py-24 lg:py-28">
      <div className="section-shell">
        {/* Header */}
        <div className="text-center space-y-4 mb-14 md:mb-16 lg:mb-20">
          <div className="text-[clamp(2rem,4.8vw,4rem)] font-semibold">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Technology Arsenal
            </ScrollFloat>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        {/* Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 md:gap-x-10 xl:gap-x-14 gap-y-12 md:gap-y-14 lg:gap-y-16"
        >
          {(tech ?? []).map((group) => (
            <SkillCategory
              key={group.id}
              id={group.id}
              category={group.category}
              skills={group.skills}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyArsenal;

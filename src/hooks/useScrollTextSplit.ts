'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollTextSplit = (
  type: "letter" | "word" = "letter",
  stagger = 0.05
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".scrollTextSplit");

    items.forEach((item) => {
      const text = item.textContent || "";
      const parts = type === "letter" ? text.split("") : text.split(" ");

      // Prepare element
      item.style.display = "inline-block";
      item.style.perspective = "600px";

      // Replace text with spans and set initial opacity and transform
      item.innerHTML = "";
      parts.forEach((p) => {
        const span = document.createElement("span");
        span.textContent = type === "word" ? p + " " : p;
        span.style.display = "inline-block";
        span.style.transform = "translateZ(0px) rotateX(0deg)";  // Initial state without distortion
        span.style.opacity = "1";  // Fully visible initially
        item.appendChild(span);
      });

      const spans = item.querySelectorAll("span");

      // Create a GSAP timeline with scrub to tie animation to scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",    // Animation starts when top of element hits bottom of viewport
          end: "bottom top",      // Animation ends when bottom of element hits top of viewport
          scrub: true,            // Tie animation progress to scroll position
          // markers: true,       // Uncomment for debug
        },
      });

      // Animate from normal to flipped+faded state as you scroll up
      tl.to(
        spans,
        {
          z: -60,
          opacity: 0,
          rotateX: 180,
          duration: 1,
          stagger,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        spans,
        {
          z: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger,
          ease: "power1.inOut",
        },
        0.5  // Delay so that the reverse animation is smooth
      );

      // Cleanup ScrollTrigger on unmount
      return () => {
        tl.scrollTrigger?.kill();
      };
    });
  }, [type, stagger]);

  return { containerRef };
};

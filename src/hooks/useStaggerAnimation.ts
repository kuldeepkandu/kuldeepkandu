// hooks/useStaggerAnimation.ts
'use client'
import { useRef, useState } from "react";
import { gsap } from "gsap";

export const useStaggerAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const toggleStagger = () => {
    const element = containerRef.current;
    if (!element) return;

    const links = element.querySelectorAll<HTMLElement>(".link");

    if (!visible) {
      // Animate in
      gsap.set(links, { opacity: 0, x: -100, scale: 1, rotate: 0 });
      gsap.to(links, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 360,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
    } else {
      // Animate out
      gsap.to(links, {
        opacity: 0,
        x: -400,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
    }

    setVisible(!visible);
  };

  return { containerRef, toggleStagger, visible };
};

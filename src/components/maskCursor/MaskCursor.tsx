"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MaskCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50
    });

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power3.out"
    });

    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power3.out"
    });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999]
                 w-8 h-8 rounded-full
                 bg-white
                 pointer-events-none
                 mix-blend-difference"
    />
  );
};

export default MaskCursor;

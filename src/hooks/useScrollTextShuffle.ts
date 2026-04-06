'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollTextShuffleOptions = {
  type?: "letter" | "word";
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
};

export const useScrollTextShuffle = ({
  type = "letter",
  stagger = 0.05,
  start = "top center",
  end = "bottom top",
  scrub = 1,
  markers = false,
  pin = false,
}: ScrollTextShuffleOptions = {}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".scrollTextSplit");

    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      const text = item.textContent || "";
      const parts = type === "letter" ? text.split("") : text.split(" ");

      item.style.whiteSpace = "pre";
      item.style.display = "inline-block";
      item.style.perspective = "600px";

      item.innerHTML = "";

      parts.forEach((p) => {
        const span = document.createElement("span");

        if (type === "letter") {
          span.innerHTML = p === " " ? "&nbsp;" : p;
        } else {
          span.textContent = p + " ";
        }

        span.style.display = "inline-block";
        span.style.transform = "translateZ(0px) rotateX(0deg)";
        span.style.opacity = "1";

        item.appendChild(span);
      });

      const spans = item.querySelectorAll("span");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item.parentElement,
          start,
          end,
          scrub,
          markers,
          pin,
        },
      });

      triggers.push(tl.scrollTrigger!);

      tl.to(spans, {
        z: () => gsap.utils.random(-100, 100),
        opacity: () => gsap.utils.random(0.1, 1),
        rotateX: () => gsap.utils.random(60, 180),
        stagger,
        ease: "power1.inOut",
        duration: 1,
      })
      .to(
        spans,
        {
          z: 0,
          opacity: 1,
          rotateX: 0,
          stagger,
          ease: "power1.inOut",
          duration: 1,
        },
        0.5
      );
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [type, stagger, start, end, scrub, markers, pin]);

  return { containerRef };
};

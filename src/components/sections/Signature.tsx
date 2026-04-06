'use client'

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin"; 

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const Signature = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    // Load the SVG from public folder
    fetch("globe.svg")
      .then(res => res.text())
      .then(text => setSvgContent(text));
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const path = containerRef.current?.querySelector("path");
    if (!path) return;

    gsap.set(path, { drawSVG: "0%" });
    gsap.to(path, {
      drawSVG: "100%",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
        // markers: true,
      },
      ease: "none",
    });
  }, [svgContent]);

  return (
    <div
      ref={containerRef}
      className="w-48 md:w-24"
      dangerouslySetInnerHTML={{ __html: svgContent || "" }}
    />
  );
};

export default Signature;

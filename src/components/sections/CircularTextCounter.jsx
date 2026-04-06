"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const layers = [
  { text: "TAILWIND • GSAP • NEXTJS • ", radius: 7, speed: 10, reverse: false },
  { text: "REACT • UI • ANIMATION • ", radius: 9, speed: 10, reverse: true },
  { text: "DESIGN • MOTION • WEB • ", radius: 11, speed: 10, reverse: false },
  { text: "REACT • UI • ANIMATION • ", radius: 13, speed: 10, reverse: true },
  { text: "REACT • UI • ANIMATION • ", radius: 15, speed: 10, reverse: false },
];

export default function CircularTextCounter() {
  const [count, setCount] = useState(0);
  const ringsRef = useRef([]);
  const lettersRef = useRef([]);
  const wrapperRef = useRef(null);
  const rotationTweens = useRef([]);

  // Reset refs before render
  lettersRef.current = [];
  ringsRef.current = [];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Rotate text rings
    rotationTweens.current = ringsRef.current.map((ring, index) =>
      gsap.to(ring, {
        rotation: layers[index].reverse ? -360 : 360,
        duration: layers[index].speed,
        repeat: -1,
        ease: "linear",
      })
    );

    // Counter + collapse
    gsap.to({}, {
      duration: 2,
      ease: "power1.out",
      onUpdate() {
        setCount(Math.floor(this.progress() * 100));
      },
      onComplete() {
        rotationTweens.current.forEach(t => t.kill());

        const tl = gsap.timeline();
        tl.to(lettersRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: {
            each: 0.004,
            from: "center",
          },
        });
        tl.to(wrapperRef.current, {
          scale: 0.7,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, "-=0.2");
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-custom-gradient">
      <div ref={wrapperRef} className="relative">
        {layers.map((layer, layerIndex) => (
          <div
            key={layerIndex}
            ref={(el) => (ringsRef.current[layerIndex] = el)}
            className="absolute inset-0"
          >
            {layer.text.split("").map((char, i) => {
              const angle = i * (360 / layer.text.length);
              const radiusPx = layer.radius * 16;

              return (
                <span
                  key={i}
                  ref={(el) => el && lettersRef.current.push(el)}
                  className="absolute left-1/2 top-1/2 font-semibold text-lg"
                  style={{
                    transform: `rotate(${angle}deg) translate(${radiusPx}px)`,
                    transformOrigin: "0 0",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold ">{count}%</span>
        </div>
      </div>
    </div>
  );
}

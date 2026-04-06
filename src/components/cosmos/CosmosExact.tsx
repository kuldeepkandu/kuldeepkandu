"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const IMAGES = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
  "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
];

const DEPTH_STATES = [
  { scale: 1.15, opacity: 0.15, y: 28 },
  { scale: 1.05, opacity: 0.25, y: 20 },
  { scale: 0.95, opacity: 0.4, y: 12 },
  { scale: 0.85, opacity: 0.6, y: 6 },
  { scale: 0.75, opacity: 0.9, y: 0 },
];

export default function CircularImageStacks() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stacks = gsap.utils.toArray<HTMLElement>(".image-stack");

    stacks.forEach((stack, stackIndex) => {
      let cards = Array.from(stack.children) as HTMLElement[];

      // initial depth placement
      cards.forEach((card, i) => {
        gsap.set(card, DEPTH_STATES[i]);
      });

      const animate = () => {
        const tl = gsap.timeline({
          delay: stackIndex * 0.15,
          onComplete: () => {
            const front = cards.pop()!;
            cards.unshift(front);
            cards.forEach(el => stack.appendChild(el));
            animate();
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
            //   ...DEPTH_STATES[i],
              duration: 2,
              ease: "none",
            },
            0
          );
        });

        // front card sinks into center
        tl.to(
          cards[cards.length - 1],
          {
            scale: 0.6,
            opacity: 0,
            duration: 2,
            ease: "none",
            x: -100,
            y: 50,
          },
          0
        );
      };

      animate();
    });
  }, []);

  const STACK_COUNT = 14;
  const RADIUS = 420;

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {Array.from({ length: STACK_COUNT }).map((_, i) => {
        const angle = (360 / STACK_COUNT) * i;
        const x = Math.cos((angle * Math.PI) / 180) * RADIUS;
        const y = Math.sin((angle * Math.PI) / 180) * RADIUS;

        return (
          <div
            key={i}
            className="image-stack absolute"
            style={{
              width: 150,
              height: 210,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            {IMAGES.map((src, idx) => (
              <img
                key={idx}
                src={src}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                style={{
                  filter: "contrast(1.05) saturate(0.9)",
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

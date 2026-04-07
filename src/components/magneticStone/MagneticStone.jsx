"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

export default function MagneticStone({
  image = "/Assets/rock/stone.png",
}) {
  const containerRef = useRef(null);
  const stoneRef = useRef(null);
  const textRefs = useRef([]);

  const activeText = useRef(null);
  const delayTween = useRef(null);

  useEffect(() => {
    const stone = stoneRef.current;
    const container = containerRef.current;

    if (!stone || !container) return;

    // IMPORTANT
    gsap.set(stone, { transformOrigin: "50% 50%" });

    // We'll use explicit tweens so we can reliably animate x/y/scale together.
    const moveTween = { current: null };
    const rotateTween = { current: null };

    const moveTo = (x, y, delay = 0, scale = 0) => {
      // kill any existing delayed calls
      delayTween.current?.kill();

      delayTween.current = gsap.delayedCall(delay, () => {
        try { moveTween.current && moveTween.current.kill(); } catch (e) {}
        moveTween.current = gsap.to(stone, {
          x,
          y,
          scale: scale,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
        });
      });
    };

    const moveToCenter = () => {
      activeText.current = null;
      try { rotateTween.current && rotateTween.current.kill(); } catch (e) {}
      rotateTween.current = gsap.to(stone, { rotation: 0, duration: 0.6, ease: 'power3.out' });
      moveTo(0, 0, 0.4, 1); // Scale back to original (1)
    };

    const moveToText = (el, withDelay) => {
      const t = el.getBoundingClientRect();
      const c = container.getBoundingClientRect();

      const x =
        t.left + t.width / 2 - (c.left + c.width / 2);
      const y =
        t.top + t.height / 2 - (c.top + c.height / 2);

      try { rotateTween.current && rotateTween.current.kill(); } catch (e) {}
      rotateTween.current = gsap.to(stone, { rotation: gsap.utils.random(-6, 6), duration: 0.6, ease: 'power3.out' });
      // Move and scale the stone div toward the text (scale down to 0.6)
      moveTo(x * 0.6, y * 0.6, withDelay ? 0.35 : 0, 0.3); 
    };

    const handleMouseEnter = (el) => {
      const firstHover = activeText.current === null;
      activeText.current = el;
      moveToText(el, firstHover);
    };

    const handleMouseLeave = (el) => {
      if (activeText.current === el) {
        moveToCenter();
      }
    };

    // Attach handlers and keep references so we can remove them properly on cleanup
    const handlers = [];
    textRefs.current.forEach((el) => {
      if (!el) return;
      const onEnter = () => handleMouseEnter(el);
      const onLeave = () => handleMouseLeave(el);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onEnter, onLeave }) => {
        try { el.removeEventListener('mouseenter', onEnter); } catch (e) {}
        try { el.removeEventListener('mouseleave', onLeave); } catch (e) {}
      });
      try { moveTween.current && moveTween.current.kill(); } catch (e) {}
      try { rotateTween.current && rotateTween.current.kill(); } catch (e) {}
      delayTween.current?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* STONE */}
      <div
        ref={stoneRef}
        className="absolute flex items-center justify-center w-[220px] h-[260px]"
      >
        <Image
          src={withBasePath(image)}
          alt="Stone"
          fill
          priority
          className="object-contain select-none pointer-events-none"
        />
      </div>

      {/* TEXT TARGETS */}
      {[
        "OLHA LAZARIEVA",
        "MAX MILKIN",
        "TWO CAPITALS",
        "RAINE ARCHITECTS",
      ].map((text, i) => (
        <div
          key={i}
          ref={(el) => (textRefs.current[i] = el)}
          className={`absolute text-sm tracking-widest text-white cursor-pointer select-none
            ${i === 0 && "top-10 left-10"}
            ${i === 1 && "top-10 right-10"}
            ${i === 2 && "bottom-32 left-20"}
            ${i === 3 && "bottom-32 right-20"}
          `}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
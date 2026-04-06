"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useScrollTextShuffle } from "@/hooks/useScrollTextShuffle";
import Globe from "../globe/Globe";
import Magnet from "../Magnet";

import { MdArrowOutward } from "react-icons/md";
import PillArrowButton from "../button/PillArrowButton";

gsap.registerPlugin(ScrollTrigger);

const Dev = () => {
  const sectionRef = useRef(null);
  const curveRef = useRef(null);
  const staggerRef = useRef(null);



  useGSAP(() => {
    gsap.to(curveRef.current, {
      scaleY: 1.3,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    gsap.from(".stagger", {
      opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.25,
            scrollTrigger: {
                trigger: staggerRef.current,
                start: "top 80%",
                // markers: true,
                scrub: true,
            }
    });
  });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-custom-gradient">
      {/* TOP CURVE */}
      <svg
        ref={curveRef}
        className="absolute top-0 left-0 w-full md:h-[120px] z-10"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C240,40 480,0 720,0 960,0 1200,40 1440,120 L1440,0 L0,0 Z"
          fill="#f2f2f2"
        />
      </svg>

      {/* MAIN */}
      <section
        className="relative min-h-screen bg-custom-gradient-reverse text-white
                   px-6 md:px-12 pt-[140px] pb-12"
      >
        <div className="flex flex-col items-center justify-between h-full gap-y-16">

          {/* TEXT CONTENT */}
          <div ref={staggerRef} className="flex flex-col items-center md:gap-y-16 gap-y-5 text-center">
            <h1  className="stagger max-w-4xl text-lg md:text-[2.5vw] leading-snug font-medium">
              I'm Kuldeep — a FullStack Developer crafting fast, scalable, and
              immersive digital experiences that merge creativity with
              engineering precision.
            </h1>

            <p className="stagger max-w-3xl text-sm md:text-[1.8vw] leading-relaxed opacity-90">
              I specialize in developing SaaS platforms, AI-driven products, and
              interactive 3D web experiences using technologies like Next.js,
              Node.js, and Three.js.
            </p>

            {/* CTA */}
            <div className="stagger">
            <Magnet padding={50} magnetStrength={1}>
              <PillArrowButton 
              text="About me"
              href="/about"
               />
            </Magnet>
            </div>

            {/* GLOBE */}
          <div className="stagger flex items-center justify-center">
            <Globe />
          </div>

          </div>

          

        </div>
      </section>
    </section>
  );
};

export default Dev;

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutMe = ({
  image = "/Assets/profile/myImage.jpg",
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".stagger", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.25,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex items-center bg-custom-gradient"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-20 w-full">
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Text */}
          <div className="space-y-6">
            <p className="stagger text-xs uppercase tracking-widest text-gray-500">
              ( About me )
            </p>

            <h1 className="stagger text-3xl md:text-5xl font-semibold uppercase leading-tight">
              Creative Full-Stack <br /> Web Developer
            </h1>

            <p className="stagger text-base md:text-lg font-light text-gray-700 max-w-xl">
              I’m a Full-Stack Developer focused on building scalable,
              high-performance applications with clean architecture,
              thoughtful UX, and modern technologies.
            </p>
          </div>

          {/* RIGHT: Image */}
          <div className="flex justify-center md:justify-end">
            <div className="stagger w-[220px] h-[320px] md:w-[320px] md:h-[440px] rounded-xl overflow-hidden">
              <Image
                src={image}
                alt="Portrait"
                width={400}
                height={600}
                className="w-full h-full object-cover grayscale"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;

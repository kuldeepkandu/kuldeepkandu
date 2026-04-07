import Image from "next/image";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { withBasePath } from "@/lib/withBasePath";

const AboutLanding = ({ image = "/Assets/profile/myImage.jpeg" }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".animate-item", {
        opacity: 0,
        y: 60,
        delay: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <section className="min-h-screen flex items-center bg-custom-gradient">
      <div className="mx-auto max-w-7xl w-full px-6 md:px-20 py-10">
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT: Text */}
          <div className="space-y-10">
            {/* Heading */}
            <p className=" animate-item text-3xl md:text-6xl font-medium leading-tight capitalize">
              Turning Vision Into Reality With Code And Design.
            </p>

            {/* Description */}
            <div className=" space-y-4 text-base md:text-xl font-light text-gray-700 max-w-xl">
              <p className="animate-item">
                A Full-Stack Developer currently working as a Backend Developer,
                focused on building scalable web applications.
              </p>

              <p className="animate-item">
                I hold a B.Sc. in Information Technology and work with React.js,
                Tailwind CSS, and modern backend technologies, always learning
                and improving.
              </p>

              <p className="animate-item">
                Beyond coding, I enjoy exploring new ideas, listening to music,
                and working on personal projects that fuel my creativity.
              </p>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="animate-item flex justify-center md:justify-end">
            <div className="group relative w-[240px] h-[340px] md:w-[350px] md:h-[500px] rounded-xl overflow-hidden bg-black">
              {/* Image */}
              <Image
                src={withBasePath(image)}
                alt="Portrait"
                fill
                priority
                className="
        object-cover
        grayscale
        transition-all
        duration-700
        ease-out
        group-hover:grayscale-0
      "
              />

              {/* Subtle blue rim light (optional, looks premium) */}
              <div
                className="
        absolute inset-0
        bg-gradient-to-l
        from-cyan-500/20
        via-transparent
        to-transparent
        mix-blend-screen
        opacity-70
        transition-opacity
        duration-700
        group-hover:opacity-100
        pointer-events-none
      "
              />

              {/* Cinematic vignette */}
              <div
                className="
        absolute inset-0
        bg-gradient-to-t
        from-black/50
        via-transparent
        to-black/30
        pointer-events-none
      "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLanding;

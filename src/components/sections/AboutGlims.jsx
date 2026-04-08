"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import CountUp from "../CountUp";
import { withBasePath } from "@/lib/withBasePath";

gsap.registerPlugin(ScrollTrigger);

const AboutGlims = ({
  image = "/Assets/profile/myphoto.png",
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Moving Text Animation
      gsap.to(".moving-text", {
        xPercent: -100,
        duration: 20,
        ease: "linear",
        repeat: -1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top top",
        },
      });

      gsap.fromTo(
        imageRef.current,
        { scale: 0.5, opacity: 1 }, 
        {
          scale: 1.0,
          opacity: 1,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="bg-custom-gradient">
      <div className="w-full min-h-screen flex flex-col justify-center items-center py-10 md:py-14 lg:py-20">

        {/* Moving Text */}
        <div
          ref={containerRef}
          className="w-full whitespace-nowrap flex overflow-hidden"
        >
          <h1 className="moving-text text-[clamp(3rem,8vw,8rem)] uppercase font-semibold mr-12 md:mr-16 lg:mr-20 inline-block">
            Full-Stack Developer UI & UX Designer
          </h1>
          <h1 className="moving-text text-[clamp(3rem,8vw,8rem)] uppercase font-semibold inline-block">
            Full-Stack Developer UI & UX Designer
          </h1>
        </div>

        {/* Center Image */}
        <div className="relative section-shell flex items-center justify-center mt-10 md:mt-12 lg:mt-16 min-h-[70vh]">
          <div
            ref={imageRef}
            className="z-10 w-[280px] h-[420px] sm:w-[360px] sm:h-[480px] md:w-[720px] md:h-[420px] lg:w-[980px] lg:h-[520px] xl:w-[1120px] xl:h-[560px] 2xl:w-[1280px] 2xl:h-[620px] overflow-hidden shadow-lg relative bg-radial from-black-500 to-gray-600 rounded-[999px]"
          >
            <div className="w-full h-full flex items-center justify-center pt-20 md:pt-16 lg:pt-20">
            <Image
              src={withBasePath(image)}
              alt="Portrait"
              // fill
              width={100}
              height={100}
              className="object-contain w-full h-full grayscale"
            />
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="section-shell flex flex-col md:flex-row md:mt-16 lg:mt-20 mt-10 gap-6 md:gap-10 lg:gap-12 mb-10">
          <div className="text-xl md:text-3xl lg:text-4xl flex-1">
            <p>
              Driving measurable growth and engagement through thoughtful design and engineering.
            </p>
            <div className="hidden md:block">
              <hr className="w-[90%] h-[0.5px] bg-gray-500 border-0 md:mt-16 lg:mt-20" />
            </div>
          </div>

          <div className="text-base md:text-lg lg:text-xl font-light flex-1">
            <p>
              Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences. From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.
            </p>
            <hr className="w-full h-[0.5px] bg-gray-500 border-0 mt-6 md:mt-10 lg:mt-14" />
          </div>
        </div>

        {/* Stats */}
        <div className="section-shell flex md:flex-row flex-col md:justify-between justify-start items-center w-full gap-8 md:gap-6 lg:gap-10 mt-10">
          <div className="text-left">
            <p className="uppercase md:font-light font-semibold text-lg md:text-base lg:text-lg">
              Year of Experience
            </p>
            <p className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-center font-bold mt-2 md:mt-4">
              <CountUp from={0} to={2} separator="," direction="up" duration={1} />+
            </p>
          </div>

          <div className="text-left">
            <p className="uppercase md:font-light font-semibold text-lg md:text-base lg:text-lg">
              Projects Completed
            </p>
            <p className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-center font-bold mt-2 md:mt-4">
              <CountUp from={0} to={10} separator="," direction="up" duration={1} />+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGlims;

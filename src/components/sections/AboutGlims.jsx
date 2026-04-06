"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import CountUp from "../CountUp";

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
      <div className="w-full min-h-screen flex flex-col justify-center items-center">

        {/* Moving Text */}
        <div
          ref={containerRef}
          className="w-full whitespace-nowrap flex overflow-hidden"
        >
          <h1 className="moving-text text-[10vw] uppercase font-semibold mr-20 inline-block">
            Full-Stack Developer UI & UX Designer
          </h1>
          <h1 className="moving-text text-[10vw] uppercase font-semibold inline-block">
            Full-Stack Developer UI & UX Designer
          </h1>
        </div>

        {/* Center Image */}
        <div className="relative w-full min-h-screen flex items-center justify-center mt-10">
          <div
            ref={imageRef}
            className="z-10 w-[300px] min-h-screen md:w-[1100px] md:h-[500px] rounded-lg overflow-hidden shadow-lg relative bg-radial from-black-500 to-gray-600 rounded-full "
          >
            <div className="mt-50 w-full h-[400px] flex items-center justify-center">
            <Image
              src={image}
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
        <div className="flex flex-col md:flex-row md:mt-20 mt-10 md:px-20 px-10 gap-6 md:gap-12 md:mb-10 mb-15">
          <div className="md:text-4xl text-xl flex-1">
            <p>
              Driving measurable growth and engagement through thoughtful design and engineering.
            </p>
            <div className="hidden md:block">
              <hr className="w-[90%] h-[0.5px] bg-gray-500 border-0 md:mt-20" />
            </div>
          </div>

          <div className="md:text-xl text-lg font-light flex-1">
            <p>
              Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences. From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.
            </p>
            <hr className="w-full h-[0.5px] bg-gray-500 border-0 mt-6 md:mt-15" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex md:flex-row flex-col md:justify-between justify-start items-center w-full md:px-20 gap-8 md:gap-0 mt-10">
          <div className="text-left">
            <p className="uppercase md:font-light font-semibold text-xl md:text-base">
              Year of Experience
            </p>
            <p className="text-5xl md:text-8xl text-center font-bold mt-2 md:mt-4">
              <CountUp from={0} to={2} separator="," direction="up" duration={1} />+
            </p>
          </div>

          <div className="text-left">
            <p className="uppercase md:font-light font-semibold text-xl md:text-base">
              Projects Completed
            </p>
            <p className="text-5xl md:text-8xl text-center font-bold mt-2 md:mt-4">
              <CountUp from={0} to={10} separator="," direction="up" duration={1} />+
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGlims;

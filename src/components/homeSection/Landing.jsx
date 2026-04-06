"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Particles from "../Particles";
import Orb from "../Orb";

gsap.registerPlugin(useGSAP);

const Landing = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".from-left", {
                opacity: 0,
                x: -400,
                duration: 1,
                ease: "power3.out",
                delay: 1,
            });

            gsap.from(".from-right", {
                opacity: 0,
                x: 400,
                duration: 1,
                ease: "power3.out",
                delay: 1.5,
            });

            gsap.from(containerRef.current, {
                opacity: 0,
                y: 200,
                duration: 1,
                ease: "power3.out",
                delay: 0.5,
            })
        },
        { scope: containerRef }
    );

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="bg-custom-gradient overflow-hidden h-[calc(100vh-3rem)] relative"
            >
                {/* <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}

                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                    className="orb"
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light w-full ">
                    <p className="text-xl md:text-[5vw] text-center font-semibold font-normal font-sarif scale-y-120">Hi! i’m Kuldeep</p>
                    <h1 className="md:text-[8vw] text-3xl text-center font-semibold md:leading-tight mt-2">
                        <span className="from-left md:block text-black">Building Visions</span>
                        <span className="from-right md:block text-black "> Into Digital Reality</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Landing;

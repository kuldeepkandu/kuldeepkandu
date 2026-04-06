import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
    { text: "★ Mastering Tailwind • GSAP • Next.js • ", radius: 10, speed: 10, reverse: false },
    { text: "✦ Building React UI • Animations • Components • ", radius: 12, speed: 10, reverse: true },
    { text: "★ Designing Motion • Web Experiences • Creativity • ", radius: 14, speed: 10, reverse: false },
];




const CircularAbout = () => {


    const titleRef = useRef(null);

    const ringsRef = useRef([]);
    const lettersRef = useRef([]);
    const wrapperRef = useRef(null);
    const rotationTweens = useRef([]);

    // Reset refs before render
    lettersRef.current = [];
    ringsRef.current = [];


    useGSAP(() => {
        layers.forEach((layer, index) => {
            gsap.to(ringsRef.current[index], {
                rotation: layer.reverse ? -360 : 360,
                ease: "linear",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 3,
                    // markers: true,
                }

            })
        });

        gsap.from(".title-line", {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            stagger: 0.25,
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 40%",
                // markers: true,
            },
        });

    }, [])

    return (
        <div className="relative min-h-screen bg-black text-white/60 overflow-hidden">
            <h1
                ref={titleRef}
                className="uppercase absolute inset-0 flex flex-col items-center justify-center font-bold text-white/10 text-center leading-tight px-10 text-[7vw] md:text-[4vw]"
            >
                <span className="title-line">The world of rhythm and flow</span>
                <span className="title-line">shaped my understanding of</span>
                <span className="title-line">creativity —</span>
                <span className="title-line">as movement, timing, and emotion.</span>
            </h1>


            <div
                ref={wrapperRef}
                className="relative z-10 flex items-center justify-center min-h-screen hidden md:block">
                {layers.map((layer, layerIndex) => (
                    <div
                        key={layerIndex}
                        ref={(el) => (ringsRef.current[layerIndex] = el)}
                        className="absolute right-1/2 inset-0"
                    // style={{ transformOrigin: "50% 50%" }}
                    >
                        {layer.text.split("").map((char, i) => {
                            const angle = i * (360 / layer.text.length);
                            const radiusPx = layer.radius * 16;

                            return (
                                <span
                                    key={i}
                                    ref={(e1) => e1 && lettersRef.current.push(e1)}
                                    className="absolute left-1/2 top-1/2 font-semibold text-lg text-white/30"
                                    style={{
                                        transform: `rotate(${angle}deg) translate(${radiusPx}px) rotate(${90}deg) `,
                                        transformOrigin: "0% 0%",
                                    }}

                                >
                                    {char}

                                </span>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className="absolute flex justify-center items-center text-center md:left-1/2 top-80 inset-0 md:top-1/2">
                <h1 className="text-white/60 flex md:flex-col flex-row justify-center items-start"><span className="title-line">10 +</span><span className="uppercase title-line">implemented projects</span></h1>
            </div>
        </div>
    )
}
export default CircularAbout;
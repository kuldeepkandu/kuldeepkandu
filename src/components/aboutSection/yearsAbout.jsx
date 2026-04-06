import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const YearsAbout = ({
    image = '/Assets/profile/myImage.jpg'
}) => {


    const containerRef = useRef(null);

    useGSAP(()=> {

        gsap.from(".stagger", {
            opacity: 0,
            y: 40,
            ease: "power3.out",
            stagger: 0.3,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 30%",
                // markers: true,
            },
        })

    }, {scope: containerRef})

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black text-white/60 overflow-hidden px-6">
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <h1 className='stagger font-extrabold tracking-tight select-none text-[20vw] md:text-[16vw] leading-none text-white/7'>2024 2026</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center text-center mt-20 gap-8 max-w-7xl mx-auto">
                <div className="px-4 max-w-xs md:max-w-sm">
                    <span className="stagger uppercase text-2xl block font-semibold ">
                        For me, Website is not just code on screen.
                    </span>
                </div>
                <div className="stagger w-[200px] h-[400px] bg-black rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
                    <Image
                        src={image}
                        alt="Portrait"
                        width={200}
                        height={200}
                        className="object-cover rounded-lg opacity-30"
                    />
                </div>
                <div className="px-4 max-w-xs md:max-w-sm md:mb-0 mb-4">
                    <span className=" stagger uppercase text-sm block">
                        Since 2024, I've been dedicated to building digital experiences defined by smooth animations, minimalistic interfaces, and immersive 3D.
                    </span>
                </div>
            </div>
        </div>
    )
}
export default YearsAbout;

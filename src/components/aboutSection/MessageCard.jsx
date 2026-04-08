import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


const MessageCard = () => {

    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(containerRef.current, {
            // opacity: 0,
            scaleX: 0.1,
            duration: 3,
            ease: "Bounce.easeOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                // markers: true,
            }
        })
    }, {scope: containerRef});
    return (
        <div ref={containerRef} className="min-h-screen bg-custom-gradient">
            <div className="section-shell flex items-center justify-center min-h-screen py-10">
                <div className="bg-black bg-opacity-20 rounded-xl shadow-lg p-6 md:p-10 lg:p-14 xl:p-16 w-full max-w-5xl xl:max-w-6xl text-center">
                    <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold mb-6 text-white">Ready to Build Something Exceptional?</h2>
                    <p className="text-base md:text-lg lg:text-xl font-light text-white mb-6 text-center md:px-6 lg:px-10">
                        Whether you need an AI-powered SaaS platform, an immersive 3D experience, or a high-performance web application, I bring the technical expertise and creative vision to make it happen. Let's discuss how we can turn your ambitious ideas into production-ready solutions that drive real business results.                    </p>
                </div>
            </div>
        </div>
    )
}
export default MessageCard;
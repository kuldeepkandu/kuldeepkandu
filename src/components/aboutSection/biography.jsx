import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const bioData = [
    {
        title: "My IDENTITY",
        description: "I’m Kuldeep, a Full-Stack Developer currently working as a Backend Developer, focused on building scalable web applications."
    },
    {
        title: "My GROWTH",
        description: "I hold a B.Sc. in Information Technology and work with React.js, Tailwind CSS, and modern backend technologies, always learning and improving."
    },
    {
        title: "My HOBBIES",
        description: "Beyond coding, I enjoy exploring new ideas, listening to music, and working on personal projects that fuel my creativity."
    },
]

const Biography = () => {

    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".bio-item", {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.25,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        })

    }, { scope: containerRef })


    return (
        <div ref={containerRef} className="w-full px-6 md:px-20 text-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {bioData.map((item, index) => (
                    <div key={index} className="bio-item lg:px-12 mb-10">
                        <h3 className="text-xs tracking-widest text-black mb-2">
                            + {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default Biography;
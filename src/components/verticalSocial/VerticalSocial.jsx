import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


const VerticalSocial = () => {

    const Icon = [
    { text: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedinIn },
    { text: "Instagram", url: "https://instagram.com", icon: FaInstagram },
    { text: "GitHub", url: "https://github.com", icon: FaGithub },
    { text: "Twitter", url: "https://twitter.com", icon: FaTwitter },
    { text: "Whatsapp", url: "https://wa.me/7021134754", icon: FaWhatsapp },
]

const containerRef = useRef(null);

    useGSAP(()=> {
        
        gsap.from(containerRef.current, {
            opacity: 0,
            y: -500,
            duration: 1,
            ease: "power3.out",
            delay: 2,
        })

    }, {scope: containerRef})

    return (
    <div ref={containerRef} className="absolute left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center">
        
        <span className="w-2 h-2 rounded-full bg-black"/>
        <span className="w-[0.5px] h-50 bg-black opacity-80"/>
        <span className="w-2 h-2 rounded-full bg-black"/>

        <div className="flex flex-col gap-5 mt-6">
            {Icon.map((icon, index) => (
                <a key={index}
                title={icon.text}
          href={icon.url}
          target="_blank"
          className="text-black hover:scale-110 transition-transform"
        >
          <icon.icon size={20} />
        </a>
            ))}
        </div>
    </div>
    )
}
export default VerticalSocial;
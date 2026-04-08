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
    <div
  ref={containerRef}
      className="absolute left-4 md:left-6 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center"
>
  {/* Dots and line */}
  <span className="w-2 h-2 rounded-full bg-black" />
  {/* Height of line: smaller on mobile, consistent elsewhere */}
  <span className="w-[0.5px] h-24 md:h-36 lg:h-44 xl:h-52 bg-black opacity-80" />
  <span className="w-2 h-2 rounded-full bg-black" />

  {/* Icon list */}
  <div className="flex flex-col gap-4 lg:gap-5 mt-6">
    {Icon.map((icon, index) => (
      <a
        key={index}
        title={icon.text}
        href={icon.url}
        target="_blank"
        className="text-black hover:scale-110 transition-transform"
      >
        {/* Smaller on mobile, consistent larger size elsewhere */}
        <icon.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-[1.15rem] lg:h-[1.15rem]" />
      </a>
    ))}
  </div>
</div>

    )
}
export default VerticalSocial;
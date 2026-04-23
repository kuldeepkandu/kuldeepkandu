"use client"
import { useSplitHoverAnimation } from "@/hooks/useSplitHoverAnimation";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
import ScrollFloat from "../ScrollFloat";
import { useTransitionRouter } from "next-view-transitions";
import ContactModal from "@/components/contact/ContactModal";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);


const Menu = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Projects", href: "#projects" },
];

const Socials = [
  { text: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedinIn },
  { text: "Instagram", url: "https://instagram.com", icon: FaInstagram },
  { text: "GitHub", url: "https://github.com", icon: FaGithub },
  { text: "Twitter", url: "https://twitter.com", icon: FaTwitter },
  { text: "WhatsApp", url: "https://wa.me/7021134754", icon: FaWhatsapp },
];


const Footer = () => {

  const { containerRef: navRef } = useSplitHoverAnimation("letter", 0.04);
  const { containerRef: overlayRef } = useSplitHoverAnimation("letter", 0.04);

  const curveRef = useRef(null);
  const curvePathRef = useRef(null);


  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const staggerRef = useRef(null);


  const router = useTransitionRouter();

  function slideInOut() {
    try {
      document.documentElement.animate(
        [
          { opacity: 1, scale: 1, transform: "translateY(0)" },
          { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        }
      );

      document.documentElement.animate(
        [
          { transform: "translateY(100%)" },
          { transform: "translateY(0)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch (err) {
      // fallback: a simple, safe CSS class toggle could be used instead
      // console.warn('view-transition animation failed', err);
    }
  }



  useGSAP(() => {

    let split = new SplitText(".stagger", {
      type: "chars, words, lines"
    });

    gsap.from(split.chars,
      {
        y: 100,
        autoAlpha: 0,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        rotation: "random(-30, 30)",
        ease: "back",
        duration: 1,
        scrollTrigger: {
          trigger: staggerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          // markers: true,
        }
      }
    )

    gsap.to(curvePathRef.current, {
      attr: {
        d: "M0,0 L1440,0 L1440,60 C960,20 480,20 0,60 Z",
      },
      ease: "none",
      scrollTrigger: {
        trigger: staggerRef.current,
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

  }, { scope: staggerRef });



  return (
    <div className="relative w-full bg-gray-200 overflow-hidden">

      {/* Concave Top */}
      <svg
        ref={curveRef}
        viewBox="0 0 1440 120"
        className="absolute top-0 left-0 w-full h-[120px]"
        preserveAspectRatio="none"
      >
        <path
          ref={curvePathRef}
          d="M0,0 L1440,0 L1440,20 C960,120 480,120 0,20 Z"
          fill="#f2f2f2"
        />
      </svg>


      {/* Footer Content */}
      <div className="relative pt-24 md:pt-32 flex flex-col items-center justify-center">
        <div className="relative w-full bg-gray-200 flex flex-col items-center justify-center">

          <ul ref={navRef} className="hidden md:hidden gap-16 text-sm">
            {Menu.map(({ text, href }, idx) => (
              <li key={idx}>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(href, {
                      onTransitionReady: slideInOut,
                    });
                  }}
                  href={href}
                  className="hoverTextSplit text-black/70"
                >
                  {text}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hoverTextSplit relative overflow-hidden cursor-pointer font-semibold px-2 py-1 rounded-full bg-black text-white transition-colors duration-300 hover:text-black
                        before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 befor:text-black 
              ">
                Contact
              </button>
            </li>
          </ul>

          <div ref={staggerRef} className="gap-2 mt-10 flex flex-col justify-center items-center">
            {/* <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          KULDEEP KUMAR
        </ScrollFloat> */}
            <p className="stagger uppercase md:text-6xl scale-y-120 font-bold">Kuldeep Kumar</p>
            <div className="">
              <ul className=" hidden md:flex gap-16 text-sm px-4 mt-4">
                {Socials.map(({ text, url, icon: Icon }, idx) => (
                  <li key={idx}>
                    <Link
                      href={url}
                      className=" group overflow-hidden relative inline-block text-black/70 after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-black/50 after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      <span className="block
          transition-transform
          duration-300
          ease-in-out
          group-hover:-translate-y-full">
                        {text}
                      </span>
                      <span
                        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          translate-y-full
          transition-transform
          duration-300
          ease-in-out
          group-hover:translate-y-0
        "
                      >
                        <Icon className="text-lg " />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <Link href="mailto:Maddeshiyakuldeep@gmail.com" className="md:font-bold text-sm underline flex scale-y-120 tracking-wider animate-bounce md:animate-none hover:animate-bounce hover:scale-120 hover:bg-gray-500 rounded-full px-2 hover:text-white transition-all duration-300">maddeshiyakuldeep@gmail.com</Link>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-[5vw] font-semibold uppercase text-black/50">Creative Full-Stack Web Developer</h1>
          </div>


          <div className="w-full px-6 md:px-16 mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2 ">
            <span className="text-sm text-black/60 text-center md:text-left">
              © {new Date().getFullYear()} Kuldeep Kumar
            </span>

            <span className="text-sm text-black/60 text-center">
              Portfolio Website
            </span>

            <div className=" border rounded-full px-4 border-black text-sm scrollTextSplit font-light text-black mx-auto md:mx-0">
              Finish  <span className="inline-block animate-ping animate-[ping_2.5s_linear_infinite]">•</span>
            </div>
          </div>
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </div>
      </div>

    </div>
  );
};

export default Footer;

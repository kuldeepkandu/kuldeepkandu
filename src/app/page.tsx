'use client'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use, useEffect, useRef, useState } from "react";
import Dev from "../components/sections/Dev";
import ScrollConvergeSection from "@/components/sections/ScrollConvergeSection";
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
import MagneticStone from '../components/magneticStone/MagneticStone'
import Landing from '../components/homeSection/Landing';
import AboutGlims from '../components/sections/AboutGlims';
import SkillCard from '../components/sections/SkillCard';
import VerticalSocial from '../components/verticalSocial/VerticalSocial'
import MaskCursor from '../components/maskCursor/MaskCursor';

gsap.registerPlugin(useGSAP);

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const [visible, setVisible] = useState(false);
  

  // const cardRef = useRef(null);
  const container = useRef(null);


  const HandleStager = () => {
    const ctx = gsap.context(() => {

      // const element = container.current;
      const boxes = document.querySelectorAll(".box");
      // if (!element) return;

      if (!visible) {
        //set
        gsap.set(boxes, {
          opacity: 0,
          x: -100,
          scale: 1,
          rotate: 0
        });
        gsap.to(boxes, {
          opacity: 1,
          duration: 1,
          x: 0,
          scale: 1,
          ease: "power2.out",
          rotate: 360,
          stagger: 0.1
        });
      } else {
        //to
        gsap.to(boxes, {
          opacity: 0,
          duration: 1,
          x: -400,
          scale: 1,
          ease: "power2.out",
          rotate: 0,
          stagger: 0.1
        });
      }
      setVisible(!visible);

    })
    return () => ctx.revert();
  };

  return (
    <div>
      <Landing />
      <VerticalSocial />
      <Dev />
      {/* <ScrollConvergeSection /> */}
      <AboutGlims />
      <SkillCard />
      {/* <MagneticStone /> */}
      {/* <div id="contact" className=""> */}
      {/* <Contact /> */}
      {/* </div> */}
      <Footer />
    </div>

  );
}

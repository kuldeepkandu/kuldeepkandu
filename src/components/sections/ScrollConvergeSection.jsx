'use client'
import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollConvergeSection({
  text = 'Hii, I am Kuldeep Kumar - A Full Stack Developer. My focus is on crafting seamless web experiences that blend functionality with aesthetics. ',
  image = '/Assets/profile/developer-img.webp',
}) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const charsRef = useRef([])

  const lines = [
    'Hii,',
    'I am Kuldeep - Full Stack Developer',
    'My focus is on crafting seamless web experiences',
    'that blend functionality with aesthetics.'
  ]

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current || charsRef.current.length === 0) return;

    const container = containerRef.current;
    const imageEl = imageRef.current;
    const textContainer = textRef.current;
    const chars = charsRef.current.filter(Boolean);

    // Initial setup for centering
    gsap.set(imageEl, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
    gsap.set(textContainer, { xPercent: -50, yPercent: -50, y: 0 });

    // Initial scatter for characters
    gsap.set(chars, {
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-300, 300),
      rotation: () => gsap.utils.random(-15, 15)
    });

    // Approximate final y for text container to align below image (adjust as needed based on image height ~400px)
    const finalTextY = 240;

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      // x: 400,
      // duration: 3,

      scrollTrigger: {
        trigger: container,
        start: "top top",  // Start pinning/animating when top of container hits top of viewport
        end: "+=800",      // <-- SET YOUR STOP POINT HERE: Ends after 800px of scroll (adjust px value)
        // markers: true,  // Alternatives: "bottom top", "+=window.innerHeight", or a function like () => innerHeight * 1.5
        pin: true,
        scrub: 2,       // Smooth scrubbing tied to scroll progress
        anticipatePin: 1,  // Pre-calculates pin spacing for smoother feel
      }
    });

    // Animate image scale on scroll
    tl.to(imageEl, { scale: 1, duration: 1, opacity: 1, }, 0);

    // Animate text container to bottom of image
    tl.to(textContainer, { y: finalTextY, duration: 1 }, 0);

    // Animate characters to converge and align properly
    tl.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      stagger: 0.02,
      duration: 1
    }, 0);

  }, [containerRef, imageRef, textRef, charsRef])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-custom-gradient-reverse text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className='font-extrabold tracking-tight select-none text-[20vw] md:text-[16vw] leading-none text-white/5'>Vison Into Reality</h1>
      </div>
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-11 py-2 font-light">
        <div className="text-sm text-black scrollTextSplit">( About )</div>
        <div className="rounded-full px-6 py-1 text-sm scrollTextSplit text-black">
          [ N.002 ]
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center h-full gap-6">
          {/* Image */}
          <div ref={imageRef} className="absolute z-10 left-1/2 top-1/2 w-[200px] h-[300px] bg-black rounded-lg">
            <Image
              src={image}
              alt="Portrait"
              width={100}
              height={200}
              className="object-cover grayscale rounded-lg shadow-lg w-full h-full"
            />
          </div>
          {/* Text */}
          <div ref={textRef} className="absolute z-20 pointer-events-none text-center left-1/2 top-1/2 max-w-lg">
            <div className="flex flex-col gap-2 text-sm text-white font-light tracking-widest capitalize">
              {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="flex justify-center">
                  {line.split('').map((char, charIndex) => {
                    const index = lineIndex * 50 + charIndex;
                    return (
                      <span
                        key={`${lineIndex}-${charIndex}`}
                        ref={(el) => {
                          if (el) charsRef.current[index] = el;
                        }}
                        className="inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-48 pointer-events-auto text-center">
            <button className='bg-custom-gradient cursor-pointer border rounded-full px-2 hoverTextSplit pointer-events-auto hover:backdrop-blur hover:border-black hover:text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 '>About Me</button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-11 py-2 ">
        <div className="w-10 h-[3px] bg-black/50"></div>
        <div className=" rounded-full px-6 py-1 text-sm scrollTextSplit font-light text-white">
          [ N.002  <span className="inline-block animate-ping animate-[ping_2.5s_linear_infinite]">•</span> ]
        </div>
      </div>
    </section>
  )
}
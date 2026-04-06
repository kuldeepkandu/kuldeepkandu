"use client";

import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Socials = [
    { text: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedinIn },
    { text: "Instagram", url: "https://instagram.com", icon: FaInstagram },
    { text: "GitHub", url: "https://github.com", icon: FaGithub },
    { text: "Twitter", url: "https://twitter.com", icon: FaTwitter },
    {text: "WhatsApp", url: "https://wa.me/7021134754", icon:FaWhatsapp},
];

const CircularSocial = ({ variant = "default" }) => {
    const radius = variant === "mobile" ? 70 : 80;
    const containerRef = useRef(null);
    const tlRef = useRef(null);
    const wrapperRef = useRef(null);

    // useEffect(() => {
    //     const container = containerRef.current;
    //     if (!container) return;

    //     // Create infinite anticlockwise rotation timeline
    //     tlRef.current = gsap.to(container, {
    //         rotation: -360,
    //         duration: 10,
    //         ease: "none",
    //         repeat: -1,
    //         paused: false,
    //     });

    //     return () => {
    //         tlRef.current?.kill();
    //     };
    // }, []);

    // const handleMouseEnter = () => {
    //     if (tlRef.current) {
    //         tlRef.current.pause();
    //         gsap.to(containerRef.current, {
    //             rotation: 0,
    //             duration: 0.6,
    //             ease: "power2.out",
    //         });
    //     }
    // };

    // const handleMouseLeave = () => {
    //     if (tlRef.current) {
    //         tlRef.current.play();
    //     }
    // };

    return (
        <div
            ref={wrapperRef}
            className={`relative ${variant === "mobile" ? "w-40 h-40" : "w-48 h-48"} mx-auto`}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
        >
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
            </div>

            {/* Rotating Circle */}
            <div
                ref={containerRef}
                className="absolute inset-0"
            >
                {Socials.map(({ text, url, icon: Icon }, idx) => {
                    const angle = (idx / Socials.length) * 360;
                    const iconSize = variant === "mobile" ? "text-base" : "text-lg";
                    const buttonSize = variant === "mobile" ? "w-10 h-10" : "w-12 h-12";

                    return (
                        <Link
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={text}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                            }}
                        >
                            <div className={`${buttonSize} rounded-full bg-white/90 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center text-black hover:text-white shadow-lg transition-all duration-300 group-hover:bg-white group-hover:shadow-xl group-hover:scale-110`}>
                                <Icon className={iconSize} />
                            </div>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    {text}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Orbit Ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
        </div>
    );
};

export default CircularSocial;

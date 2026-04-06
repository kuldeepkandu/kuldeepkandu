"use client";

import { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import gsap from "gsap";
import { GiTireIronCross } from "react-icons/gi";

const ContactModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Show modal with animation
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                pointerEvents: "auto",
            });

            gsap.fromTo(
                contentRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );

            // Prevent body scroll
            document.body.style.overflow = "hidden";
        } else {
            // Hide modal with animation
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: "none",
            });

            gsap.to(contentRef.current, {
                scale: 0.9,
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
            });

            // Restore body scroll
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center md:justify-end justify-center p-2 opacity-0 pointer-events-none"
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 p-2 hover:bg-black/5 rounded-full transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <GiTireIronCross className="md:text-2xl text-xl text-black" />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col items-center px-4 sm:px-10 sm:py-16 py-5">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 mb-10">
                        <h1 className=" md:text-2xl text-xl text-start font-semibold text-center">
                            Connect for Infinite Possibilities
                        </h1>

                        {/* <div className="w-16 h-[2px] bg-black" /> */}
                    </div>

                    {/* Form */}
                    <form
                        action="https://getform.io/f/fad5befb-fd45-442d-b24d-ec12339d8510"
                        method="POST"
                        className="flex flex-col w-full max-w-md gap-6 justify-center items-center p-2"
                    >
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="
        w-full
        bg-transparent
        border-b border-black/50
        py-2
        placeholder:text-sm
        placeholder:text-black/60
        hover:placeholder:text-black/20
        placeholder:transition-colors
        duration-300
        focus:outline-none
      "
                        />

                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="
        w-full
        bg-transparent
        border-b border-black/50
        py-2
        placeholder:text-sm
        placeholder:text-black/60
        hover:placeholder:text-black/20
        placeholder:transition-colors
        duration-300
        focus:outline-none
      "
                        />

                        <textarea
                            required
                            name="message"
                            rows={4}
                            placeholder="Your Message"
                            className="
        w-full
        bg-transparent
        border-b border-black/50
        py-2
        resize-none
        placeholder:text-sm
        placeholder:text-black/60
        hover:placeholder:text-black/20
        placeholder:transition-colors
        duration-300
        focus:outline-none
      "
                        />

                        {/* Animated button */}
                        <button
                            type="submit"
                            className="
        relative
        overflow-hidden
        px-6 
        border border-black/50
        hover:rounded-lg
        rounded-full
        font-light
        group
        transition
        duration-300
        ease-in-out
        hover:border-black
        cursor-pointer
      "
                        >
                            <span
                                className="
          block
          transition-transform
          duration-300
          ease-in-out
          group-hover:-translate-y-full
        "
                            >
                                Let&apos;s talk
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
                                Get in touch
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;

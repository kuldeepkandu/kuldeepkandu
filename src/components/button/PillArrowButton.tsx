"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

type PillArrowButtonProps = {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const PillArrowButton = ({ text, href, onClick, className }: PillArrowButtonProps) => {
  const Wrapper: any = href ? Link : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      onClick={onClick}
      className="group inline-flex items-center cursor-pointer"
    >
      {/* TEXT PILL */}
      <div
        className="relative h-14 overflow-hidden rounded-full bg-lime-300 px-8
                   [perspective:800px]"
      >
        {/* background fill */}
        <span
          className={`absolute inset-0 bg-white scale-x-0 origin-left
                     transition-transform duration-300 ease-out
                     group-hover:scale-x-100 ${className}`}
        />

        {/* rotating text */}
        <span
          className="relative z-10 flex h-full items-center justify-center
                     text-black font-medium text-lg
                     transition-transform duration-500 ease-out
                     [transform-style:preserve-3d]
                     group-hover:[transform:rotateY(360deg)]"
        >
          {text}
        </span>
      </div>

      {/* ARROW CIRCLE */}
      <div
        className="relative h-14 w-14 overflow-hidden rounded-full bg-lime-300
                   flex items-center justify-center
                   [perspective:800px]"
      >
        {/* background fill */}
        <span
          className="absolute inset-0 bg-white scale-x-0 origin-left
                     transition-transform duration-300 ease-out
                     group-hover:scale-x-100"
        />

        {/* rotating icon */}
        <span
          className="relative z-10 flex items-center justify-center
                     text-black
                     transition-transform duration-500 ease-out
                     [transform-style:preserve-3d]
                     group-hover:[transform:rotateY(360deg)]"
        >
          <MdArrowOutward size={22} />
        </span>
      </div>
    </Wrapper>
  );
};

export default PillArrowButton;

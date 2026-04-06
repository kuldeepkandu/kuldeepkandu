"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useTransitionRouter } from "next-view-transitions";


interface MenuItemData {
  id: number;
  link: string;
  title: string;
  thumbnail: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff'
}) => {
  
  return (
    <div className="w-full h-[150px] overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full">
        {items.map((item, idx) => (
          <MenuItem
            key={item.id}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  link,
  title,
  thumbnail,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);
    const router = useTransitionRouter();
  const targetHref =  `/work/${id}`;

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

  /* ---------------- SHUTTER TIMELINE ---------------- */
  useEffect(() => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;

    hoverTl.current = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.45,
        ease: 'power4.out'
      }
    });

    return () => {
      hoverTl.current?.kill();
      marqueeTween.current?.kill();
    };
  }, []);

  /* ---------------- MARQUEE COUNT ---------------- */
  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const updateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const part = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!part) return;

      const partWidth = part.getBoundingClientRect().width;
      const viewportWidth = window.innerWidth;

      if (!Number.isFinite(partWidth) || partWidth <= 0 || !Number.isFinite(viewportWidth) || viewportWidth <= 0) {
        return;
      }

      const needed = Math.ceil(viewportWidth / partWidth) + 2;
      const safeRepetitions = Math.min(40, Math.max(4, needed));
      setRepetitions(safeRepetitions);
    };

    updateRepetitions();
    window.addEventListener('resize', updateRepetitions);

    return () => {
      window.removeEventListener('resize', updateRepetitions);
    };
  }, []);

  /* ---------------- INFINITE MARQUEE ---------------- */
  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
    if (!part) return;

    const partWidth = part.getBoundingClientRect().width;
    if (!Number.isFinite(partWidth) || partWidth <= 0) return;

    marqueeTween.current?.kill();

    marqueeTween.current = gsap.to(marqueeInnerRef.current, {
      x: -partWidth,
      duration: speed,
      ease: 'none',
      repeat: -1
    });
  }, [repetitions, speed]);

  /* ---------------- SHUTTER ACTIONS ---------------- */
  const shutterDown = () => {
    hoverTl.current
      ?.clear()
      .fromTo(
        marqueeRef.current,
        { y: '-100%' },
        { y: '0%', overwrite: 'auto' }
      )
      .fromTo(
        marqueeInnerRef.current,
        { y: '100%' },
        { y: '0%' },
        0
      )
      .play();
  };

  const shutterUp = () => {
    hoverTl.current
      ?.clear()
      .to(marqueeRef.current, {
        y: '-100%',
        duration: 0.55,
        ease: 'power4.in',
        overwrite: 'auto'
      })
      .to(
        marqueeInnerRef.current,
        {
          y: '100%',
          duration: 0.55,
          ease: 'power4.in'
        },
        0
      )
      .play();
  };

  return (
    <div
      className="flex-1 relative overflow-hidden text-center"
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
    >
      <Link
        // href={link}
        onClick={(e) => {
          e.preventDefault();
          router.push(targetHref, {
            onTransitionReady: slideInOut,
          });
        }}
        href={targetHref}
        onMouseEnter={shutterDown}
        onMouseLeave={shutterUp}
        className="flex items-center justify-center h-full uppercase font-semibold text-[4vh]"
        style={{ color: textColor }}
      >
        {title}
      </Link>

      <div
        ref={marqueeRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          backgroundColor: marqueeBgColor,
          transform: 'translateY(-100%)',
          willChange: 'transform'
        }}
      >
        <div
          ref={marqueeInnerRef}
          className="h-full w-fit flex items-center"
          style={{ willChange: 'transform' }}
        >
          {Array.from({ length: repetitions }).map((_, idx) => (
            <div
              key={idx}
              className="marquee-part flex items-center flex-shrink-0"
              style={{ color: marqueeTextColor }}
            >
              <span className="uppercase text-[4vh] px-[1vw] whitespace-nowrap">
                {title}
              </span>
              <div
                className="w-[200px] h-[7vh] mx-[2vw] rounded-[50px] bg-cover bg-center"
                style={{ backgroundImage: `url(${thumbnail})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;

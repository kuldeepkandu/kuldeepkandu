"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const VideoPlayer = ({ embedUrl, title, thumbnail }) => {
  const [play, setPlay] = useState(false);

  const getVideoId = (url) => {
    if (!url || typeof url !== "string") return null;

    try {
      const parsedUrl = new URL(url);
      const host = parsedUrl.hostname.replace("www.", "");

      if (host === "youtu.be") {
        return parsedUrl.pathname.replace("/", "") || null;
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || null;
        }

        if (parsedUrl.searchParams.get("v")) {
          return parsedUrl.searchParams.get("v");
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const videoId = useMemo(() => getVideoId(embedUrl), [embedUrl]);

  const videoSrc = useMemo(() => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }, [videoId]);

  if (!videoId) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-5">
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-black/10 bg-black shadow-sm">
        {!play && (
          <div
            className="relative w-full h-full cursor-pointer flex items-center justify-center"
            onClick={() => setPlay(true)}
            aria-label={`Play video: ${title}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPlay(true);
              }
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none md:transition-transform md:duration-700 md:ease-out md:hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full bg-black/60 text-white text-[11px] sm:text-xs font-medium tracking-wide px-3 py-1 backdrop-blur-sm border border-white/20">
              Watch Demo
            </div>
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white/95 rounded-full shadow-xl ring-1 ring-black/10">
              <div className="ml-1 border-l-[12px] border-l-black border-y-[8px] border-y-transparent" />
            </div>
          </div>
        )}
        {play && (
          <iframe
            src={videoSrc}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

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
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        {!play && (
          <div
            className="w-full h-full cursor-pointer flex items-center justify-center bg-black group"
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
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg group-hover:scale-110 transition">
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

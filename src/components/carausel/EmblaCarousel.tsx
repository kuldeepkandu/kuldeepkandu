"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function EmblaCarousel({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();
  const goToSlide = (index: number) => emblaApi?.scrollTo(index);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.plugins().autoplay?.play();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images.length) return null;

  return (
    <div className="embla w-full">
      <div
        className="embla__viewport relative overflow-hidden rounded-2xl border border-black/10 bg-black shadow-xl cursor-grab"
        ref={emblaRef}
      >
        <div className="embla__container">
          {images.map((img, i) => (
            <div
              key={i}
              className="embla__slide md:h-[500px] flex justify-center items-center bg-gradient-to-br from-zinc-900 to-black"
            >
              <img
                src={img}
                alt={`project-${i}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-y-0 left-3 hidden md:flex items-center">
          <button
            className="h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <GrCaretPrevious size={20} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-3 hidden md:flex items-center">
          <button
            className="h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <GrCaretNext size={20} />
          </button>
        </div>

        <div className="absolute right-3 top-3 rounded-full bg-black/60 text-white text-xs px-3 py-1 border border-white/20 backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-4 gap-4 md:hidden">
        <button
          className="embla__prev h-10 w-10 rounded-full border border-black/15 bg-white text-black flex items-center justify-center shadow-sm cursor-pointer"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <GrCaretPrevious size={20} />
        </button>
        <button
          className="embla__next h-10 w-10 rounded-full border border-black/15 bg-white text-black flex items-center justify-center shadow-sm cursor-pointer"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <GrCaretNext size={20} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              index === selectedIndex
                ? "w-7 bg-black"
                : "w-2.5 bg-black/30 hover:bg-black/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";


export default function EmblaCarousel({ images = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if(!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  if (!images.length) return null;

  return (
    <div className="embla w-full">
      <div
        className="embla__viewport 
                   rounded-xl 
                   shadow-2xl 
                   overflow-hidden relative cursor-grab"
        ref={emblaRef}
      >
        <div className="embla__container ">
          {images.map((img, i) => (
            <div
              key={i}
              className="embla__slide md:h-[500px] flex justify-center items-center bg-gradient-to-br from-white to-zinc-900 "
            >
              <img
                src={img}
                alt={`project-${i}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-4 gap-4 md:hidden">
      <button className="embla__prev cursor-pointer" onClick={goToPrev}><GrCaretPrevious size={40} className="text-black/50 rounded-full" /></button>
      <button className="embla__next cursor-pointer" onClick={goToNext}><GrCaretNext size={40} className="text-black/50 rounded-full" /></button>
    </div>
    </div>
  );
}

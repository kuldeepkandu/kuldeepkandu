import { IconType } from "react-icons";

interface CardProps {
  number?: string;
  title: string;
  description: string;
  icon: IconType;
}

export default function Card({
  number = "01",
  title,
  description,
  icon: Icon,
}: CardProps) {
  return (
    <div
      className="
        relative w-full max-w-lg 
        rounded-xl border border-gray-300 
        bg-[#f3f3f3]
        p-6 md:p-8
      "
    >
      {/* Number */}
      <span
        className="
          absolute top-4 right-4 md:top-6 md:right-6
          text-sm md:text-xl text-gray-500
        "
      >
        {number}
      </span>

      {/* Icon */}
      <div className="mb-6 md:mb-10">
        <div
          className="
            flex items-center justify-center
            w-14 h-14 md:w-20 md:h-20
            rounded-full bg-lime-400
          "
        >
          <Icon
            className="
              text-xl md:text-3xl text-black/60
              md:hover:text-black md:hover:scale-125
              transition duration-300 ease-in-out
            "
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="
          text-2xl md:text-4xl
          font-semibold text-gray-900
          leading-snug md:leading-tight
          mb-6 md:mb-10
        "
      >
        {title}
      </h3>

      {/* Divider */}
      <hr className="w-full h-px bg-gray-300 border-0 mb-6 md:mb-8" />

      {/* Description */}
      <p
        className="
          text-base md:text-lg
          text-gray-600 leading-relaxed
        "
      >
        {description}
      </p>
    </div>
  );
}

export default function SplitText({ text, refs }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="inline-block mr-2 will-change-transform"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  )
}

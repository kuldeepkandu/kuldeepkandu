


const Contact = () => {

    return (
        <div className="relative w-full   bg-custom-gradient flex justify-center items-center overflow-hidden">
            {/* Header */}
            <div className="absolute top-10 w-full flex flex-col items-center gap-3 px-6">
                <div className="rounded-full px-6 py-1 text-sm font-light scrollTextSplit">
                    [ Contact Form{" "}
                    <span className="inline-block animate-[ping_2.5s_linear_infinite]">•</span>{" "}
                    ]
                </div>

                <h1 className="hidden sm:block text-2xl font-semibold text-center">
                    Connect for Infinite Possibilities
                </h1>

                <div className="hidden sm:block w-20 h-[2px] bg-black" />
            </div>


            {/* Form */}
            <form
                action="https://getform.io/f/fad5befb-fd45-442d-b24d-ec12339d8510"
                method="POST"
                className="flex flex-col w-full max-w-md gap-6 justify-center items-center sm:mt-10 md:mt-50 lg:mt-50 p-2"
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
                    rows={6}
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
        rounded-full
        font-light
        group
        transition
        duration-300
        ease-in-out
        hover:border-black
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

    )
}
export default Contact;
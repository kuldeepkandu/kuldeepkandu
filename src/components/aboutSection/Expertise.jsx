"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const items = [
    {
      number: "01",
      title: "Full-Stack Architecture",
      description:
        "I architect end-to-end solutions using modern tech stacks—from Node.js backends with PostgreSQL/MongoDB to React and Next.js frontends. Whether building multi-tenant SaaS platforms, real-time dashboards with WebSockets, or RESTful APIs with tRPC, I ensure type-safe, scalable architecture that supports rapid growth and seamless deployment.",
    },
    {
      number: "02",
      title: "AI & Advanced Integration",
      description:
        "I specialize in integrating AI capabilities that deliver real value—implementing RAG systems with vector embeddings, building LangChain workflows, and connecting OpenAI APIs for intelligent automation. Beyond AI, I excel at complex integrations: Stripe/PayPal payment processing, Auth0 authentication, real-time Firebase notifications, and third-party API orchestration that powers sophisticated business logic.",
    },
    {
      number: "03",
      title: "3D & Interactive Experiences",
      description:
        "I create immersive web experiences using Three.js, React Three Fiber, and advanced techniques like Gaussian Splatting. From interactive 3D virtual tours to shader-based animations with GSAP, I transform standard websites into engaging, memorable digital experiences. I optimize WebGL performance for cross-device compatibility while maintaining stunning visual fidelity that makes brands stand out.",
    },
  ];

  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      stagger: 0.5,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        // markers: true, // remove in production
      },
    });
  }, { scope: containerRef });

  return (
    <section className="bg-custom-gradient py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item) => (
            <div key={item.number} className="space-y-6">
              {/* Number */}
              <p className="text-md text-gray-600 font-mono">{item.number}</p>

              {/* Divider */}
              <div className="h-px w-full bg-gray-300" />

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

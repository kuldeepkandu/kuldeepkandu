"use client";
import FlowingMenu from "../../components/FlowingMenu";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Footer from "../../components/footer/Footer";
import { getProjects } from "../../services/projects.api";
import { title } from "node:process";

gsap.registerPlugin(useGSAP);

const WorkClient = ({ project }) => {
  console.log("Client props: ", project.projects);
  const projects = project.projects;

  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.5,
        delay: 1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="min-h-screen bg-custom-gradient">
      <div
        ref={containerRef}
        className="flex-col justify-start items-center py-20 md:px-20 px-6"
      >
        <p className="md:text-6xl text-3xl max-w-3xl font-medium leading-tight capitalize">
          Imagination Trumps Knowledge!{" "}
        </p>
        <div className=" space-y-4 text-base md:text-xl font-light text-gray-700 max-w-2xl mt-4">
          <p className="animate-item">
            Discover my latest projects where design, technology, and creativity
            come together to craft engaging digital experiences. Below is a
            collection of my favourites.
          </p>
        </div>
      </div>
      <div className="h-full" style={{ position: "relative" }}>
        <FlowingMenu
          bgColor="#f2f2f2"
          textColor="black"
          marqueeBgColor="rgba(41, 38, 38, 1)"
          marqueeTextColor="white"
          speed={4}
          items={projects}
          borderColor="rgba(41, 38, 38, 1)"
        />
      </div>

      <Footer />
    </div>
  );
};
export default WorkClient;

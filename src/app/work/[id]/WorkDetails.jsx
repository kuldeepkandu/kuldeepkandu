"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Divider from "../../../components/divider/Divider";
import Footer from "../../../components/footer/Footer";
import CurvedLoop from "../../../components/CurvedLoop";
import EmblaCarousel from "../../../components/carausel/EmblaCarousel";
import FlowingMenu from "../../../components/FlowingMenu";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useTransitionRouter } from "next-view-transitions";
import { deleteProject } from "../../../services/projects.api";
import { useRef, useState } from "react";
import Image from "next/image";
import Loader from "../../../components/loader/Loader";
import { FaArrowDownLong } from "react-icons/fa6";

import { useAuth } from "../../../contexts/authContext";
import VideoPlayer from "../../../components/videoPlayer/VideoPlayer";
import ProjectCard from "../../../components/projectCard/ProjectCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WorkDetails = ({ project, otherProject }) => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".animate-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          delay: 1,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            // markers: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  if (!project) {
    return (
      <div className="flex justify-center items-center text-center text-2xl text-red-400">
        Project Not found
      </div>
    );
  }
  const router = useTransitionRouter();

  const handleEdit = (id) => {
    console.log("edit: ", id);
    router.push(`/work/form/${id}`);
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deleteProject(id);
      alert(response.message);
      console.log("delete: ", id);
      router.push(`/work`);
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="md:pl-20 pl-10 pr-5 md:pr-10">
        {project.map((project) => (
          <div className="" key={project.id} ref={containerRef}>
            {isLoggedIn && (
              <div className="w-full text-end animate-item">
                <button
                  type="button"
                  aria-label="Edit project"
                  onClick={() => handleEdit(project.id)}
                  className="text-sm md:text-lg cursor-pointer hover:text-white hover:bg-black rounded-full p-2 transition duration-300"
                >
                  <MdModeEdit className="" />
                </button>
                <button
                  type="button"
                  aria-label="Delete project"
                  onClick={() => handleDelete(project.id)}
                  className="text-sm md:text-lg cursor-pointer hover:text-white hover:bg-black rounded-full p-2 transition duration-300"
                >
                  <MdDelete className="" />
                </button>
              </div>
            )}

            <div className="animate-item flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="">
                <h1 className="md:text-7xl text-2xl font-semibold">
                  {project.title}
                </h1>
              </div>
              <div className="md:w-80 md:text-end">
                <h1 className="md:text-xl text-black/50 text-sm font-semibold md:mt-20 py-4 italic ">
                  Showcasing creativity Through outstanding project
                </h1>
              </div>
            </div>
            <div className="animate-item text-start text-gray-500 italic py-4 flex items-center gap-2">
              <FaArrowDownLong className="animate-bounce" />
              <p>Scroll to Explore</p>
            </div>

            <div className="animate-item md:mt-10 w-full md:h-150 flex justify-center items-center">
              <Image
                src={project.thumbnail}
                alt="project"
                width={800}
                height={500}
                className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="md:mt-10 py-10">
              <Divider />
            </div>

            <div className="w-full flex justify-center items-center md:px-10 md:py-10">
              <section className="animate-item flex justify-center items-center flex-col">
                <p className="max-w-3xl md:text-xl text-zinc-700 leading-relaxed text-center ">
                  {project.description}
                </p>
              </section>
            </div>
            <div className="w-full md:min-h-screen md:px-10 py-12">
              <div className="animate-item w-full max-w-5xl rounded-full bg-gradient-to-b from-teal-400 to-cyan-500 p-1">
                <EmblaCarousel images={project.images} />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 mt-6 p-4">
              <div className="animate-item flex flex-col justify-start items-start gap-4">
                <h1 className="md:text-5xl text-3xl font-semibold">
                  Tech Stack
                </h1>
                <h1 className="md:text-xl text-gray-400">
                  Technologies and tools used to bring this project to life
                </h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.techs?.map((tech, i) => (
                  <p
                    key={i}
                    className="animate-item p-2 text-sm md:text-base text-center
                 bg-zinc-800 text-white 
                 rounded-full 
                 shadow-md 
                 hover:bg-zinc-700 
                 transition duration-300"
                  >
                    {tech}
                  </p>
                ))}
              </div>
            </div>
            <VideoPlayer
              embedUrl={project.video_url}
              title={project.title}
              thumbnail={project.thumbnail}
            />
          </div>
        ))}
        <div className="">
          <CurvedLoop
            marqueeText="Explore More ✦  Creative Work  ✦ Other Projects ✦"
            className={"animate-item"}
          />
        </div>
      </div>
      <div className="h-full mt-4 hidden md:flex justify-center items-center py-10 animate-item">
        <FlowingMenu
          bgColor="#f2f2f2"
          textColor="black"
          marqueeBgColor="rgba(41, 38, 38, 1)"
          marqueeTextColor="white"
          speed={4}
          items={otherProject}
          borderColor="rgba(41, 38, 38, 1)"
        />
      </div>
      <div className="w-full flex justify-center items-center py-10 px-4 animate-item flex md:hidden">
        <ProjectCard items={otherProject} />
      </div>

      <Footer />
    </div>
  );
};
export default WorkDetails;

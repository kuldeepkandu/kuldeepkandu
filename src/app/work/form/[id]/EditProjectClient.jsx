"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "../../../../components/project/ProjectForm";
import {
  updateProject,
  getProjectById,
} from "../../../../services/projects.api";
import { verifyAuth } from "../../../../services/auth.api";
import { useTransitionRouter } from "next-view-transitions";

export default function EditProjectClient() {
  const { id } = useParams();
  const router = useTransitionRouter();
  const [project, setProject] = useState(null);

  // Client-side auth guard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAuth();
        if (!response?.success) router.push("/login");
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  function slideInOut() {
    try {
      document.documentElement.animate(
        [
          { opacity: 1, scale: 1, transform: "translateY(0)" },
          { opacity: 0.5, scale: 0.9, transform: "translateY(-100px)" },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-old(root)",
        },
      );
      document.documentElement.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
          duration: 1500,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (err) {
      console.warn("view-transition animation failed", err);
    }
  }

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id);
      setProject(data.projects[0]);
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (formData) => {
    const data = await updateProject(id, formData);
    alert(data.message);
    if (!data.success) {
      throw new Error(data.message || "Failed to update project");
    }
    router.push(`/work/${id}`, { onTransitionReady: slideInOut });
  };

  if (!project) return <p>Loading...</p>;

  return (
    <ProjectForm
      initialData={project}
      onSubmit={handleUpdate}
      submitText="Update Project"
    />
  );
}

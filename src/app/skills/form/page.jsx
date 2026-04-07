"use client";

import { useEffect } from "react";
import SkillsForm from "../../../components/skills/SkillsForm";
import { createSkillCategory } from "../../../services/skillsCategory";
import { verifyAuth } from "../../../services/auth.api";
import { useTransitionRouter } from "next-view-transitions";

const skillForm = () => {

  const router = useTransitionRouter();

  // Client-side auth guard (via backend session check)
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

  const handleCreate = async (FormData) => {
    try {
      const data = await createSkillCategory(FormData);
      alert(data.message || "Skill created successfully");
      if (!data.success) {
        throw new Error(data.message || "Failed to create skill");
      }
      router.push(`/about/`, {
      onTransitionReady: slideInOut,
    });
    } catch (error) {
      alert(error.message || "Failed to create skill");
      console.error("Create skill error: ", error);
    }
  };
  return (
      <SkillsForm onSubmit={handleCreate} submitText="Create Skill" />
  
  );
};
export default skillForm;

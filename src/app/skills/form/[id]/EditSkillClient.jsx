"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SkillsForm from "../../../../components/skills/SkillsForm";
import { updateSkillCategory, getSkillCategoryById } from "../../../../services/skillsCategory";
import { useTransitionRouter } from "next-view-transitions";

export default function EditSkillClient() {
  const { id } = useParams();
  const [skillCategory, setSkillCategory] = useState(null);
  const router = useTransitionRouter();

  // Client-side auth guard
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) router.push("/login");
  }, []);

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
    const fetchSkillCategory = async () => {
      const data = await getSkillCategoryById(id);
      setSkillCategory(data);
    };
    fetchSkillCategory();
  }, [id]);

  const handleUpdate = async (formData) => {
    const data = await updateSkillCategory(id, formData);
    alert(data.message);
    if (!data.success) {
      throw new Error(data.message || "Failed to update skill category");
    }
    router.push("/about", { onTransitionReady: slideInOut });
  };

  if (!skillCategory) return <div>Loading...</div>;

  return (
    <SkillsForm
      initialData={skillCategory}
      onSubmit={handleUpdate}
      submitText="Update Skill Category"
    />
  );
}

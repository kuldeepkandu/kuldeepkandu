import { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useTransitionRouter } from "next-view-transitions";
import { deleteSkillCategory } from "../../services/skillsCategory";
import Loader from "../loader/Loader";

import { useAuth } from "../../contexts/authContext";

const SkillCategory = ({ id, category, skills, onDeleteSuccess }) => {
  const router = useTransitionRouter();
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useAuth();

  const handleEdit = (id) => {
    console.log("edit: ", id);
    router.push(`/skills/form/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this skill category?")
      ) {
        setLoading(true);
        const response = await deleteSkillCategory(id);
        alert(response.message);
        console.log("delete: ", id);
        onDeleteSuccess?.(id);
      }
    } catch (error) {
      console.error("Failed to delete skills category:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div key={id} className="md:space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3 className="md:text-2xl text-xl font-semibold">{category}</h3>
        {isLoggedIn && (
        <div className="w-full text-end animate-item">
          <button
            type="button"
            aria-label="Edit project"
            onClick={() => handleEdit(id)}
            className="text-sm md:text-lg cursor-pointer hover:text-white hover:bg-black rounded-full p-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <MdModeEdit className="" />
          </button>
          <button
            type="button"
            aria-label="Delete project"
            onClick={() => handleDelete(id)}
            className="text-sm md:text-lg cursor-pointer hover:text-white hover:bg-black rounded-full p-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <MdDelete className="" />
          </button>
        </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-white hover:bg-black hover:text-white transition duration-300 ease-in-out text-gray-800 text-sm md:text-base font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;

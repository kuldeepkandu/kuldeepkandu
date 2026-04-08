import { useEffect, useState } from "react";
import { getStack } from "../../services/projects.api";
import AsyncSelect from 'react-select/async';
import Loader from "../loader/Loader";
import Link from "next/link";

const SkillsForm = ({ initialData = {}, onSubmit, submitText = "Submit" }) => {
  const [form, setForm] = useState({
    skill: "",
    tech_ids: [],
  });

  const [techSelect, setTechSelect] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialData?.id) return;

    const initializeForm = async () => {
      const normalizedTechIds = initialData.tech_ids?.map(Number) || [];

      setForm({
        skill: initialData.skill || "",
        tech_ids: normalizedTechIds,
      });

      if (!normalizedTechIds.length) {
        setTechSelect([]);
        return;
      }

      const allTechOptions = await fetchTechStack();
      const selectedTech = allTechOptions.filter((tech) =>
        normalizedTechIds.includes(Number(tech.value)),
      );
      setTechSelect(selectedTech);
    };

    initializeForm();
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchTechStack = async () => {
    const data = await getStack();

    return data.techStacks.map((tech) => ({
      value: tech.id,
      label: tech.name,
    }));
  };

  const loadTechOptions = async (inputValue) => {
    const techstack = await fetchTechStack();

    return techstack.filter((tech) =>
      tech.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const handleTechChange = (selected) => {
    setTechSelect(selected);

    const ids = selected ? selected.map((tech) => tech.value) : [];

    setForm((prev) => ({
      ...prev,
      tech_ids: ids,
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (error) {
      console.error("Error submitting skill form: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
        {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="section-shell-tight max-w-4xl p-4 md:p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Skill Details</h2>
            <p className="text-sm text-gray-500">Add the technologies that belong to this skill group.</p>
          </div>
          <div className="self-start">
            <div className="p-[1px] rounded-lg bg-gradient-to-r from-slate-500 via-gray-500 to-slate-700 shadow-sm">
              <Link
                href={"/work/form"}
                className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:text-gray-900"
              >
                Create Project
              </Link>
            </div>
          </div>
        </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 md:p-6 lg:p-8">
        <div>
          <input
            type="text"
            name="skill"
            id="skill"
            value={form.skill}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Skill Category (e.g., Frontend, Backend)"
          />
        </div>
        <div data-lenis-prevent>
          <label htmlFor="tech_ids" className="block text-sm font-medium text-gray-700">
            Technologies
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              value={techSelect}
              loadOptions={loadTechOptions}
              onChange={handleTechChange}
              className="mt-1"
              placeholder="Select technologies..."
            />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
            disabled={loading}
          >
            {submitText}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
export default SkillsForm;

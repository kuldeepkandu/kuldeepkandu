"use client";

import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import ImageUploader from "../imageUploader/ImageUploader";
import Loader from "../loader/Loader";
import { getStack } from "../../services/projects.api";
import Link from "next/link";


const ProjectForm = ({ initialData = {}, onSubmit, submitText = "Submit" }) => {
  console.log("FormData: ", initialData);

 

  const [form, setForm] = useState({
    title: "",
    description: "",
    github_url: "",
    live_url: "",
    video_url: "",
    tech_ids: [],
  });

  const [techSelect, setTechSelect] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // populate form when editing
  useEffect(() => {
  if (!initialData?.id) return;

  setForm({
    title: initialData.title || "",
    description: initialData.description || "",
    github_url: initialData.github_url || "",
    live_url: initialData.live_url || "",
    video_url: initialData.video_url || "",
    tech_ids: initialData.tech_ids?.map(Number) || [],
  });

  // prefill tech stack
  if (initialData.tech_ids?.length) {
    const selectedTech = initialData.tech_ids.map((id, index) => ({
      value: Number(id),
      label: initialData.techs[index],
    }));

    setTechSelect(selectedTech);
  }

  // prefill images
  if (initialData.images?.length) {
    setImages(initialData.images);
  }

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

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "tech_ids") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    images.forEach((img) => formData.append("images", img));

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
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
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
            <p className="text-sm text-gray-500">Create a project entry and connect it with the right skills.</p>
          </div>
          <div className="self-start">
            <div className="p-[1px] rounded-lg bg-gradient-to-r from-slate-500 via-gray-500 to-slate-700 shadow-sm">
              <Link
                href={"/skills/form"}
                className="inline-flex items-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:text-gray-900"
              >
                Create Skills
              </Link>
            </div>
          </div>
        </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid md:grid-cols-2 gap-4"
      >
        <input
          name="title"
          value={form.title}
          placeholder="Project Title"
          className="border rounded-lg p-2 md:col-span-2"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="border rounded-lg p-2 col-span-2"
          onChange={handleChange}
        />

        <input
          name="github_url"
          value={form.github_url}
          placeholder="Github URL"
          className="border rounded-lg p-2"
          onChange={handleChange}
        />

        <input
          name="live_url"
          value={form.live_url}
          placeholder="Live URL"
          className="border rounded-lg p-2"
          onChange={handleChange}
        />

        <input
          name="video_url"
          value={form.video_url}
          placeholder="Video URL"
          className="border rounded-lg p-2"
          onChange={handleChange}
        />
        <div data-lenis-prevent className="">
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={loadTechOptions}
          value={techSelect}
          onChange={handleTechChange}
          placeholder="Select Tech Stack"
        />
        </div>
<div className="md:col-span-2">
        <ImageUploader images={images} setImages={setImages} />
</div>
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-500 text-white p-2 rounded-lg hover:bg-slate-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm font-medium md:col-span-2"
        >
          {loading ? "Submitting..." : submitText}
        </button>
      </form>
      </div>
    </div>
  );
};

export default ProjectForm;

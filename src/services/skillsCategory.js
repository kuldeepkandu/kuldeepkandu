import { fetchData } from "../lib/api";

export const getSkillsAndCategories = async() => {
    const data = await fetchData("project/get-skills-and-categories");
    console.log("API skills response: ", data)
    return data;
}

const createSkillCategory = async(formData) => {
    return fetchData(`project/create-skills-and-categories`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    });
}

const getSkillCategoryById = async(id) => {
    const data = await fetchData(`project/get-skills-and-categories/${id}`);
    return data?.skill || null;
}

const updateSkillCategory = async (id, formData) => {
    const isFormData = typeof FormData !== "undefined" && formData instanceof FormData;
    return fetchData(`project/update-skills-and-categories/${id}`, {
        method: "PUT",
        ...(isFormData
            ? { body: formData }
            : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) }),
    });
}

const deleteSkillCategory = async(id) => {
    return fetchData(`project/delete-skills-and-categories/${id}`, {
        method: "DELETE",
    });
}

export { createSkillCategory, updateSkillCategory, deleteSkillCategory, getSkillCategoryById };
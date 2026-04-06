import { fetchData } from "../lib/api";

export const getProjects = async() => {
  const data = await fetchData("project/get-all-projects");
  // console.log("API project response: ", data)
  return data;
};

export const getProjectById = async(id) => {
  const data = await fetchData(`project/get-project/${id}`);
  return data;
};

export const createProject = async(formData) => {
  return fetchData(`project/create-project`, {
    method: "POST",
    body: formData,
  });
};

export const updateProject = async(id, data) => {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  return fetchData(`project/update-project/${id}`, {
    method: "PUT",
    ...(isFormData
      ? { body: data }
      : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  });
};

export const deleteProject = async(id) => {
  return fetchData(`project/delete-project/${id}`, {
    method: "DELETE",
  });
};

export const deleteImageFromCloudinary = async(url) => {
  return fetchData(`project/delete-image/`, {
    method: "DELETE",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });
}

export const getStack = async() => {
  const data = await fetchData("project/get-tech-stacks");
  console.log("API tech response: ", data)
  return data;
};

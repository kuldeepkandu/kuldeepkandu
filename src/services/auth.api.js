import { fetchData } from "../lib/api";

export const login = async(formData) => {
    return fetchData(`auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    })
}



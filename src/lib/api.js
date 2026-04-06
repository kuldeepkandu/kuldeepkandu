
const BASE_URL = process.env.NEXT_BACKEND_URL || "http://localhost:5000/api/v1/";

export async function fetchData(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        ...options
    });
    return res.json();
}




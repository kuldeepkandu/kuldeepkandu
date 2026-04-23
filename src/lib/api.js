
const RAW_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1/";

const BASE_URL = RAW_BASE_URL.endsWith("/") ? RAW_BASE_URL : `${RAW_BASE_URL}/`;

function buildApiError(message, details = {}) {
    const error = new Error(message);
    Object.assign(error, details);
    return error;
}

export async function fetchData(path, options = {}) {
    const requestUrl = `${BASE_URL}${path}`;

    let res;

    try {
        res = await fetch(requestUrl, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });
    } catch (error) {
        throw buildApiError(
            `Unable to reach the backend at ${BASE_URL}. Make sure the API server is running.`,
            {
                cause: error,
                requestUrl,
            },
        );
    }

    const contentType = res.headers.get("content-type") || "";
    const isJsonResponse = contentType.includes("application/json");
    const payload = isJsonResponse ? await res.json() : await res.text();

    if (!isJsonResponse) {
        const preview = typeof payload === "string"
            ? payload.replace(/\s+/g, " ").slice(0, 120)
            : "";

        throw buildApiError(
            `Expected JSON from ${requestUrl}, but received ${contentType || "an unknown response"}.${preview ? ` Response preview: ${preview}` : ""}`,
            {
                status: res.status,
                requestUrl,
                responseBody: payload,
            },
        );
    }

    if (!res.ok) {
        throw buildApiError(
            payload?.message || `Request failed with status ${res.status}`,
            {
                status: res.status,
                requestUrl,
                responseBody: payload,
            },
        );
    }

    return payload;
}




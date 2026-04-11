const BASE_URL = "https://growzy-backend.vercel.app/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (res.status === 401) {
        // 🔥 AUTO LOGOUT
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Unauthorized: Token invalid or expired");
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "API Error");
    }

    return data;
};
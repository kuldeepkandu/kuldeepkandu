import {cookies} from "next/headers";

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return {
            isLoggedIn: false,
            token: null,
        };
    }

    return {
        isLoggedIn: !!token,
        token,
    };
} 
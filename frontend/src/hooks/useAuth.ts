import {
    getLocalStorage,
    removeLocalStorage,
    setLocalStorage,
} from "../helpers/localstorage";

export default function useAuth({
    setIsAuthenticated,
}: {
    setIsAuthenticated: (value: boolean) => void;
}) {
    const removeUserData = () => {
        setIsAuthenticated(false);
        setLocalStorage("isAuthenticated", "false");
        removeLocalStorage("githubData");
        removeLocalStorage("token");
        removeLocalStorage("user");
    };
    const logout = async () => {
        try {
            const token = getLocalStorage("token");
            if (!token) return;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const response = await fetch(
                `${import.meta.env.VITE_SERVER}/api/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            removeUserData();
            window.location.href = "/";
        }
    };

    const login = () => {
        setIsAuthenticated(true);
        setLocalStorage("isAuthenticated", "true");
    };

    return { logout, login };
}

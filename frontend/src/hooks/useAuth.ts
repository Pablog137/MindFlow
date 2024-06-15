import {
    createCookie,
    removeLocalStorage,
    setCookie,
} from "../helpers/localstorage";

export default function useAuth({
    setIsAuthenticated,
}: {
    setIsAuthenticated: (value: boolean) => void;
}) {
    const removeUserData = () => {
        setIsAuthenticated(false);
        setCookie("isAuthenticated", "false");
        removeLocalStorage("githubData");
        removeLocalStorage("token");
        removeLocalStorage("user");
    };
    const logout = async () => {
        removeUserData();
    };

    const login = () => {
        setIsAuthenticated(true);
        // setLocalStorage("isAuthenticated", "true");
        createCookie("isAuthenticated", "true", 3);
    };

    return { logout, login };
}

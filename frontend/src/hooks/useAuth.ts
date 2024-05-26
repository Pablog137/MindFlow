import { removeLocalStorage, setLocalStorage } from "../helpers/localstorage";

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
        removeUserData();
    };

    const login = () => {
        setIsAuthenticated(true);
        setLocalStorage("isAuthenticated", "true");
    };

    return { logout, login };
}

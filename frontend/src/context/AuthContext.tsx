import { createContext, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localstorage";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface Context {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}
const AuthContext = createContext<Context>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        getLocalStorage("isAuthenticated") === "true" ? true : false
    );

    const login = () => {
        setIsAuthenticated(true);
        setLocalStorage("isAuthenticated", "true");
    };

    const logout = () => {
        setIsAuthenticated(false);
        setLocalStorage("isAuthenticated", "false");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

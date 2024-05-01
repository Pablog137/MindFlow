import { createContext, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localstorage";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface Context {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    userType: string;
    changeUserType: (newType: string) => void;
}
const AuthContext = createContext<Context>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userType: "user",
    changeUserType: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        getLocalStorage("isAuthenticated") === "true" ? true : false
    );
    const [userType, setUserType] = useState("");

    const login = () => {
        setIsAuthenticated(true);
        setLocalStorage("isAuthenticated", "true");
    };

    const changeUserType = (newType: string) => {
        setUserType(newType);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setLocalStorage("isAuthenticated", "false");
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, userType, changeUserType }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

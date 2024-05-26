import { createContext, useState } from "react";
import { getLocalStorage } from "../helpers/localstorage";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface Context {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    userType: string;
    changeUserType: (newType: string) => void;
}
const AuthContext = createContext<Context>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    userType: "user",
    changeUserType: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        getLocalStorage("isAuthenticated") === "true" ? true : false
    );
    const [userType, setUserType] = useState("");

    const changeUserType = (newType: string) => {
        setUserType(newType);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                userType,
                changeUserType,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

import { createContext, useState } from "react";
import { getLocalStorage, getUserType, setLocalStorage } from "../helpers/localstorage";

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
    const [userType, setUserType] = useState(getUserType());

    const changeUserType = (newType: string) => {
        setUserType(newType);
        const userData = getLocalStorage("user");
        if(userData){
            const data = JSON.parse(userData);
            data.user_type = newType;
            setLocalStorage("user", JSON.stringify(data));
        }
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

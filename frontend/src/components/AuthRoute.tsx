import { AuthContext } from "../context/AuthContext";
import NotFound from "../pages/NotFound";
import React, { useContext } from "react";

interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const { userType } = useContext(AuthContext);
    const hasPrivileges = userType === "admin" || userType === "premium";

    return hasPrivileges ? <>{children}</> : <NotFound />;
};

export default AuthRoute;

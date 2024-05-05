import { isAdmin } from "../helpers/localstorage";
import NotFound from "../pages/NotFound";
import React from "react";


interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    return isAdmin() ? <>{children}</> : <NotFound />;
};

export default AuthRoute;

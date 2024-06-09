import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getLocalStorage } from "../helpers/localstorage";
import NotFound from "../pages/NotFound";

export default function ProtectedRouteForuser() {
    const { isAuthenticated, userType } = useContext(AuthContext);
    return isAuthenticated &&
        getLocalStorage("token") &&
        userType === "user" ? (
        <Outlet />
    ) : (
        <NotFound />
    );
}

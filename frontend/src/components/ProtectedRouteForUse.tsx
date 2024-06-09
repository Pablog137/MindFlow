import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getLocalStorage } from "../helpers/localstorage";

export default function ProtectedRouteForuser() {
    const { isAuthenticated, userType } = useContext(AuthContext);
    return isAuthenticated &&
        getLocalStorage("token") &&
        userType === "user" ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCookie, getLocalStorage } from "../helpers/localstorage";

export default function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated && getCookie("isAuthenticated") && getLocalStorage("token") ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}

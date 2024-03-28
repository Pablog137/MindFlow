import LandingPage from "./pages/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import InProgress from "./pages/InProgress";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

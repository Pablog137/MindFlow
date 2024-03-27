import LandingPage from "./pages/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import InProgress from "./pages/InProgress";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<InProgress />} />
                    <Route path="/register" element={<InProgress />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

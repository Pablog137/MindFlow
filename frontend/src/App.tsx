import LandingPage from "./pages/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import InProgress from "./pages/InProgress";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
// import InProgress from "./pages/InProgress";
import Calendar from "./pages/Calendar";
import Github from "./pages/Github";
import Note from "./pages/Note";
import GithubIndividualProject from "./components/GithubDataManager/DetailsProject";
import GithubLoginPage from "./pages/GithubLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Statistics from "./pages/Statistics";

export default function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/todo-list" element={<TodoList />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/github" element={<Github />} />
                            <Route
                                path="/github/login"
                                element={<GithubLoginPage />}
                            />
                            <Route
                                path="github/viewRepo/:id"
                                element={<GithubIndividualProject />}
                            />
                            <Route path="/new-note/:id" element={<Note />} />
                            <Route path="/statistics" element={<Statistics />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

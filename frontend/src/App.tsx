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
import GithubIndividualProject from "./components/Github Data Manager/GithubIndividualProject";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/todo-list" element={<TodoList />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/github" element={<Github />} />
                    <Route
                        path="github/viewRepo/:id"
                        element={<GithubIndividualProject />}
                    />
                    <Route path="/new-note" element={<Note />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

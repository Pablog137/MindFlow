import { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import "../styles/pages/Dashboard.css";
import ModalSearch from "./ModalSearch";
import { elements } from "../data/lists";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { setLocalStorage, getLocalStorage } from "../helpers/localstorage";
import { useNavigate } from "react-router-dom";

type NotesManagementContext = {
    toggleModal: () => void;
    isModalOpen: boolean;
    notePages: Note[];
    handleCreateNewNote: () => void;
    setNotePages: (content: []) => void;
    handleDeleteTask: (
        e: React.MouseEvent<HTMLButtonElement>,
        id?: string
    ) => void;
};

export const NotesManagementContext = createContext<NotesManagementContext>({
    toggleModal: () => {},
    isModalOpen: false,
    notePages: [],
    handleCreateNewNote: () => {},
    setNotePages: () => {},
    handleDeleteTask: () => {},
});
export default function AppStructure({ MainComponent }: any) {
    const navigate = useNavigate();

    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listElements, setListElements] = useState<ElementNav[]>([]);
    const [notePages, setNotePages] = useState<Note[]>([]);
    const [countNotes, setCountNotes] = useState(0);

    const createNewNote = () => {
        const id = uuidv4();
        const newNote = { id, title: "Untitled", content: "" };
        setNotePages((prevPages) => [...prevPages, newNote]);
        setLocalStorage("notePages", JSON.stringify([...notePages, newNote]));

        return id;
    };

    const handleCreateNewNote = () => {
        if (countNotes < 3) {
            const newNoteId = createNewNote();
            setCountNotes(countNotes + 1);
            setTimeout(() => {
                window.location.href = "/new-note/" + newNoteId;
            }, 0);
        }
    };
    const handleDeleteTask = (
        e: React.MouseEvent<HTMLButtonElement>,
        id?: string
    ) => {
        e.preventDefault();
        if (!id) return;
        const notePages = getLocalStorage("notePages");
        if (notePages) {
            const data = JSON.parse(notePages);
            const newData = data.filter((note: any) => note.id !== id);
            localStorage.setItem("notePages", JSON.stringify(newData));
            setNotePages(newData);
            setCountNotes(countNotes - 1);
            navigate("/dashboard");
        }
    };

    useEffect(() => {
        setListElements(elements);
        const notePages = getLocalStorage("notePages");
        if (notePages !== null) {
            setNotePages(JSON.parse(notePages));
            setCountNotes(JSON.parse(notePages).length);
        }
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    const colsAside = isAsideOpen ? "col-span-1 lg:col-span-2" : "hidden";
    const colMain = isAsideOpen
        ? "col-span-11 sm:col-span-11 lg:col-span-10"
        : "col-span-12";

    return (
        <>
            <Navbar isAsideOpen={isAsideOpen} toggleAside={toggleAside} />
            <NotesManagementContext.Provider
                value={{
                    toggleModal,
                    isModalOpen,
                    notePages,
                    handleCreateNewNote,
                    setNotePages,
                    handleDeleteTask,
                }}
            >
                <div
                    className={`grid grid-cols-12 ${
                        isModalOpen && "opacity-60"
                    }`}
                >
                    <MainComponent
                        isAsideOpen={isAsideOpen}
                        colsAside={colsAside}
                        colMain={colMain}
                    />
                </div>

                <ModalSearch
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    listElements={[...listElements, ...notePages]}
                />
            </NotesManagementContext.Provider>
        </>
    );
}

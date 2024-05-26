import { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import "../styles/pages/Dashboard.css";
import ModalSearch from "./ModalSearch";
import { elements } from "../data/lists";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { setLocalStorage, getLocalStorage } from "../helpers/localstorage";

type NotesManagementContext = {
    toggleModal: () => void;
    isModalOpen: boolean;
    notePages: Note[];
    handleCreateNewNote: () => void;
    setNotePages: (content: []) => void;
};


export const NotesManagementContext = createContext<NotesManagementContext>({
    toggleModal: () => {},
    isModalOpen: false,
    notePages: [],
    handleCreateNewNote: () => {},
    setNotePages: () => {},
});
export default function AppStructure({ MainComponent }: any) {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listElements, setListElements] = useState<ElementNav[]>([]);
    const [notePages, setNotePages] = useState<Note[]>([]);

    const createNewNote = () => {
        const id = uuidv4();
        const newNote = { id, title: "Untitled", content: "" };
        setNotePages((prevPages) => [...prevPages, newNote]);
        setLocalStorage("notePages", JSON.stringify([...notePages, newNote]));

        return id;
    };

    const handleCreateNewNote = () => {
        const newNoteId = createNewNote();
        setTimeout(() => {
            window.location.href = "/new-note/" + newNoteId;
        }, 0);
    };

    useEffect(() => {
        setListElements(elements);
        const notePages = getLocalStorage("notePages");
        notePages !== null && setNotePages(JSON.parse(notePages));
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

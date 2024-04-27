import { useEffect, useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import logo from "../assets/img/logo-32.png";
import "../styles/pages/Dashboard.css";
import ModalSearch from "./ModalSearch";
import { elements } from "../data/navs";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateRandomString } from "../helpers/utils";
import { setLocalStorage, getLocalStorage } from "../helpers/localstorage";

type ComponentProps = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
    logo: string;
};
type Note = {
    id: string;
    note: string;
};

type SearchPageContextType = {
    toggleModal: () => void;
    isModalOpen: boolean;
    notePages: Note[];
    createNewNote: () => void;
};

type Props = {
    MainComponent: (props: ComponentProps) => JSX.Element;
};

export const SearchPageContext = createContext<SearchPageContextType>({
    toggleModal: () => {},
    isModalOpen: false,
    notePages: [],
    createNewNote: () => {},
});
export default function AppStructure({ MainComponent }: Props) {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listElements, setListElements] = useState<ElementNav[]>([]);
    const [notePages, setNotePages] = useState<{ id: string; note: string }[]>(
        []
    );

    const createNewNote = () => {
        const name = generateRandomString();
        const id = uuidv4();
        setNotePages((prevPage) => [...prevPage, { id, note: name }]);
        setLocalStorage(
            "notePages",
            JSON.stringify([...notePages, { id, note: name }])
        );
        // navigate("/new-note");
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
            <SearchPageContext.Provider
                value={{ toggleModal, isModalOpen, notePages, createNewNote }}
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
                        logo={logo}
                    />
                </div>

                <ModalSearch
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    listElements={listElements}
                />
            </SearchPageContext.Provider>
        </>
    );
}

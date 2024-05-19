import AsideElement from "./AsideElement";
import { elements } from "../data/lists";
import Search from "./Dashboard/Search";
import { NotesManagementContext } from "./AppStructureContainer";
import { useContext } from "react";
import { isAdmin } from "../helpers/localstorage";

type Props = {
    isAsideOpen: boolean;
    type?: string;
};

export default function Aside({ isAsideOpen, type }: Props) {
    const { notePages, createNewNote } = useContext(NotesManagementContext);
    const handleCreateNewNote = () => {
        const newNoteId = createNewNote();
        setTimeout(() => {
            window.location.href = "/new-note/" + newNoteId;
        }, 0);
    };

    return (
        <aside
            id="logo-sidebar"
            className={`h-full pt-6 transition-transform ${
                isAsideOpen ? "-translate-x-0" : "-translate-x-full"
            } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 pt-10`}
            aria-label="Sidebar"
        >
            <div className="h-full md:px-3 xl:px-4 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="font-medium flex flex-col items-center lg:items-start justify-start list-none">
                    <Search />
                    {elements.map(
                        (element, index) =>
                            (!element.protected || isAdmin()) && (
                                <AsideElement
                                    key={index}
                                    text={element.text}
                                    icon={element.icon}
                                    url={element.url}
                                    isSelected={
                                        element.url.substring(1) === type
                                    }
                                />
                            )
                    )}
                    {notePages.length > 0 &&
                        notePages.map((note) => (
                            <li className="p-2" key={note.id}>
                                <a
                                    href={`/new-note/${note.id}`}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <i
                                        className={`fa-solid fa-book text-xl md:text-2xl transition duration-75  dark:group-hover:text-white ${
                                            note.id.toString() === type
                                                ? "text-gray-900"
                                                : "group-hover:text-gray-900  text-gray-500 dark:text-gray-400"
                                        }
                        `}
                                    ></i>
                                    <span className="flex-1 whitespace-nowrap ms-3 hidden lg:flex">
                                        {note.title}
                                    </span>
                                </a>
                            </li>
                        ))}
                    <li className="p-2">
                        <a
                            onClick={handleCreateNewNote}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <i className="fa-solid fa-plus text-xl md:text-2xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                            <span className="flex-1 whitespace-nowrap ms-3 hidden lg:flex">
                                New note
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

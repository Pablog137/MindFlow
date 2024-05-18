import { useContext } from "react";
import { NotesManagementContext } from "../AppStructureContainer";

type NotesManagementContext = {
    toggleModal: () => void;
};
export default function Search() {
    const { toggleModal }: NotesManagementContext = useContext(
        NotesManagementContext
    );

    return (
        <>
            <li className="p-2">
                <a
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={() => toggleModal()}
                >
                    <i
                        className={
                            "fa-solid fa-magnifying-glass text-xl md:text-2xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        }
                    ></i>
                    <span className="flex-1 whitespace-nowrap ms-3 hidden lg:flex">
                        Search
                    </span>
                </a>
            </li>
        </>
    );
}

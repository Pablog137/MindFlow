import { useState } from "react";

type Props = {
    isModalOpen: boolean;
    toggleModal: () => void;
    listElements: ElementNav[];
};

export default function ModalSearch({
    isModalOpen,
    toggleModal,
    listElements,
}: Props) {
    const [showIcon, setShowIcon] = useState(-1);
    const [searchValue, setSearchValue] = useState("");

    const filteredResults = listElements.filter((element) =>
        element.text.startsWith(searchValue)
    );

    return (
        <>
            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 bg-white rounded-lg shadow-md p-3 w-full md:max-w-lg"
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="grid grid-cols-12 items-center pt-1 px-2 border-b rounded-t dark:border-gray-600">
                            <form className="flex items-center gap-3 col-span-11">
                                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search pages.."
                                    className="px-2 py-4 w-full border-0 outline-none"
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                />
                            </form>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="col-span-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* TODO Bring Data from API (Pages asociated to the user)*/}
                        <ul className="max-h-[35vh] overflow-y-auto p-1">
                            {filteredResults.map((element, index) => {
                                return (
                                    <li
                                        className="px-2 pt-1"
                                        key={index}
                                        onMouseOver={() => setShowIcon(index)}
                                        onMouseLeave={() => setShowIcon(-1)}
                                    >
                                        <a
                                            href={element.url}
                                            className="flex items-center justify-between p-1 gap-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <div>
                                                <i
                                                    className={
                                                        element.icon +
                                                        " text-lg text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                    }
                                                ></i>
                                                <span className="flex-1 whitespace-nowrap ms-3 lg:flex">
                                                    {element.text}
                                                </span>
                                            </div>
                                            {showIcon === index && (
                                                <i className="fa-regular fa-square-caret-left text-gray-700"></i>
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

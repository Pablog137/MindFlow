import { Tooltip } from "@mui/material";

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>, id?: string | number) => void;
    type: string;
    id?: string | number;
};

export default function RemoveItem({
    isModalOpen,
    setIsModalOpen,
    handleDelete,
    type,
    id,
}: Props) {
    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (type === "note" && typeof id === "string") {
            handleDelete(e, id);
        } else if (type === "task" && typeof id === "number") {
            handleDelete(e, id);
        } else {
            handleDelete(e);
        }
    };
    return (
        <>
            <Tooltip title="Delete" arrow>
                <i
                    className="fa-solid fa-trash text-red-500 hover:text-red-300 hover:text-xl text-lg"
                    aria-hidden="true"
                    onClick={() => setIsModalOpen(true)}
                ></i>
            </Tooltip>
            {isModalOpen && (
                <div
                    id="deleteModal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 flex  justify-center z-50"
                >
                    <div className="relative p-4">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="deleteModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg
                                className="text-gray-400 dark:text-gray-500 w-8 h-8 sm:w-10 sm:h-11 mb-3.5 mx-auto"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300 text-sm sm:text-md">
                                Are you sure you want <br />
                                to delete this item?
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    data-modal-toggle="deleteModal"
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-2 px-3 text-xs sm:text-sm  font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    No, cancel
                                </button>
                                <button
                                    type="submit"
                                    // onClick={handleDelete}
                                    onClick={onDelete}
                                    className="py-2 px-3 text-xs sm:text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

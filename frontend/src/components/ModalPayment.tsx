import { useEffect, useRef } from "react";
import ListElement from "./UI-Items/ListElement";
import moneyImg from "../assets/img/money-64.png";
import { BASE_PRICE } from "../common/utils/constants";

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
};

export default function ModalPayment({ showModal, setShowModal }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    return (
        <>
            {showModal && (
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 bg-white rounded-lg shadow-md  w-full md:max-w-xl m-2"
                    ref={modalRef}
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex pt-1 px-2 border-b rounded-t dark:border-gray-600">
                            <button
                                onClick={() => setShowModal(false)}
                                type="button"
                                className="col-span-1 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600"
                            >
                                <svg
                                    className="w-4 h-4 text-red-500"
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
                        <div className="text-black justify-center p-2">
                            <div className="p-2 sm:p-0 sm:col-span-6 col-span-12 flex justify-start">
                                <div className="w-full rounded-xl p-4 overflow-hidden flex flex-col justify-between">
                                    <div className="px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="font-bold text-3xl md:text-4xl mb-2">
                                                Premium
                                            </div>
                                            <img src={moneyImg} alt="" />
                                        </div>
                                        <h5 className="text-3xl md:text-4xl font-bold mt-5 mb-5 text-center">
                                            {BASE_PRICE} $ / month
                                        </h5>

                                        <ul className="text-gray-700 text-base list-none">
                                            <ListElement
                                                text="All app features"
                                                whiteMode={true}
                                            />
                                            <ListElement
                                                text="Create up to 10 note pages"
                                                whiteMode={true}
                                            />
                                            <ListElement
                                                text="Access to graphs and analytics"
                                                whiteMode={true}
                                            />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

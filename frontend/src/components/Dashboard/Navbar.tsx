import { useContext, useState } from "react";
import logo from "../../assets/img/logo-32.png";
import { getUserData } from "../../helpers/localstorage";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

type Props = {
    isAsideOpen: boolean;
    toggleAside: () => void;
};

export default function Navbar({ isAsideOpen, toggleAside }: Props) {
    const [showProfile, setShowProfile] = useState(false);
    const [userData] = useState(getUserData());
    const { setIsAuthenticated } = useContext(AuthContext);
    const { logout } = useAuth({ setIsAuthenticated });

    const handleSignOut = () => {
        logout();
    };
    return (
        <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            onClick={toggleAside}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <a className="flex ms-2 md:me-24">
                            <img src={logo} className="h-8 me-3" alt="Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                MindFlow
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                    onClick={() => setShowProfile(!showProfile)}
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                        alt="user photo"
                                    />
                                </button>
                                {showProfile && (
                                    <div
                                        className={`z-50 absolute mt-2 right-0  list-none bg-gray-100 divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                                        id="user-dropdown"
                                    >
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">
                                                {userData.name}
                                            </span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                                {userData.email}
                                            </span>
                                        </div>
                                        <ul
                                            className="list-none"
                                            aria-labelledby="user-menu-button"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-300 hover:rounded-lg hover:text-black hover:font-semibold dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    onClick={handleSignOut}
                                                >
                                                    Sign out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`z-50 ${
                                    isAsideOpen ? "block" : "hidden"
                                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                                id="dropdown-user"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

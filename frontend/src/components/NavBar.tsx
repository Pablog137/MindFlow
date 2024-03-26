import imagen from "../assets/img/a.png";
import { useState } from "react";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        {
            name: "Features",
            url: "#",
        },
        {
            name: "Why MindFlow",
            url: "#",
        },
        {
            name: "Pricing",
            url: "#",
        },
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="border-gray-200 dark:bg-gray-900">
            <div className="grid grid-cols-12 pt-6 pe-8 ps-8 items-center">
                <div className="col-span-8 grid grid-cols-12 space-x-3 items-center">
                    <div className="flex col-span-3 ">
                        <img
                            src={imagen}
                            className="h-8 me-2"
                            alt="Flowbite Logo"
                        />
                        <span className="text-2xl font-semibold text-white">
                            MindFlow
                        </span>
                    </div>

                    <ul
                        className={`space-x-4 md:flex hidden col-span-9 text-gray-400 font-semibold ${
                            menuOpen ? "hidden" : ""
                        }`}
                    >
                        {links.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} className="hover:text-white">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-4 justify-self-end space-x-3 items-center pe-2 md:hidden">
                    <i
                        className="fa-solid fa-bars text-white"
                        style={{ fontSize: "30px" }}
                        onClick={toggleMenu}
                    ></i>
                </div>

                {menuOpen && (
                    <div className="col-span-12 mt-4 md:hidden">
                        <ul className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                        onClick={toggleMenu}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li className="bg-gray-100">
                                <a className="block px-4 py-2 cursor-pointer text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ">
                                    Log in
                                </a>
                            </li>
                            <li className="bg-gray-100">
                                <a className="block px-4 py-2 cursor-pointer text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                                    Sign up
                                </a>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="col-span-4 justify-end space-x-3 items-center pe-2 hidden md:flex font-semibold">
                    <button className="text-white hover:bg-gray-100 hover:text-black  px-4 py-2 rounded-md">
                        Log in
                    </button>
                    <div className="w-px bg-gray-400 h-10"></div>
                    <button className="text-white hover:bg-gray-100 hover:text-black px-4 py-2 rounded-md">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

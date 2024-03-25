import imagen from "../assets/img/a.png";

export default function NavBar() {
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

                    <ul className="flex space-x-4 col-span-9 text-gray-400 font-bold">
                        {links.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    className="hover:text-blue-500"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-4 flex justify-end space-x-3 items-center pe-2">
                    <button className="text-white px-4 py-2 rounded-md">
                        Log in
                    </button>
                    <div className="w-px bg-gray-400 h-10"></div>
                    <button className="text-white px-4 py-2 rounded-md">
                        Sign Up
                    </button>
                    <i
                        className="fa-regular fa-moon text-white "
                        style={{ fontSize: "30px" }}
                    ></i>
                </div>
            </div>
        </nav>
    );
}

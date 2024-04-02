import AsideElement from "./AsideElement";

const elements = [
    {
        text: "Dashboard",
        icon: "fa-solid fa-house",
    },
    {
        text: "Todo List",
        icon: "fa-solid fa-list-check",
    },
    {
        text: "Calendar",
        icon: "fa-solid fa-calendar",
    },
    {
        text: "Github",
        icon: "fa-brands fa-github",
    },
    {
        text: "New Note",
        icon: "fa-solid fa-plus",
    },
];
export default function Aside({ isAsideOpen }) {
    return (
        <aside
            id="logo-sidebar"
            className={`h-screen pt-6 transition-transform ${
                isAsideOpen ? "-translate-x-0" : "-translate-x-full"
            } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 pt-10`}
            aria-label="Sidebar"
        >
            <div className="h-full md:px-3 xl:px-4 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="font-medium flex flex-col items-center lg:items-start justify-start ">
                    {elements.map((element, index) => (
                        <AsideElement
                            key={index}
                            text={element.text}
                            icon={element.icon}
                        />
                    ))}
                </ul>
            </div>
        </aside>
    );
}

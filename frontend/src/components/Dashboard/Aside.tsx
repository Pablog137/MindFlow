import AsideElement from "./AsideElement";
import { elements } from "../../data/navs";

type Props = {
    isAsideOpen: boolean;
};

export default function Aside({ isAsideOpen }: Props) {
    return (
        <aside
            id="logo-sidebar"
            className={`h-full pt-6 transition-transform ${
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
                            url={element.url}
                        />
                    ))}
                </ul>
            </div>
        </aside>
    );
}

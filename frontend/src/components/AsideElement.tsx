type Props = {
    text: string;
    icon: string;
    url?: string;
    isSelected: boolean;
};

export default function AsideElement({ text, icon, url, isSelected }: Props) {
    return (
        <li className="p-2">
            <a
                href={url}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                <i
                    className={`
                        ${icon} text-xl md:text-2xl transition duration-75  dark:group-hover:text-white ${
                        isSelected
                            ? "text-gray-900"
                            : "group-hover:text-gray-900  text-gray-500 dark:text-gray-400"
                    }
                        `}
                ></i>
                <span className="flex-1 whitespace-nowrap ms-3 hidden lg:flex">
                    {text}
                </span>
            </a>
        </li>
    );
}

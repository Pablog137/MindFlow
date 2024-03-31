interface ElementNavProps {
    text: string;
    icon: string;
    link: string;
}

const ElementNav: React.FC<ElementNavProps> = ({ text, icon, link }) => {
    return (
        <li className="flex items-center justify-start hover:bg-blue-300">
            <a href={link} className="flex items-center w-full py-3 px-5">
                <i className={`${icon} mr-4 text-gray-800`}></i>
                <p>{text}</p>
            </a>
        </li>
    );
};

export default ElementNav;

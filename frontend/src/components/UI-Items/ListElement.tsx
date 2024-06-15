type Props = {
    text: string;
    whiteMode?: boolean;
};

export default function ListElement({ text, whiteMode = false }: Props) {
    return (
        <li
            className={`${
                whiteMode ? "text-black" : "text-white"
            } text-md md:text-lg`}
        >
            <i className="fa-solid fa-check text-green-800 me-2"></i>
            {text}
        </li>
    );
}

type Props = {
    text: string;
};

export default function ListElement({ text }: Props) {
    return (
        <li className="text-white text-md md:text-lg">
            <i className="fa-solid fa-check text-green-800 me-2"></i>
            {text}
        </li>
    );
}

type Props = {
    text: string;
};

export default function ListWrongElement({ text }: Props) {
    return (
        <li className="text-white text-md md:text-lg">
            <i className="fa-solid fa-xmark text-red-700 me-2"></i>
            {text}
        </li>
    );
}

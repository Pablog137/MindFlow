import { ReactElement } from "react";

type Props = {
    type: string;
    content: ReactElement | string;
    persistent: boolean;
    handleCommandClick: (command: string, persistent: boolean) => void;
    selectedCommand: string | null;
};

export default function Command({
    type,
    content,
    persistent,
    handleCommandClick,
    selectedCommand,
}: Props) {
    const handleClick = () => {
        handleCommandClick(type, persistent);
    };

    return (
        <li>
            <button
                onClick={handleClick}
                className={`p-2 lg:p-3 font-serif font-bold hover:bg-gray-200 hover:rounded-md ${
                    persistent && selectedCommand === type
                        ? "bg-gray-400 rounded-md"
                        : ""
                }`}
            >
                {content}
            </button>
        </li>
    );
}

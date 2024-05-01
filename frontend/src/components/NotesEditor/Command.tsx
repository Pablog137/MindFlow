import { ReactElement } from "react";

type Props = {
    executeCommand: (command: string) => void;
    type: string;
    content: ReactElement | string;
    addCommandToSelected: (command: string) => void;
    removeCommandFromSelected: (command: string) => void;
    isSelected: boolean;
};

export default function Command({
    executeCommand,
    type,
    content,
    addCommandToSelected,
    isSelected,
    removeCommandFromSelected,
}: Props) {
    const handleClick = () => {
        if (isSelected) {
            executeCommand(type);
            removeCommandFromSelected(type);
        } else {
            executeCommand(type);
            addCommandToSelected(type);
        }
    };
    return (
        <li>
            <button
                onClick={handleClick}
                className={`p-2 lg:p-3 font-serif font-bold hover:bg-gray-200 hover:rounded-md ${
                    isSelected ? "bg-gray-400 rounded-md hover:bg-gray-400" : ""
                }`}
            >
                {content}
            </button>
        </li>
    );
}

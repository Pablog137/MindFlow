import { ReactElement } from "react";

type Props = {
    executeCommand: (command: string) => void;
    type: string;
    content: ReactElement | string;
    addCommandToSelected: (command: string) => void;
    removeCommandFromSelected: () => void;
    selectedCommand: string | null;
};

export default function Command({
    type,
    content,
    addCommandToSelected,
    selectedCommand,
    removeCommandFromSelected,
}: Props) {
    const handleClick = () => {
        if (selectedCommand === type) {
            removeCommandFromSelected();
        } else {
            addCommandToSelected(type);
        }
    };

    return (
        <li>
            <button
                onClick={handleClick}
                className={`p-2 lg:p-3 font-serif font-bold hover:bg-gray-200 hover:rounded-md ${
                    selectedCommand === type ? "bg-gray-400 rounded-md" : ""
                }`}
            >
                {content}
            </button>
        </li>
    );
}

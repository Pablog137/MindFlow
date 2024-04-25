import { ReactElement } from "react";

type Props = {
    executeCommand: (command: string) => void;
    type: string;
    content: ReactElement | string;
};

export default function Command({ executeCommand, type, content }: Props) {
    return (
        <button
            onClick={() => executeCommand(type)}
            className="p-3 md:p-4 font-serif font-bold"
        >
            {content}
        </button>
    );
}

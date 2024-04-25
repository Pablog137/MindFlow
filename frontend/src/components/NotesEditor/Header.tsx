import Command from "./Command";
import { useState } from "react";
import { commandsData } from "../../data/Commands";

export default function Header() {
    const [selectedCommands, setSelectedCommands] = useState<string[]>([]);

    const executeCommand = (command: string) => {
        document.execCommand(command);
    };

    const addCommandToSelected = (commandType: string) => {
        if (!selectedCommands.includes(commandType)) {
            setSelectedCommands((prevSelectedCommands) => [
                ...prevSelectedCommands,
                commandType,
            ]);
        }
    };

    const removeCommandFromSelected = (commandType: string) => {
        setSelectedCommands((prevSelectedCommands) =>
            prevSelectedCommands.filter((command) => command !== commandType)
        );
    };

    return (
        <header className="bg-white text-black p-4 my-5 mt-10 rounded-md flex items-center text-lg justify-around ">
            {commandsData.map((command, index) => (
                <Command
                    key={index}
                    executeCommand={executeCommand}
                    type={command.type}
                    content={command.content}
                    addCommandToSelected={addCommandToSelected}
                    removeCommandFromSelected={removeCommandFromSelected}
                    isSelected={selectedCommands.includes(command.type)}
                />
            ))}
        </header>
    );
}

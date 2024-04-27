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
        <header className="p-4 my-5 md:mt-10 flex items-center text-sm md:text-md lg:text-lg justify-around ">
            <ul className="list-none flex bg-white text-black p-4 rounded-md gap-2 lg:gap-4 flex-wrap justify-center items-center">
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
            </ul>
        </header>
    );
}

import Command from "./Command";
import { useState } from "react";
import { commandsData } from "../../data/Commands";

export default function Header() {
    const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

    const executeCommand = (command: string) => {
        document.execCommand(command);
    };

    const addCommandToSelected = (commandType: string) => {
        // Revert the previous command if there is one
        if (selectedCommand) {
            document.execCommand(selectedCommand);
        }
        setSelectedCommand(commandType);
        executeCommand(commandType);
    };

    const removeCommandFromSelected = () => {
        if (selectedCommand) {
            document.execCommand(selectedCommand);
        }
        setSelectedCommand(null);
    };

    return (
        <header className="p-4 my-5 md:mt-10 flex items-center text-sm md:text-md lg:text-lg justify-around">
            <ul className="list-none flex bg-white text-black p-4 rounded-md gap-2 lg:gap-4 flex-wrap justify-center items-center">
                {commandsData.map((command, index) => (
                    <Command
                        key={index}
                        executeCommand={executeCommand}
                        type={command.type}
                        content={command.content}
                        addCommandToSelected={addCommandToSelected}
                        removeCommandFromSelected={removeCommandFromSelected}
                        selectedCommand={selectedCommand}
                    />
                ))}
            </ul>
        </header>
    );
}

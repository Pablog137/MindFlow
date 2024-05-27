import Command from "./Command";
import { useState, useEffect } from "react";
import { commandsData } from "../../data/Commands";

export default function Header() {
    const [selectedCommand, setSelectedCommand] = useState<string | null>(null);

    const executeCommand = (command: string) => {
        document.execCommand(command);
    };

    interface CommandStates {
        [key: string]: boolean;
    }
    const handleCommandClick = (commandType: string, persistent: boolean) => {
        if (persistent) {
            if (selectedCommand === commandType) {
                document.execCommand(commandType);
                setSelectedCommand(null);
            } else {
                if (selectedCommand) {
                    document.execCommand(selectedCommand);
                }
                setSelectedCommand(commandType);
                executeCommand(commandType);
            }
        } else {
            executeCommand(commandType);
            if (selectedCommand) {
                document.execCommand(selectedCommand);
                setSelectedCommand(null);
            }
        }
    };
    useEffect(() => {
        const checkCommandState = () => {
            const commandStates: CommandStates = commandsData.reduce(
                (acc, command) => {
                    if (command.persistent) {
                        acc[command.type] = document.queryCommandState(
                            command.type
                        );
                    }
                    return acc;
                },
                {} as CommandStates
            );

            const activeCommand = Object.keys(commandStates).find(
                (cmd) => commandStates[cmd]
            );
            setSelectedCommand(activeCommand || null);
        };

        document.addEventListener("selectionchange", checkCommandState);
        return () => {
            document.removeEventListener("selectionchange", checkCommandState);
        };
    }, []);

    return (
        <header className="p-4 my-5 md:mt-10 flex items-center text-sm md:text-md lg:text-lg justify-around">
            <ul className="list-none flex bg-white text-black p-4 rounded-md gap-2 lg:gap-4 flex-wrap justify-center items-center">
                {commandsData.map((command, index) => (
                    <Command
                        key={index}
                        type={command.type}
                        content={command.content}
                        persistent={command.persistent}
                        handleCommandClick={handleCommandClick}
                        selectedCommand={selectedCommand}
                    />
                ))}
            </ul>
        </header>
    );
}

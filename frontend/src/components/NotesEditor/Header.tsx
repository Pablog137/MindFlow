import Command from "./Command";

export default function Header() {
    const executeCommand = (command: string) => {
        document.execCommand(command);
    };

    return (
        <header className="bg-white text-black p-4 my-5 mt-10 rounded-md flex items-center text-lg justify-around ">
            <Command
                executeCommand={executeCommand}
                type={"bold"}
                content={<i className="fa-solid fa-bold"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"italic"}
                content={<i className="fa-solid fa-italic"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"underline"}
                content={<i className="fa-solid fa-underline"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"overline"}
                content={"V"}
            />

            <Command
                executeCommand={executeCommand}
                type={"justifyCenter"}
                content={<i className="fa-solid fa-align-justify"></i>}
            />

            <Command
                executeCommand={executeCommand}
                type={"justifyLeft"}
                content={<i className="fa-solid fa-align-left"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"justifyRight"}
                content={<i className="fa-solid fa-align-right"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"insertUnorderedList"}
                content={<i className="fa-solid fa-list"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"insertOrderedList"}
                content={<i className="fa-solid fa-list-ol"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"undo"}
                content={<i className="fa-solid fa-rotate-left"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"selectAll"}
                content={<i className="fa-solid fa-hand-pointer"></i>}
            />
            <Command
                executeCommand={executeCommand}
                type={"unlink"}
                content={<i className="fa-solid fa-link-slash"></i>}
            />
        </header>
    );
}

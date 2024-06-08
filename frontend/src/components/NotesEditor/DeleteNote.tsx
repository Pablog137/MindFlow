import { useContext, useState } from "react";
import RemoveItem from "../UI-Items/RemoveItem";
import { NotesManagementContext } from "../AppStructureContainer";

export default function DeleteNote({ id }: { id: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleDeleteTask } = useContext(NotesManagementContext);

    return (
        <RemoveItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleDeleteTask}
            type="note"
            id={id}
        />
    );
}

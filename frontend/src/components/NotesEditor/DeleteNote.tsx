import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../helpers/localstorage";
import { useState } from "react";
import RemoveItem from "../UI-Items/RemoveItem";

export default function DeleteNote({ id }: { id: string }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const notePages = getLocalStorage("notePages");
        if (notePages) {
            const data = JSON.parse(notePages);
            const newData = data.filter((note: any) => note.id !== id);
            localStorage.setItem("notePages", JSON.stringify(newData));
            navigate("/dashboard");
        }
    };

    return (
        <RemoveItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleDeleteTask}
        />
    );
}

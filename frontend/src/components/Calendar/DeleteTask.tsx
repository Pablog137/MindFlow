import { DragContext } from "./Main";
import { useContext } from "react";
import "../../styles/components/Calendar/DeleteTask.css";

type Props = {
    drop: any;
};

const DeleteTask = ({ drop }: Props) => {
    const { isDraggingInUse, setIsDraggingInUse } = useContext(
        DragContext
    ) as DragContextType;

    const handleDrop = () => {
        setIsDraggingInUse(false);
    };

    return (
        <div onDrop={handleDrop}>
            {isDraggingInUse && (
                <i
                    ref={drop}
                    className={`fa-solid fa-trash p-2 mt-3 text-red-400 text-2xl trash-icon active`}
                ></i>
            )}
        </div>
    );
};

export default DeleteTask;

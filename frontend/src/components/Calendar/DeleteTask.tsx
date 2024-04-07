import { DragContext } from "./Main";
import { useContext } from "react";

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
                    className={`fa-solid fa-trash p-2 text-red-400 text-2xl`}
                ></i>
            )}
        </div>
    );
};

export default DeleteTask;

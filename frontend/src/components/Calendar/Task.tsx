import { TagColors } from "../../common/utils/enum";
import { useDrag } from "react-dnd";
import { DragContext } from "./Main";
import { useContext, useEffect } from "react";

type Props = {
    task: CalendarTask;
};

export default function Task({ task }: Props) {
    const { setIsDraggingInUse } = useContext(DragContext) as DragContextType;
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    useEffect(() => {
        setIsDraggingInUse(isDragging);
    }, [isDragging]);

    return (
        <li className={`p-2 list-none ${isDragging && "hidden"}`}>
            <p
                ref={drag}
                className={`text-sm font-regular p-1 rounded-md ${
                    TagColors[task.tag]
                }`}
            >
                {task.description}
            </p>
        </li>
    );
}

import { TagColors } from "../../enums/enum";
import { useDrag } from "react-dnd";

type Props = {
    task: CalendarTask;
};

export default function Task({ task }: Props) {
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (
        <li ref={drag} className={`p-2 ${isDragging && "hidden"}`}>
            <p
                className={`text-sm font-regular p-1 rounded-md ${
                    TagColors[task.tag]
                }`}
            >
                {task.description}
            </p>
        </li>
    );
}

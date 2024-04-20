type Task = {
    id: number | string;
    status: string;
    priority: number;
    description: string;
    due_date: string;
};

type CalendarTask = {
    id: number | string;
    tag: TaskTag;
    description: string;
    date: string;
};

enum TaskTag {
    Personal = "Personal",
    Work = "Work",
    Study = "Study",
    Other = "Other",
}

type DragContextType = {
    setIsDraggingInUse: React.Dispatch<React.SetStateAction<boolean>>;
    isDraggingInUse: boolean;
};

type ElementNav = {
    text: string;
    icon: string;
    url: string;
};

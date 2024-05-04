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

type GithubData = {
    username: string;
    access_token: string;
};

type PieChartData = {
    label: string;
    value: number;
};

type Note = {
    id: string;
    title: string;
    content: string;
};

type Period = "lastWeek" | "lastMonth" | "today";
type Type = "github" | "todoList" | "calendarTasks";

interface TodoListTask {
    id: number;
    content: string;
    status: Status;
    difficulty: Difficulty;
    created_at: string;
    updated_at: string | null;
    closed_at: string | null;
}

type Status = "todo" | "doing" | "done";
type Difficulty = "easy" | "medium" | "hard";

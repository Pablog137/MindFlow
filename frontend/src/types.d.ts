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
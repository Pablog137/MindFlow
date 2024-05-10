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

type Period = "lastWeek" | "lastMonth" | "thisWeek" | "thisMonth";
type Type = "todoList" | "calendarTasks";

type Task = {
    id: number | string;
    status: string;
    priority: number;
    description: string;
    due_date: string;
};

type CalendarTask = {
    id: number | string;
    priority: number;
    description: string;
    date: string;
};

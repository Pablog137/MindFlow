interface TodoListTask {
    id: number ;
    status: Status;
    difficulty: number;
    content: string;
    due_date: string | null;
    closed_at: string | null;
    created_at: string ;
}

interface CalendarTask {
    id: number ;
    content: string;
    date: string;
    tag: Tag;
    closed_at: string | null;
    created_at: string ;
}


type Tag = "Work" | "Study" | "Personal" | "Other";
type Status = "todo" | "doing" | "done";
type Difficulty = "easy" | "medium" | "hard";
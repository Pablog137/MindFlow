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

interface Repo {
    id: number;
    name: string;
    updated_at: string;
    visibility: string;
    open_issues_count: number;
    created_at: string;
    pushed_at: string;
    url: string;
    language?: string;
}


type Tag = "Work" | "Study" | "Personal" | "Other";
type Status = "todo" | "doing" | "done";
type Difficulty = "easy" | "medium" | "hard";

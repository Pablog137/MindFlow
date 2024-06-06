import { getLocalStorage } from "../helpers/localstorage";

export default async function getTasksForUser(url: string) {
    const token = getLocalStorage("token");
    if (!token) return;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    const response = await fetch(
        import.meta.env.VITE_SERVER + url,
        requestOptions
    );
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
}

export const manageTaskAPI = async (
    url: string,
    newTask: any,
    method: string
) => {
    const token = getLocalStorage("token");
    if (!token) return;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(newTask),
    };

    const response = await fetch(
        import.meta.env.VITE_SERVER + url,
        requestOptions
    );
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
};

export const createTaskAPI = async (
    url: string,
    newTask: TodoListTask,
    method: string,
    updateTaskState: (tempId: number, createdTask: TodoListTask) => void,
    revertLastState: (tempId: number) => void,
    handleNewError: (error: string) => void
) => {
    try {
        const token = getLocalStorage("token");
        if (!token) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(newTask),
        };

        const response = await fetch(
            import.meta.env.VITE_SERVER + url,
            requestOptions
        );
        const createdTask = await response.json();
        updateTaskState(newTask.id, createdTask.data);
    } catch (error: any) {
        console.error("Error : " + error);
        handleNewError(error.message);
        // Revertir el estado si la llamada a la API falla
        revertLastState(newTask.id);
    }
};

export const createCalendarTaskAPI = async (
    url: string,
    newTask: CalendarTask,
    method: string,
    updateTaskState: (tempId: number, createdTask: CalendarTask) => void,
    revertLastState: (tempId: number) => void,
    handleNewError: (error: string) => void
) => {
    try {
        const token = getLocalStorage("token");
        if (!token) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(newTask),
        };

        const response = await fetch(
            import.meta.env.VITE_SERVER + url,
            requestOptions
        );
        const createdTask = await response.json();
        updateTaskState(newTask.id, createdTask.data);
    } catch (error: any) {
        console.error("Error : " + error);
        handleNewError(error.message);
        // Revertir el estado si la llamada a la API falla
        revertLastState(newTask.id);
    }
};

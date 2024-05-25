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

export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key: string) {
    return localStorage.getItem(key);
}

export function getGithubUserData() {
    const storedData = localStorage.getItem("githubData");
    return storedData ? JSON.parse(storedData) : null;
}

export const isAdmin = () => {
    const user = getLocalStorage("user");
    if (!user) return false;
    const userParsed = JSON.parse(user);
    return userParsed.user_type === "admin";
};

export const getUserData = () => {
    const user = getLocalStorage("user");
    if (!user) return null;
    return JSON.parse(user);
};

// export function getGithubUsername(){
//     const storedData = localStorage.getItem("githubData");
//     return storedData ? JSON.parse(storedData).username : null;
// }
// export function getGithubToken(){
//     const storedData = localStorage.getItem("githubData");
//     return storedData ? JSON.parse(storedData).token : null;
// }

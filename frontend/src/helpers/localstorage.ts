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

// export function getGithubUsername(){
//     const storedData = localStorage.getItem("githubData");
//     return storedData ? JSON.parse(storedData).username : null;
// }
// export function getGithubToken(){
//     const storedData = localStorage.getItem("githubData");
//     return storedData ? JSON.parse(storedData).token : null;
// }

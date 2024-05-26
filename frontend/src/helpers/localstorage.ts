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

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const createCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};



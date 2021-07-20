const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getTokenStorage() {
    const json = localStorage.getItem(TOKEN_KEY);
    if (!json) return null;
    return atob(json);
}

export function saveTokenStorage(token) {
    localStorage.setItem(TOKEN_KEY, btoa(token));
}

export function removeTokenStorage() {
    localStorage.removeItem(TOKEN_KEY);
}

export function getUserStorage() {
    const json = localStorage.getItem(USER_KEY);
    if (!json) return null;
    return JSON.parse(atob(json));
}

export function saveUserStorage(user) {
    const json = btoa(JSON.stringify(user));
    localStorage.setItem(USER_KEY, json);   
}

export function removeUserStorage() {
    localStorage.removeItem(USER_KEY);
}
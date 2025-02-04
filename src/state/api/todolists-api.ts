import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8991b5d6-8bb8-4a7f-8b55-9a76b32fc425"
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings);
        return promise;
    }
}
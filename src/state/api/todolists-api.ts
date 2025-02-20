import axios from "axios"

const token = localStorage.getItem("token");

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8991b5d6-8bb8-4a7f-8b55-9a76b32fc425"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}

type GetTasksResponse = {
    items: Array<TaskType>,
    totalCount: number,
    error: string | null
}

type AuthorizeResponse = {
    resultCode: number,
    messages: Array<number>,
    data: {
        userId: number,
        token: string
    }
}

export const setAuthToken = (token: string | null) => {
    if (token) {
        instance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers["Authorization"];
    }
};


export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists");
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
        return promise;
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`);
        return promise;
    },
    updateTodolistTitle(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title });
        return promise;
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: title });
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<Array<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title });
    },
    changeTaskPlace(todolistId: string, taskId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, { putAfterItemId: putAfterItemId });
    },
    authorize() {
        const email = "masha.denisova.1384@gmail.com";
        const password = "School.2002";
        return instance.post<AuthorizeResponse>('auth/login', {
            email,
            password,
            rememberMe: true
        }, { withCredentials: true }).then(res => {
            console.log("Успешный вход:", res.data);
            if (res.data.data.token) {
                localStorage.setItem("token", res.data.data.token);
            }
        }).catch(err => {
            console.error("Ошибка входа:", err);
        });
    }
}
import React, { useEffect, useState } from 'react';
import { todolistsAPI } from '../state/api/todolists-api';

export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistsAPI.createTodolist("Masha todolist")
            .then((res) => {
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "ce401126-a9b9-438b-9a22-90e4008e2495"
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "e2f2226a-d780-465f-88ac-ff3f8156b24d";
        todolistsAPI.updateTodolistTitle(todolistId, "Yo-Yo")
            .then((res) => {
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <button onClick={getTasks}>Get Tasks</button>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <input placeholder={"title"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
                <button onClick={deleteTask}>Delete Task</button>
            </div>
        </div>)
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const createTasks = () => {
        todolistsAPI.createTasks(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <input placeholder={"title"} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
                <button onClick={createTasks}>Create Task</button>
            </div>
        </div>)
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const updateTaskTitle = () => {
        todolistsAPI.updateTaskTitle(todolistId, taskId, "Yo-Yo-Yo")
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <input placeholder={"taskId"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
                <input placeholder={"taskTitle"} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
                <button onClick={updateTaskTitle}>Update Task Title</button>
            </div>
        </div>)
}
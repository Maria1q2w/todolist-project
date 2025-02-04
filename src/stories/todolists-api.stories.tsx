import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { todolistsAPI } from '../state/api/todolists-api';

export default {
    title: "API"
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8991b5d6-8bb8-4a7f-8b55-9a76b32fc425"
    }
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
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", { title: "Masha todolist" }, settings)
            .then((res) => {
                debugger;
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "ce401126-a9b9-438b-9a22-90e4008e2495"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                debugger;
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "e2f2226a-d780-465f-88ac-ff3f8156b24d";
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title: "Yo-Yo" }, settings)
            .then((res) => {
                debugger;
                setState(res.data);
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
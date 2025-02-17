import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TaskApiType, TasksStateType } from '../AppWithRedux';

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todoListId: string,
    taskId: string
}

export type ChangeStatusTaskActionType = {
    type: "CHANGE-STATUS",
    taskId: string,
    isDone: boolean,
    todolistId: string
}

export type ChangeTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE",
    taskId: string,
    title: string,
    todolistId: string
}

export type SetTasksActionType = {
    type: "SET-TASKS",
    todoListId: string,
    tasks: Array<TaskApiType>
}
export type TaskTypeWithIsDone = TaskApiType & { isDone: boolean };

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType | ChangeTitleTaskActionType | AddTodolistActionType | RemoveTodolistActionType | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            let newTask: TaskTypeWithIsDone = {
                id: action.taskId,
                title: action.title,
                isDone: false,
                todoListId: action.todoListId
            };
            let tasks = stateCopy[action.todoListId] || [];
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-STATUS": {
            const stateCopy = { ...state };
            let tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t);
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todolistId];

            if (!tasks) return state;
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? { ...t, title: action.title } : t);
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };

            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]: action.tasks.map(task => ({
                    ...task,
                    isDone: false
                }))
            };

        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId: todolistId, taskId: taskId }
}
export const addTaskAC = (title: string, todoListId: string, taskId: string): AddTaskActionType => {
    return { type: "ADD-TASK", title: title, todoListId: todoListId, taskId: taskId };
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusTaskActionType => {
    return { type: "CHANGE-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId };
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleTaskActionType => {
    return { type: "CHANGE-TASK-TITLE", taskId: taskId, title: title, todolistId: todolistId };
}
export const setTasksAC = (todoListId: string, tasks: Array<TaskApiType>): SetTasksActionType => {
    return { type: "SET-TASKS", todoListId: todoListId, tasks: tasks };
}
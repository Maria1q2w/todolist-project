import { action } from '@storybook/addon-actions';
import { FilterValuesType, TodolistApiType, TodolistType } from '../AppWithRedux';

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS",
    todolists: Array<TodolistApiType>
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType;

const initialState: Array<TodolistType> = [];


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [{ id: action.todolistId, title: action.title, filter: "all" }, ...state];
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        case "SET-TODOLISTS": {
            const todolistsWithFilter = action.todolists.map(todolist => ({
                ...todolist,
                filter: "all" as FilterValuesType
            }));
            return todolistsWithFilter;
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: title, todolistId: todolistId }
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter }
}
export const setTodolistsAC = (todolists: Array<TodolistApiType>): SetTodolistsActionType => {
    return { type: "SET-TODOLISTS", todolists: todolists }
}
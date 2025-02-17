import { Provider } from "react-redux";
import React from "react";
import { store } from "../state/store";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import { v1 } from "uuid";
import { AppRootState } from "../state/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: v1(), title: "HTML&CSS", isDone: true, todoListId: "rtyuio-4556" },
            { id: v1(), title: "JS", isDone: true.valueOf, todoListId: "rtyuio-45565t5t" }
        ],
        ["todolistId2"]: [
            { id: v1(), title: "Milk", isDone: true, todoListId: "rtyuio-4556hh" },
            { id: v1(), title: "React Book", isDone: true, todoListId: "rtyuio-45564443" }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>)
};
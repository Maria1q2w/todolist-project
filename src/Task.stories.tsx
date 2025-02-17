import React from "react";
import { action } from '@storybook/addon-actions';
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
    title: "Task Component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const taskCallback = action("Button 'add' was pressed inside the task");

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{ id: '1', title: 'CSS', isDone: true, todoListId: "todolistId1" }}
        />
        <button onClick={taskCallback} />
        <Task
            task={{ id: '2', title: 'CSS + HTML', isDone: false, todoListId: "todolistId2" }}
        />
        <button onClick={taskCallback} />
    </>
}
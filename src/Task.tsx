import { Checkbox } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskTypeWithIsDone } from "./state/tasks-reducer";
import { DeleteTask, UpdateTaskTitle } from "./stories/todolists-api.stories";
import "./Task.css";

type TaskPropsType = {
    task: TaskTypeWithIsDone
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onRemoveHandler = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.task.todoListId))
    }, [dispatch, props.task.id, props.task.todoListId]);

    const onChangeTitleHandler = useCallback((newTitle: string, taskId: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
    }, [dispatch]);

    return (<div key={props.task.id} className="task-item" style={{ display: "flex", alignItems: "center", width: "100%" }} >
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone} />
        <div style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            display: "inline-block",
            flexGrow: 1,
            minWidth: 0
        }}>
            <UpdateTaskTitle asString={false} taskId={props.task.id} newTitle={props.task.title} todolistId={props.task.todoListId} onChange={onChangeTitleHandler} />
        </div>
        <div className="delete-task-icon">
            <DeleteTask asString={false} id={props.task.id} todolistId={props.task.todoListId} onRemoveHandler={onRemoveHandler} />
        </div>
    </div>)
});

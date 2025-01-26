import { Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { EditableSpan } from "./EditableSpan";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { TaskType } from "./Todolist";
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId]);
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    }, [dispatch, props.task.id, props.todolistId]);
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    }, [dispatch, props.task.id, props.todolistId]);
    return (<div key={props.task.id} className={props.task.isDone ? "is-done" : ""} >
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone} />
        <EditableSpan title={props.task.title}
            onChange={onChangeTitleHandler} />
        <IconButton onClick={onRemoveHandler} >
            <DeleteIcon />
        </IconButton>
    </div>)
});

import React, { ChangeEvent } from 'react';
import { FilterValuesType, TasksStateType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    const dispatch = useDispatch();

    // function removeTask(id: string, todolistId: string) {
    //     const action = removeTaskAC(id, todolistId);
    //     dispatch(removeTaskAC(id, todolistId));
    // }
    // function addTask(title: string, todolistId: string) {
    //     const action = addTaskAC(title, todolistId);
    //     dispatch(addTaskAC(title, todolistId));
    // }
    // function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //     const action = changeTaskStatusAC(taskId, isDone, todolistId);
    //     dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    // }
    // function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    //     const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    //     dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
    // }


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onAcctiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    };

    let tasksForTodolist = tasks;

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist} >
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => { dispatch(addTaskAC(title, props.id)) }} />
            <div>
                {
                    tasks.map(t => {
                        const onRemoveHandler = () => {
                            dispatch(removeTaskAC(t.id, props.id))
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                        }
                        return <div key={t.id} className={t.isDone ? "is-done" : ""} >
                            <Checkbox onChange={onChangeStatusHandler} checked={t.isDone} />
                            <EditableSpan title={t.title}
                                onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveHandler} >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} color={"success"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} onClick={onAcctiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

import React, { ChangeEvent, useCallback } from 'react';
import { FilterValuesType, TasksStateType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';
import { Task } from './Task';

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

export const Todolist = React.memo(function (props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    const dispatch = useDispatch();

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onAcctiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id]);
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.changeTodolistTitle, props.id]);
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id]);

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
            <AddItemForm addItem={addTask} />
            <div>
                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} color={"success"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} onClick={onAcctiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
});

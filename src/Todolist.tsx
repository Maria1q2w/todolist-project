import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC, setTasksAC } from './state/tasks-reducer';
import { Task } from './Task';
import { CreateTasks, DeleteTodolists, UpdateTodolistTitle } from './stories/todolists-api.stories';
import { todolistsAPI } from './state/api/todolists-api';
import { FilterValuesType } from './AppWithRedux';
import { selectTasksByTodolistId } from './Selectors';
import './Todolist.css';

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const selectTasks = selectTasksByTodolistId(props.id);
    const tasks = useSelector(selectTasks);
    //const tasks = useSelector<AppRootState, Array<TaskTypeWithIsDone>>(state => state.tasks[props.id] || []);

    let tasksForTodolist = tasks;

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }

    const totalTasksCount = tasks.length;
    const filteredTasksCount = tasksForTodolist.length;
    const emptyTasksCount = totalTasksCount - filteredTasksCount;

    const dispatch = useDispatch();

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onAcctiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const changeTodolistTitle = useCallback((newTitle: string, id: string) => {
        props.changeTodolistTitle(id, newTitle);
    }, [props.changeTodolistTitle]);

    const addTask = useCallback((title: string, todolistId: string, taskId: string) => {
        dispatch(addTaskAC(title, todolistId, taskId))
    }, [dispatch]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await todolistsAPI.getTasks(props.id);
                const tasksWithTodolistId = response.data.items.map(task => ({
                    ...task,
                    todolistId: props.id
                }));
                dispatch(setTasksAC(props.id, tasksWithTodolistId));
            } catch (error) {
                console.error("error", error);
            }
        }
        fetchTasks();
    }, [dispatch, props.id])



    return (
        <div>
            <h3 className="todolist-title" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
            }}>
                <div style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                    flexGrow: 1,
                    minWidth: 0
                }}>
                    <UpdateTodolistTitle align="center" title={props.title} asString={false} onChange={changeTodolistTitle} id={props.id} />
                </div>
                <div className="delete-todolist-icon">
                    <DeleteTodolists id={props.id} asString={false} removeTodolist={props.removeTodolist} />
                </div>
            </h3>
            <CreateTasks asString={false} todolistId={props.id} addTask={addTask} tasksForTodolist={tasksForTodolist} />
            <div className="task-container">
                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        key={t.id}
                    />)
                }
                {Array.from({ length: emptyTasksCount }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-task"></div>
                ))}
            </div>
            <div className="buttons">
                <ButtonGroup className="button-group" variant="text" aria-label="Basic button group">
                    <Button variant={props.filter === "all" ? "contained" : "text"} color={"success"} onClick={onAllClickHandler}>All</Button>
                    <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} onClick={onAcctiveClickHandler}>Active</Button>
                    <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
});

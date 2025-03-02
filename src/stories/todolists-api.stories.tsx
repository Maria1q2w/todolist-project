import { FormHelperText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ChangeEvent, useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { todolistsAPI } from '../state/api/todolists-api';
import { ControlPoint } from '@mui/icons-material';
import { TodolistApiType, TodolistType } from '../AppWithRedux';
import { TaskTypeWithIsDone } from '../state/tasks-reducer';

export default {
    title: "API"
}

type DeleteTodolistProps = {
    id: string,
    asString: boolean,
    removeTodolist: (todolistId: string) => void
}
type CreateTodolistProps = {
    todolists?: Array<TodolistType>,
    asString: boolean,
    addTodolist: (title: string, id: string) => void
}
type UpdateTodolistTitleProps = {
    asString: boolean,
    title: string,
    id: string,
    align: string,
    onChange: (title: string, id: string) => void
}
type GetTasksProps = {
    id: string
}
type DeleteTaskProps = {
    id: string,
    todolistId: string,
    asString: boolean,
    onRemoveHandler: (id: string, todolistId: string) => void
}
type CreateTaskProps = {
    todolistId: string,
    tasksForTodolist: Array<TaskTypeWithIsDone>,
    asString: boolean,
    addTask: (title: string, todolistId: string, taskId: string) => void
}
type UpdateTaskTitleProps = {
    taskId: string,
    todolistId: string,
    newTitle: string,
    asString: boolean,
    onChange: (newTitle: string, todoListId: string, taskId: string) => void
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(JSON.stringify(res.data));
            })
            .finally(() => setIsLoading(false))
    }, []);
    return isLoading ? <p>Loading...</p> : state;
}

export const CreateTodolists: React.FC<CreateTodolistProps> = ({ asString = true, addTodolist, todolists }) => {
    const [state, setState] = useState<any>(null);
    const [titleName, setTitleName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleName(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            createTodolist();
        }
    }
    const createTodolist = () => {
        todolistsAPI.createTodolist(titleName)
            .then((res) => {
                if (asString) {
                    setState(res.data);
                    setTitleName("")
                } else {
                    if (titleName.trim() !== "") {
                        addTodolist(titleName.trim(), res.data.data.item.id);
                        setTitleName("");
                    } else {
                        setError("Title is required");
                    }
                }
            })
    }

    return (asString ? (<div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"titleName"} value={titleName} onChange={(e) => { setTitleName(e.currentTarget.value) }} />
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>) :
        (<div>
            <TextField style={{ backgroundColor: "white", borderRadius: "5px" }} variant={"outlined"} label={"Type value"} error={!!error} value={titleName} onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                disabled={(todolists?.length ?? 0) >= 10}
                inputProps={{ maxLength: 20 }}
            />
            <IconButton onClick={createTodolist} color={"primary"} disabled={(todolists?.length ?? 0) >= 10} >
                <ControlPoint />
            </IconButton>
            {error && (
                <FormHelperText sx={{ color: "red", display: "flex", justifyContent: "center", paddingRight: "40px" }}>
                    {error}
                </FormHelperText>
            )}
            {(todolists?.length ?? 0) >= 10 ? <div style={{ color: "red", display: "flex", justifyContent: "center", paddingRight: "40px", paddingTop: "10px" }}>Max 10 todolists</div> : <></>}
        </div>))
}

export const DeleteTodolists: React.FC<DeleteTodolistProps> = ({ id, asString = true, removeTodolist }) => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");

    const remove = useCallback(() => {
        removeTodolist(id)
    }, [removeTodolist, id])

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(asString ? todolistId : id)
            .then((res) => {
                setState(asString ? JSON.stringify(res.data) : id);
                remove();
            });
    }

    return (asString ? (<div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>) :
        <IconButton onClick={() => {
            deleteTodolist();
        }} >
            <DeleteIcon />
        </IconButton>
    );
}

export const UpdateTodolistTitle: React.FC<UpdateTodolistTitleProps> = ({ asString = true, title, id, onChange }) => {
    const [state, setState] = useState<any>(null);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [todolistId, setTodolistId] = useState<string>(id);

    let [editMode, setEditMode] = useState<boolean>(false);

    const activeEditMode = () => {
        setEditMode(true);
        setNewTitle(title);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);


    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolistTitle(todolistId, newTitle)
            .then((res) => {
                if (asString) {
                    setState(res.data);
                } else {
                    setEditMode(false);
                    onChange(newTitle, id);
                }
            })
    }

    return (asString ? (<div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
            <input placeholder={"title"} value={newTitle} onChange={(e) => { setNewTitle(e.currentTarget.value) }} />
            <button onClick={updateTodolistTitle}>Update Title Todolist</button>
        </div>
    </div>) : (
            editMode ? <TextField variant="standard" value={newTitle} onChange={onChangeTitleHandler} onBlur={updateTodolistTitle} autoFocus inputProps={{ maxLength: 20 }} />
                : <span onDoubleClick={activeEditMode} >{newTitle}</span>
        ))
}

export const GetTasks: React.FC<GetTasksProps> = ({ id }) => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>(id);

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <button onClick={getTasks}>Get Tasks</button>
            </div>
        </div>
    )
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({ asString = true, todolistId, id, onRemoveHandler }) => {
    const [state, setState] = useState<any>(null);
    const [todolistIdForTask, setTodolistIdForTask] = useState<string>(todolistId);
    const [taskId, setTaskId] = useState<string>(id);

    const remove = useCallback(() => {
        onRemoveHandler(taskId, todolistIdForTask)
    }, [taskId, todolistIdForTask, onRemoveHandler]);

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistIdForTask, taskId)
            .then((res) => {
                setState(res.data);
                !asString ? remove() : "";
            })
    }

    return (asString ?
        (<div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistIdForTask} onChange={(e) => { setTodolistIdForTask(e.currentTarget.value) }} />
                <input placeholder={"taskId"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
                <button onClick={deleteTask}>Delete Task</button>
            </div>
        </div>) :
        (
            <IconButton onClick={deleteTask} >
                <DeleteIcon />
            </IconButton>
        ))
}

export const CreateTasks: React.FC<CreateTaskProps> = ({ asString = true, todolistId, addTask, tasksForTodolist }) => {
    const [state, setState] = useState<any>(null);
    const [todolistIdForTask, setTodolistIdForTask] = useState<string>(todolistId);
    const [titleForTask, setTitleForTask] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleForTask(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            createTasks();
        }
    }

    useEffect(() => {
        setTodolistIdForTask(todolistId);
    }, [todolistId]);

    const createTasks = () => {
        todolistsAPI.createTasks(todolistIdForTask, titleForTask)
            .then((res) => {
                if (asString) {
                    setState(res.data);
                    setTitleForTask("")
                } else {
                    if (titleForTask.trim() !== "") {
                        addTask(titleForTask.trim(), todolistIdForTask, res.data.data.item.id);
                        setTitleForTask("");
                    } else {
                        setError("Title is required");
                        console.error("createdTask is undefined", res.data);
                    }
                }
            })
    }

    return (asString ?
        (<div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistIdForTask(e.currentTarget.value) }} />
                <input placeholder={"title"} value={titleForTask} onChange={(e) => { setTitleForTask(e.currentTarget.value) }} />
                <button onClick={createTasks}>Create Task</button>
            </div>
        </div>) : (
            <div>
                <TextField disabled={tasksForTodolist.length >= 10} inputProps={{ maxLength: 30 }} variant={"outlined"} label={"Type value"} error={!!error} value={titleForTask} onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    helperText={error}
                />
                <IconButton onClick={createTasks} color={"primary"} disabled={tasksForTodolist.length >= 10} >
                    <ControlPoint />
                </IconButton>
                {(tasksForTodolist.length >= 10) && <div style={{ color: "red", textAlign: "center", marginTop: "10px" }} >Max 10 tasks in todolist</div>}
            </div>
        ))
}

export const UpdateTaskTitle: React.FC<UpdateTaskTitleProps> = ({ asString = true, todolistId, taskId, newTitle, onChange }) => {
    const [state, setState] = useState<any>(null);
    const [todolistIdForTask, setTodolistIdForTask] = useState<string>(todolistId);
    const [taskIdForTask, setTaskIdForTask] = useState<string>(taskId);
    const [title, setTitle] = useState<string>(newTitle);

    let [editMode, setEditMode] = useState<boolean>(false);

    const activeEditMode = () => {
        setEditMode(true);
        setTitle(newTitle);
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    const updateTaskTitle = () => {
        todolistsAPI.updateTaskTitle(todolistId, taskId, title)
            .then((res) => {
                if (asString) {
                    setState(res.data);
                } else {
                    setEditMode(false);
                    onChange(title, taskIdForTask, todolistIdForTask);
                }
            })
    }

    return (asString ?
        (<div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistIdForTask(e.currentTarget.value) }} />
                <input placeholder={"taskId"} value={taskIdForTask} onChange={(e) => { setTaskIdForTask(e.currentTarget.value) }} />
                <input placeholder={"taskTitle"} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
                <button onClick={updateTaskTitle}>Update Task Title</button>
            </div>
        </div>) : (
            editMode ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={updateTaskTitle} autoFocus />
                : <span onDoubleClick={activeEditMode} >{title}</span>
        ))
}

export const ChangeTaskPlace = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [taskId1, setTaskId1] = useState<string>("");

    const changeTaskPlace = () => {
        todolistsAPI.changeTaskPlace(todolistId, taskId, taskId1)
            .then((res) => {
                setState(res.data);
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={"todolistId"} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
                <input placeholder={"taskId"} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
                <input placeholder={"taskId1"} value={taskId1} onChange={(e) => { setTaskId1(e.currentTarget.value) }} />
                <button onClick={changeTaskPlace}>Change Task Place</button>
            </div>
        </div>
    )
}
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CircularProgress, Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { todolistsAPI, setAuthToken } from './state/api/todolists-api';
import { TaskTypeWithIsDone } from './state/tasks-reducer';
import { CreateTodolists } from "./stories/todolists-api.stories";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskApiType = {
    id: string,
    title: string,
    todoListId: string
}

export type TasksStateType = {
    [key: string]: Array<TaskTypeWithIsDone>
}
export type TodolistApiType = {
    id: string
    title: string
}


function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string, id: string) => {
        const action = addTodolistAC(title, id);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            let token = localStorage.getItem("token");
            if (!token) {
                await todolistsAPI.authorize();
                token = localStorage.getItem("token");
                setAuthToken(token);
            }
            if (token) {
                try {
                    const response = await todolistsAPI.getTodolists();
                    dispatch(setTodolistsAC(response.data));
                } catch (error) {
                    console.error("Ошибка при загрузке данных:", error);
                }
            }
        }

        checkAuthAndFetch();
    }, [dispatch])


    if (!todolists || !Array.isArray(todolists)) {
        return <div>Loading...</div>;
    }

    const [columnsCount, setColumnsCount] = useState(1);
    const COLUMN_WIDTH = 265;

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 562) setColumnsCount(1);
            else if (width < 900) setColumnsCount(2);
            else if (width < 1200) setColumnsCount(3);
            else setColumnsCount(4);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const columns = Array.from({ length: columnsCount }, () => [] as TodolistType[]);

    todolists.forEach((tl, index) => {
        columns[index % columnsCount].push(tl);
    });

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <Container fixed>
                    <Grid container style={{ padding: "20px" }}>
                        <CreateTodolists addTodolist={addTodolist} asString={false} />
                    </Grid>

                    <Grid container spacing={0} style={{
                        display: "flex", flexWrap: "wrap",
                        justifyContent: "center"
                    }}>
                        {columns.map((column, index) => (
                            <Grid
                                item
                                key={index}
                                style={{
                                    flex: `0 0 ${COLUMN_WIDTH}px`,
                                    minWidth: `${COLUMN_WIDTH}px`,
                                    maxWidth: "100%",
                                    padding: "10px",
                                }}
                            >

                                {todolists.length === 0 ? (
                                    <div>
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    </div>) :
                                    (
                                        column.map((tl) => {
                                            return (<Grid className="todolist" item key={tl.id}>
                                                <Paper className="todolists-container" style={{ padding: "10px", marginBottom: "20px" }}>
                                                    <Todolist key={tl.id}
                                                        title={tl.title}
                                                        changeFilter={changeFilter}
                                                        filter={tl.filter}
                                                        id={tl.id}
                                                        removeTodolist={removeTodolist}
                                                        changeTodolistTitle={changeTodolistTitle} />
                                                </Paper>
                                            </Grid>
                                            )
                                        }))
                                }
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box >
        </div >
    );
}

export default AppWithRedux;

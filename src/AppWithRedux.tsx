import React, { useCallback, useReducer, useState } from 'react';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);

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
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map((tl) => {
                                return (<Grid item key={tl.id}>
                                    <Paper style={{ padding: "10px" }}>
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
                            })
                        }
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

export default AppWithRedux;

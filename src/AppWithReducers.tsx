import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
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
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: false },
      { id: v1(), title: "bread", isDone: false },
      { id: v1(), title: "eggs", isDone: false },
      { id: v1(), title: "bacon", isDone: true },
    ]
  })

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ])


  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasksReducer(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatchToTasksReducer(action);
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatchToTasksReducer(action);
  }



  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatchToTodolistsReducer(action);
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = changeTodolistTitleAC(newTitle, todolistId);
    dispatchToTodolistsReducer(action);
  }

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

                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "completed") {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") {
                  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }

                return (<Grid item>
                  <Paper style={{ padding: "10px" }}>
                    <Todolist key={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers;

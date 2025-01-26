import React, { useState } from 'react';
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

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];

    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj })
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ])

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
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
                      // tasks={tasksForTodolist} 
                      // removeTask={removeTask} 
                      changeFilter={changeFilter}
                      // addTask={addTask} 
                      // changeTaskStatus={changeStatus} 
                      // changeTaskTitle={changeTaskTitle} 
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

// export default App;

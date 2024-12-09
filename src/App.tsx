import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), name: "Css & Html", isDone: true,},
            {id: v1(), name: "Js", isDone: true},
            {id: v1(), name: "React", isDone: false},
            {id: v1(), name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), name: "Apple", isDone: true,},
            {id: v1(), name: "Fish", isDone: true},
            {id: v1(), name: "Orange", isDone: false},
            {id: v1(), name: "Sushi", isDone: false},
        ]
    })

    function removeTask(id: string, tlID: string) {
        let filteredTasks = tasks[tlID].filter(t => t.id !== id);
        tasks[tlID] = filteredTasks;
        setTasks({...tasks});
    }

    function changeStatus(id: string, status: boolean, tlID: string) {
        let task = tasks[tlID].find((t: TaskType) => t.id === id)
        if (task) {
            task.isDone = status
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(id: string, title: string, tlID: string) {
        let task = tasks[tlID].find((t: TaskType) => t.id === id)
        if (task) {
            task.name = title
        }
        setTasks({...tasks});
    }

    function addTask(name: string, tlID: string) {
        let newTask = {
            id: v1(),
            name: name.trim(),
            isDone: false
        }
        let task = tasks[tlID]
        let newTasks = [newTask, ...task];
        tasks[tlID] = newTasks;
        setTasks({...tasks});
    }

    let removeTodolist = (tlID: string) => {
        let filteredTodolist = todolists.filter(t => tlID !== t.id)
        setTodolists(filteredTodolist)
        delete tasks[tlID];
        setTasks({...tasks});
    }
    let changeTodolistTitle = (tlID: string, value: string) => {
        let todolist = todolists.find(t => tlID === t.id)
        if (todolist) {
            todolist.title = value
            setTodolists([...todolists])
        }
    }

    function changeFilter(id: string, filter: FilterValuesType) {
        let todolist = todolists.find(t => t.id === id)
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        let todolist: TodolistsType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                            }
                            return <Grid item>
                                <Paper elevation={3} style={{ padding:"20px", marginTop:"20px"}}>
                                    <Todolist title={tl.title}
                                              key={tl.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatusHandler={changeStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={tl.filter}
                                              id={tl.id}
                                              removeTodolist={removeTodolist}
                                              changeTodolistTitle={changeTodolistTitle}

                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>

            </Container>

        </div>
    );
}

export default App;

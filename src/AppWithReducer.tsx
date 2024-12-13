import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addedTaskAC, changeStatusTaskAC, changeTaskTitleAC, removedTaskAC, taskReducer} from "./state/task-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [])

    let [tasks, dispatchToTasksReducer] = useReducer(taskReducer, {})

    function removeTask(id: string, tlID: string) {
        const action = removedTaskAC(tlID, id)
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, status: boolean, tlID: string) {
        const action = changeStatusTaskAC(tlID, id, status)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, title: string, tlID: string) {
        const action = changeTaskTitleAC(tlID, id, title)
        dispatchToTasksReducer(action)
    }

    function addTask(name: string, tlID: string) {
        const action = addedTaskAC(tlID, name)
        dispatchToTasksReducer(action)
    }

    let removeTodolist = (tlID: string) => {
        const action = RemoveTodolistAC(tlID)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    let changeTodolistTitle = (tlID: string, value: string) => {
        const action = ChangeTodolistAC(value, tlID)
        dispatchToTodolistsReducer(action)
    }

    function changeFilter(id: string, filter: FilterValuesType) {
        const action = ChangeFilterAC(filter, id)
        dispatchToTodolistsReducer(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
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
                                <Paper elevation={3} style={{padding: "20px", marginTop: "20px"}}>
                                    <Todolist title={tl.title}
                                              key={tl.id}
                                              changeFilter={changeFilter}
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

export default AppWithReducers;

import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
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
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists )
    let removeTodolist = (tlID: string) => {
        dispatch(RemoveTodolistAC(tlID))
    }

    let changeTodolistTitle = (tlID: string, value: string) => {
        dispatch(ChangeTodolistAC(value, tlID))
    }

    function changeFilter(id: string, filter: FilterValuesType) {
        dispatch(ChangeFilterAC(filter, id))
    }

    function addTodolist(title: string) {
        dispatch(AddTodolistAC(title))
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

export default AppWithRedux;

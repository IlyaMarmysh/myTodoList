import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {addedTaskAC, changeStatusTaskAC, changeTaskTitleAC, removedTaskAC} from "./state/task-reducer";
import {AppRootState, useAppDispatch} from "./state/store";
import {useSelector} from "react-redux";

export type TaskType = {
    id: string,
    name: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    changeFilter(id: string, filter: FilterValuesType): void
    filter: FilterValuesType
    id: string
    removeTodolist(tlID: string): void
    changeTodolistTitle(tlID: string, value: string): void
}

export function Todolist(props: PropsType) {
    const dispatch = useAppDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id] )
    let tasksForTodolist = tasks;
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    const onAllClickHandler = () => {props.changeFilter(props.id, "all")}
    const onActiveClickHandler = () => {props.changeFilter(props.id, "active")}
    const onCompletedClickHandler = () => {props.changeFilter(props.id, "completed")}

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (value: string) => {
        props.changeTodolistTitle(props.id, value)
    }
    return <div>
        <h1><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h1>

        <AddItemForm addItem={(title) => {dispatch(addedTaskAC(props.id, title))}}/>
        <div>
            {tasksForTodolist.map(t => {
                    const onClickRemoveTask = () => {dispatch(removedTaskAC(props.id, t.id))                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {dispatch(changeStatusTaskAC(props.id, t.id, e.currentTarget.checked))}
                    const onChangeTitleHandler = (newValue: string) => {dispatch(changeTaskTitleAC(props.id, t.id, newValue))}

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.name} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" onClick={onClickRemoveTask}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                }
            )}
        </div>
        <div style={{marginTop: "10px"}}>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}



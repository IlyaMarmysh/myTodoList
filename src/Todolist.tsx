import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string,
    name: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask(id: string, tlID: string): void
    changeFilter(id: string, filter: FilterValuesType): void
    addTask(name: string, tlID: string): void
    changeStatusHandler(id: string, status: boolean, tlID: string): void
    changeTaskTitle(id: string, title: string, tlID: string): void
    filter: FilterValuesType
    id: string
    removeTodolist(tlID: string): void
    changeTodolistTitle(tlID: string, value: string): void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed")
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (value: string) => {
        props.changeTodolistTitle(props.id, value)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h1><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h1>

        <AddItemForm addItem={addTask}/>
        <div>
            {props.tasks.map(t => {
                    const onClickRemoveTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatusHandler(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

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



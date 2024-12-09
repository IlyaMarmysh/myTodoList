import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormProps = {
    addItem: (newTaskTitle: string) => void;
}

export function AddItemForm(props: AddItemFormProps) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const onChangeNewHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (newTaskTitle.trim() !== "") {
                props.addItem(newTaskTitle.trim())
                setNewTaskTitle("")
            } else {
                setError("Title is required")
            }
        }
    };
    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    };
    return <div><TextField
        id="standard-textarea"
        label="Task"
        placeholder="Please enter new task"
        variant="standard"
        value={newTaskTitle} onChange={onChangeNewHandler} onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
    />

        <IconButton onClick={onClickAddTask} color={"primary"}><ControlPoint/></IconButton>

    </div>
}
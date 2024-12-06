import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string,
    onChange: (value: string) => void,
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return editMode
        ?<TextField id="standard-basic" label="Standard" variant="standard" value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler} />
        :<span onDoubleClick={activateEditMode}>{props.title}</span>
}
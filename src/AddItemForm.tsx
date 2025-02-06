import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField variant={"outlined"} label={"Type value"} error={!!error} value={title} onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"} >
                <ControlPoint />
            </IconButton>
        </div>
    )
});

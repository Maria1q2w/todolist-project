import { Button } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};
export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== ""){
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input className={error ? "error" : ""} value={title} onChange={onNewTitleChangeHandler} 
            onKeyDown={onKeyDownHandler}
            />
            <Button onClick={addTask} variant={"contained"} color={"primary"} >+</Button>
            {error && <div className="error-message" >{error}</div>}
        </div>
    )
}

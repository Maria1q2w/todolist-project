import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { CreateTodolists } from "./stories/todolists-api.stories";

type AddItemFormPropsType = {
    addItem: (title: string, id: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    return (<div>
        <CreateTodolists addTodolist={props.addItem} asString={false} />
    </div>)
});

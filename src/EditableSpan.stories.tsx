import React from "react";
import { action } from '@storybook/addon-actions';
import { EditableSpan } from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeCallback = action("Start value");

export const EditableSpanExample = () => {
    return <EditableSpan onChange={changeCallback} title={"Start title"} />
}
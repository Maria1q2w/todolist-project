import React from "react";
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

//const changeCallback = action("Start value");

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}
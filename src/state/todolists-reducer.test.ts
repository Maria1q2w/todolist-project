import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../AppWithRedux";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";

test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New todolist";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle, "mchbvg-766dhn"));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "Buy";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);

});

test("correct filter of todolist should changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistFilter: FilterValuesType = "active";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newTodolistFilter));

    expect(endState[1].filter).toBe("active");
    expect(endState[0].filter).toBe("all");
    expect(endState[1].id).toBe(todolistId2);
})
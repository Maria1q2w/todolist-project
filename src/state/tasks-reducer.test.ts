import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import { TasksStateType } from "../App"
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test("correct task should be deleted from correct array", () =>  {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const action = addTaskAC("Russian language", "todolistId1");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(5);
    expect(endState["todolistId2"].length).toBe(5);
    expect(endState["todolistId1"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe("Russian language");
    expect(endState["todolistId1"][0].isDone).toBe(false);
    expect(endState["todolistId1"].every(t => t.title === "Russian language"));
});

test("status of specified task should be changed", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: false },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const action = changeTaskStatusAC("2", true, "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].isDone).toBeTruthy();
    expect(endState["todolistId1"][1].isDone).toBeFalsy();
});

test("title of specified task should be changed", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: false },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const newTitle = "chocolade";

    const action = changeTaskTitleAC("4", newTitle, "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][3].title).toBe("chocolade");
    expect(endState["todolistId1"][3].title).toBe("Redux");
});

test("new property with new array should be added when new todolist is added", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: false },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const action = addTodolistAC("title no metter");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if(!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test("property with tolodistId should be deleted", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: true },
            { id: "2", title: "JS", isDone: false },
            { id: "3", title: "React", isDone: false },
            { id: "4", title: "Redux", isDone: false },
        ], 
        "todolistId2": [
            { id: "1", title: "book", isDone: true },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "bread", isDone: false },
            { id: "4", title: "eggs", isDone: false },
            { id: "5", title: "bacon", isDone: true },
        ]
    }

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    
    expect(keys.length).toBe(1);
    expect(endState["tolodistId2"]).toBeUndefined();

});
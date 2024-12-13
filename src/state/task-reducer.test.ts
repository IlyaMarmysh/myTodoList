import {v1} from "uuid";
import {addedTaskAC, changeStatusTaskAC, changeTaskTitleAC, removedTaskAC, taskReducer} from "./task-reducer";
import {TasksStateType} from "../App";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {Error} from "@mui/icons-material";


test('correct task should be removed', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = removedTaskAC(todolistID2, "2")
    const endState = taskReducer(startState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2].every(t => t.id != "2")).toBeTruthy();
})
test('correct task should be added task', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = addedTaskAC(todolistID2, "new task")
    const endState = taskReducer(startState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(5)
    expect(endState[todolistID2][0].name).toBe("new task")
})
test('correct task should be change status task', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = changeStatusTaskAC(todolistID2, "2", false)
    const endState = taskReducer(startState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID2]["0"].isDone).toBe(true)
    expect(endState[todolistID2]["1"].isDone).toBe(false)
})
test('correct task should be change task title', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = changeTaskTitleAC(todolistID2, "2", "bread")
    const endState = taskReducer(startState, action)

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID2].length).toBe(4)
    expect(endState[todolistID2][1].name).toBe("bread")
    expect(endState[todolistID1][1].name).toBe("Js")
})
test('new array should be added when new todolist is added', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();
    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = AddTodolistAC ("New todolist");
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistID2 && k !== todolistID1);
    if (!newKey) {
        // @ts-ignore
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();
    const startState: TasksStateType = {
        [todolistID1]: [
            {id: "1", name: "Css & Html", isDone: true,},
            {id: "2", name: "Js", isDone: true},
            {id: "3", name: "React", isDone: false},
            {id: "4", name: "TypeScript", isDone: false},
        ],
        [todolistID2]: [
            {id: "1", name: "Apple", isDone: true,},
            {id: "2", name: "Fish", isDone: true},
            {id: "3", name: "Orange", isDone: false},
            {id: "4", name: "Sushi", isDone: false},
        ]
    }
    const action = RemoveTodolistAC (todolistID2);
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).not.toBeDefined()
})
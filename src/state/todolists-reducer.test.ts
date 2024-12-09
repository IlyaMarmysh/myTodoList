import {
    AddTodolistAC,
    ChangeFilterAC,
    ChangeTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from 'uuid'
import {FilterValuesType, TodolistsType} from "../App";


test('correct todolists should be removed', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState:Array<TodolistsType> = [
            {id: todolistID1, title: "What to learn", filter: "all"},
            {id: todolistID2, title: "What to buy", filter: "all"},
        ]
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test('correct todolists should be added', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New todolist title";

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all")
})
test('correct todolists should be change title', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New todolist";

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, ChangeTodolistAC(newTodolistTitle, todolistID2))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New todolist")
})
test('correct todolists should be change filter', ()=>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newFilter:FilterValuesType = "completed";

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistsReducer(startState, ChangeFilterAC(newFilter, todolistID2))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed")
})

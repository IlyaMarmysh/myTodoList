import {TasksStateType, TodolistsType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./task-reducer";


test('íds should be equals', ()=>{
    const startTasksState:TasksStateType={};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = AddTodolistAC("new todolists")

    const endTaskState = taskReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})
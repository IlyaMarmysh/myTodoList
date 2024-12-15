import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

export interface TaskRemovedType {
    type: 'REMOVED-TASK'
    todolistID: string
    taskID: string
}
export interface TaskAddType {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}
export interface TaskChangeStatusType {
    type: 'CHANGE-STATUS-TASK'
    todolistID: string
    taskID: string
    isDone: boolean
}
export interface ChangeTaskTitleType {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    name: string
}

export type ActionsType = RemoveTodolistActionType | TaskRemovedType | TaskAddType | TaskChangeStatusType |ChangeTaskTitleType | AddTodolistActionType;

const initialState:TasksStateType = {}

export const taskReducer = (state:TasksStateType = initialState, action:ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVED-TASK': {
            const tasks = state[action.todolistID];
            if (!tasks) {
                console.error(`Tasks not found for todolistID: ${action.todolistID}`);
                return state; // Возвращаем текущее состояние без изменений
            }
            state[action.todolistID] = tasks.filter(t => t.id !== action.taskID);
            return { ...state };
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            const newTask = { id: v1(), name: action.title.trim(),isDone: false}
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todolistID] = newTasks
            return stateCopy;
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            stateCopy[action.todolistID] = tasks.map(t => t.id === action.taskID ? {...t, name: action.name} : t)
            return stateCopy;
        }
        case 'ADD-TODOLIST':{
            const stateCopy = {...state};
            stateCopy[action.todolistID] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state;
    }
}

export const removedTaskAC = (todolistID:string, taskID:string):TaskRemovedType => {
    return {type:'REMOVED-TASK', todolistID, taskID}
}
export const addedTaskAC = (todolistID:string, title:string):TaskAddType => {
    return {type:'ADD-TASK', todolistID, title: title}
}
export const changeStatusTaskAC = (todolistID:string, taskID:string, isDone:boolean):TaskChangeStatusType => {
    return {type:'CHANGE-STATUS-TASK', todolistID, taskID, isDone:isDone}
}
export const changeTaskTitleAC = (todolistID:string, taskID:string, name:string):ChangeTaskTitleType => {
    return {type:'CHANGE-TASK-TITLE', todolistID, taskID, name:name}
}
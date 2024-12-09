import {FilterValuesType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType} from "./todolists-reducer";

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

export type ActionsType = TaskRemovedType | TaskAddType | TaskChangeStatusType |ChangeTaskTitleType | AddTodolistActionType;
export const taskReducer = (state:TasksStateType, action:ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVED-TASK': {
           const stateCopy = {...state};
           const tasks = stateCopy[action.todolistID]
           const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            const newTask = { id: "5", name: action.title.trim(),isDone: false}
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todolistID] = newTasks
            return stateCopy;
        }
        case 'CHANGE-STATUS-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            let task = tasks.find((t: TaskType) => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID]
            let task = tasks.find((t: TaskType) => t.id === action.taskID)
            if (task) {
                task.name = action.name
            }
            return stateCopy;
        }
        case 'ADD-TODOLIST':{
            const stateCopy = {...state};
            stateCopy[action.todolistID] = []
            return stateCopy
        }
        default:
            throw new Error(`I dont understand action type`);
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
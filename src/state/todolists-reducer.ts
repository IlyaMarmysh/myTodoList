import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


export interface RemoveTodolistActionType {
    type: 'REMOVE-TODOLIST'
    id: string
}
export interface AddTodolistActionType {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}
export interface ChangeTodolistActionType {
    type: 'CHANGE-TODOLIST'
    id: string
    title: string
}
export interface ChangeFilterTodolistActionType {
    type: 'CHANGE-FILTER'
    id: string
    filter: FilterValuesType

}
export type ActionsType = RemoveTodolistActionType | ChangeFilterTodolistActionType | ChangeTodolistActionType | AddTodolistActionType

const initialState: Array<TodolistsType> = []
export const todolistsReducer = (state:Array<TodolistsType> = initialState, action:ActionsType):Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                    id: action.todolistID,
                    title: action.title,
                    filter: "all",}
                ]
            }
        case 'CHANGE-TODOLIST': {
            return state.map(todolist =>
                todolist.id === action.id
                    ? { ...todolist, title: action.title }
                    : todolist
            );
        }
        case 'CHANGE-FILTER': {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistID:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST', id:todolistID}
}
export const AddTodolistAC = (title:string):AddTodolistActionType=>{
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}
export const ChangeTodolistAC = (title:string, id:string):ChangeTodolistActionType=>{
    return {type: 'CHANGE-TODOLIST', title: title, id: id}
}
export const ChangeFilterAC = (filter: FilterValuesType, id: string):ChangeFilterTodolistActionType=>{
    return {type: 'CHANGE-FILTER', filter: filter, id: id}
}
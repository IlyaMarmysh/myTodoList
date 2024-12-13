import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import { useDispatch} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})
export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
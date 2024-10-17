import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoReducer"

export const store =configureStore({
    reducer:{
        userTodo:todoReducer
    }
}) 
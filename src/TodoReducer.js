import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
    id: 0,
    title: "Page 1 Incomplete",
    completed: "false"
}]


const todoReducer = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const addItem = {
                id:Date.now(),
                title: action.payload,
                completed:"Not Completed"
            }
            state.push(addItem)

        },
        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload)
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updateTodo:(state,action)=>{
            return state.map((todo)=>{
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        title:action.payload.title,
                    }
                }
                return todo
            })
        }
    }
})



export const { addTodo, deleteTodo,updateTodo } = todoReducer.actions;
export default todoReducer.reducer; 
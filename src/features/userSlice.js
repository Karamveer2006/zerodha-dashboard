import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:[]
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const user={
                id:action.payload.id,
                username:action.payload.username,
                email:action.payload.email,
            }
            state.user.push(user)
        },
        removeUser:(state,action)=>{
            state.user.pop();
        }
    }
})
export const {addUser,removeUser} =userSlice.actions;
export default userSlice.reducer
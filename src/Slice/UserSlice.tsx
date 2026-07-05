import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const UserSlice = createSlice({
    name : "user",
    initialState : getItem("user") as any,
    reducers:{
        setUser : (state, action) =>{
            setItem("user", action.payload)
            state=getItem("user")
            return action.payload ?? null
        },
        removeUser : (state)=>{
            removeItem("user");
            state=null
            return null;
        }
    }

})

export const {setUser, removeUser} = UserSlice.actions
export default UserSlice.reducer
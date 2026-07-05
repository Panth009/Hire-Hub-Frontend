import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

const profileSlice = createSlice({
    name : "profile",
    initialState : {},
    reducers:{
        changeProfile : (state, action) =>{
            state=updateProfile(action.payload)
            return action.payload ?? null
        },
        setProfile : (state, action)=>{
            state=action.payload
            return action.payload;
        }
    }

})

export const {changeProfile, setProfile} = profileSlice.actions
export default profileSlice.reducer
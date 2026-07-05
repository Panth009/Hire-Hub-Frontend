import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/UserSlice'
import profileReducer from './Slice/ProfileSlice'
import filterReducer from './Slice/FilterSlice'
import sortReducer from './Slice/SortingSlice'
import jwtReducer from './Slice/JwtSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        filter: filterReducer,
        sort: sortReducer,
        jwt: jwtReducer
    },
})


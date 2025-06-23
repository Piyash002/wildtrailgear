import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/Store";
interface TinitialState{
    user: string| null,
    token:string| null
}
const initialState:TinitialState = {
       user: null,
       token:null
    }
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
        },
        logoutUser:(state)=>{;
            state.user = null;
            state.token = null;
        },

    }
})
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state:RootState)=> state.auth.token;
export const useCurrentUser = (state:RootState)=> state.auth.user;

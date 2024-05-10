import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated:localStorage.getItem('auth_token')? true :false
}

const authSlice = createSlice({
    name:'Authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated = true
        },
        logout(state){
            state.isAuthenticated = false
            localStorage.removeItem('auth_token')
        }
    }
})

export const authActions = authSlice.actions

export default  authSlice.reducer;
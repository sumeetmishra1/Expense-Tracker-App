import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
    name:'Premium',
    initialState:{isPremium:false},
    reducers:{
        setIsPremium(state,{payload}){
            state.isPremium = payload
        }
    }
})

export const premiumActions = premiumSlice.actions;

export default premiumSlice.reducer
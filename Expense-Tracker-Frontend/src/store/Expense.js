import { createSlice } from "@reduxjs/toolkit";

export const initialExpense = {
    expenses:[],
    totalAmount:0,
    expense:{
        id:0,
        amount:'',
        description:'',
        category:''
    }
};

const expenseSlice = createSlice({
    name:'Expense',
    initialState:initialExpense,
    reducers:{
        addExpense(state,{payload}){
           state.expenses.push(payload)
           state.totalAmount+=payload.amount
        },
        deleteExpense(state,{payload}){
           state.expenses= state.expenses.filter((expense)=>expense.id !==payload)
           state.totalAmount-=payload.amount
        },
        editExpense(state,{payload}){
            state.expenses = state.expenses.filter((expense)=>expense.id !==payload.id)
            state.totalAmount-=payload.amount
            state.expense=payload
        },
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
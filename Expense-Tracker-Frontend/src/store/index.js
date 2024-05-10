import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Auth";
import expenseReducer from "./Expense";
import premiumReducer from "./Premium"
const store = configureStore({
    reducer:{
        auth:authReducer,
        expenses:expenseReducer,
        premium:premiumReducer
    }
})
export default store;
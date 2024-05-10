import { useSelector } from "react-redux";
import { ExpenseForm } from "../components/ExpensePage/ExpenseForm";
import ExpensePremium from "../components/ExpensePage/ExpensePremium";
import Expenses from "../components/ExpensePage/Expenses";

export default function ExpensePage(){
    const isPremium = useSelector(state =>state.premium.isPremium)
    return(
        <>
        <ExpenseForm/>
        <Expenses/>
        {isPremium && <ExpensePremium/>}
        </>
    )
}
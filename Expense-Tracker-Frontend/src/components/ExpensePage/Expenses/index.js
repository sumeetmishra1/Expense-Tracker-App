import { Box,Typography,Container, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { expenseActions } from "../../../store/Expense"
import { premiumActions } from "../../../store/Premium"
import { useEffect } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"

export default function Expenses(){
    const history = useHistory()
    const expenses = useSelector(state => state.expenses.expenses)
    const dispatch = useDispatch()
    useEffect(()=>{
        const token = localStorage.getItem('auth_token')
        if(!token){
            history.push('/signin')
        }
        axios.get("http://localhost:8006/expenses/getexpense",{headers:{"Authorization":token}})
        .then((data)=>{
            dispatch(premiumActions.setIsPremium(data.data.ispremium))
           dispatch(expenseActions.changeExpense(data.data.allExpense)) 
        })
        .catch(()=>{
            alert("Cannot get Expenses")
        })
    },[history,dispatch])

    function deleteExpense(Id){
        const token = localStorage.getItem('auth_token')
        axios.delete("http://localhost:8006/expenses/delete/"+ Id,{headers:{"Authorization":token}})
        .then(()=>{
            console.log("delt")
            dispatch(expenseActions.deleteExpense(Id))
        })
        .catch(()=>{
            alert("Can't Delete expense")
        })
    }
    return(
        <Container
      sx={{
        height: "auto",
        width: "90vh",
        mt: 2,
        p: expenses.length>0?2:0,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
       {expenses.map((expense)=>{
            return(
            <Box key={expense._id} sx={{display:'flex',backgroundColor:'#d2d2d2',m:2,p:1,borderRadius:2}}>
                <Box sx={{ flexGrow: 1, display: {xs:'none', md:'flex' },justifyContent:'space-around' }}>
                <Typography >₹ {expense.amount}</Typography>
                <Typography>{expense.description}</Typography>
                <Typography>{expense.category}</Typography>
                </Box>
                <Box >
                    <Button variant="outlined" size="small" sx={{mr:1}} onClick={()=>{
                        deleteExpense(expense._id)
                        dispatch(expenseActions.editExpense(expense))}}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" size="small" 
                    onClick={()=>deleteExpense(expense._id)}>
                        Delete
                    </Button>
                </Box>
            </Box>
        )})}
    </Container>
    )
}
import { Box,Typography,Container, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { expenseActions } from "../../../store/Expense"
export default function Expenses(){
    
    const expenses = useSelector(state => state.expenses.expenses)
    const dispatch = useDispatch()
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
            <Box key={expense.id} sx={{display:'flex',backgroundColor:'#d2d2d2',m:2,p:1,borderRadius:2}}>
                <Box sx={{ flexGrow: 1, display: {xs:'none', md:'flex' },justifyContent:'space-around' }}>
                <Typography >{expense.amount}</Typography>
                <Typography>{expense.description}</Typography>
                <Typography>{expense.category}</Typography>
                </Box>
                <Box >
                    <Button variant="outlined" size="small" sx={{mr:1}} onClick={()=>dispatch(expenseActions.editExpense(expense))}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={()=>dispatch(expenseActions.deleteExpense(expense.id))}>
                        Delete
                    </Button>
                </Box>
            </Box>
        )})}
    </Container>
    )
}
import {
  Container,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../../store/Expense";

export function ExpenseForm() {

  const [amountValue, setAmountValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [expenseId , setExpenseId] = useState(0)
  const editExpense = useSelector((state) => state.expenses.expense)
 
  const dispatch = useDispatch()

  useEffect(()=>{
    setAmountValue(editExpense.amount)
    setCategoryValue(editExpense.category)
    setDescriptionValue(editExpense.description)
    setExpenseId(editExpense.id)
  },[editExpense])
    
  
  
  
  // if(editExpense){
  //   setAmountValue(editExpense.amount)
  //   setCategoryValue(editExpense.category)
  //   setDescriptionValue(editExpense.description)
  // }

  function handleFormSubmit() {
    const item = {
      id:expenseId>0?expenseId:Math.random()*10+Math.random()*10,
      amount:Number(amountValue),
      description:descriptionValue,
      category:categoryValue
    }
    dispatch(expenseActions.addExpense(item))
    
    setExpenseId(0)
    setAmountValue('')
    setCategoryValue('')
    setDescriptionValue('')

  }
  return (
    <Container
      sx={{
        height: "48vh",
        width: "90vh",
        mt: 2,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Box sx={{ m: 2 }}>
        <TextField
          value={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
          label="Amount"
          variant="outlined"
          color="info"
          type="number"
          sx={{ width: 400, mt: 3 }}
        />
        <TextField
          value={descriptionValue}
          onChange={(e)=>setDescriptionValue(e.target.value)}
          label="Description"
          variant="outlined"
          color="info"
          type="text"
          sx={{ width: 400, mt: 3 }}
        />
        <FormControl sx={{ mt: 3 }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="Category"
            placeholder="Category"
            sx={{ width: 400 }}
            onChange={(e)=>setCategoryValue(e.target.value)}
            value={categoryValue}
          >
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Petrol"}>Petrol</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ mt: 3, display: "block" }}
          color="success"
          size="large"
          variant="contained"
          onClick={handleFormSubmit}
        >
          Add Expense
        </Button>
      </Box>
    </Container>
  );
}

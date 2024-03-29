import { Button,Typography,Container ,Box} from "@mui/material"
import { useHistory } from "react-router-dom"
export default function FrontPage(){
    const history = useHistory()
    return(
        <Container
        sx={{
            marginTop:'10%',
            textAlign:'center',
            justifyContent:'center',
            
        }
        }>
        <Box >
        <Typography sx={{fontFamily:'initial',fontSize:'25px',mb:2}}>Effortlessly manage your finances with Expense Tracker App, the ultimate expense tracker.
             Gain control over your spending, set budgets, and achieve your financial goals seamlessly. 
             Sign up today and embark on a journey towards financial empowerment
             .A own place to store day to day expenses with many premium features like leaderboard and expense report.
            Just download the app and have a look over your daily expenses.
        </Typography>
    </Box>
        <Button variant="contained" color="success" sx={{mr:1}} onClick={()=>history.push('/signin')}>Login</Button>
        <Button variant="contained" color="info" onClick={()=>history.push('/signup')}>Sign Up</Button>
    </Container>
    )
}
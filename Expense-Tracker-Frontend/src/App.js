import { BrandName } from "./components/Header/Brand";
import { Route,Switch} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import UserDetails from "./pages/UserDetails";
import ExpensePage from "./pages/Expenses";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
function App() {

  const isAuth = useSelector(state=> state.auth.isAuthenticated)

  return (
    <div style={{background:' linear-gradient(to right, #3494e6, #ec6ead)',height:'auto',minHeight:'100vh',marginTop:'0'}}>
      
      <BrandName/>
      <Switch>
      <Route path="/signin">
      <SignIn/>
      </Route>
      <Route path="/signup" exact>
        <SignUp/>
      </Route>
      <Route path="/forgot-password" exact>
        <ForgotPassword/>
      </Route>
      {!isAuth?
      <SignIn/>
      :<>
      <Route path="/user-details" exact>
        <UserDetails/>
      </Route>
      
      <Route path="/" exact>
        <ExpensePage/>
      </Route>
      </>}
      </Switch>
    </div>
  );
}

export default App;

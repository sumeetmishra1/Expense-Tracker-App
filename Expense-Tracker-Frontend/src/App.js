import { BrandName } from "./components/Header/Brand";
import { Route,Switch} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import UserDetails from "./pages/UserDetails";
import ExpensePage from "./pages/Expenses";
import ForgotPassword from "./pages/ForgotPassword";
import FrontPage from "./pages/FrontPage";
import { useSelector } from "react-redux";
function App() {

  const isAuth = useSelector(state=> state.auth.isAuthenticated)

  return (
    <div style={{backgroundImage:'url("https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    margin:0,
    padding:0,
    backgroundPosition:'center',
    minHeight:'100vh'
    }}>
      
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
      <FrontPage/>
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

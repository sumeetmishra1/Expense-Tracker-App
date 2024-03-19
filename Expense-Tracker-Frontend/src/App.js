import { BrandName } from "./components/Header/Brand";
import { Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin";
import UserDetails from "./pages/UserDetails";
function App() {
  return (
    <div style={{background:' linear-gradient(to right, #3494e6, #ec6ead)',height:'100vh',marginTop:'0'}}>
      <BrandName/>
      <Route path="/signin">
      <SignIn/>
      </Route>
      <Route path="/signup" exact>
        <SignUp/>
      </Route>
      <Route path="/user-details" exact>
        <UserDetails/>
      </Route>
      
    </div>
  );
}

export default App;

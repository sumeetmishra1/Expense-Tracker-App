import { BrandName } from "./components/Header/Brand";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
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
      
    </div>
  );
}

export default App;

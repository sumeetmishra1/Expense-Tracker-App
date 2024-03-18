import { BrandName } from "./components/Header/Brand";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div style={{background:' linear-gradient(to right, #3494e6, #ec6ead)',height:'100vh',marginTop:'0'}}>
      <BrandName/>
      <SignUp/>
    </div>
  );
}

export default App;

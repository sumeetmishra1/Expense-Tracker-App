const LoginForm = document.querySelector("#loginform");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
LoginForm.addEventListener('submit',LoginUser);
async function LoginUser(e){
    e.preventDefault();
    let obj={
        email:email.value,
        password:password.value
    }
    try{
        const User=await axios.post('http://localhost:3000/user/signup',obj)
        window.alert("User logged in Succesfully")
    }
    catch(e){
        window.alert("Invalid Credentials!")
    }
    email.value="";
    password.value="";
}
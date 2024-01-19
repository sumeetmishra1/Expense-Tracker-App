const LoginForm = document.querySelector("#loginform");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
const formbody=document.querySelector("#form-body");
LoginForm.addEventListener('submit',LoginUser);
async function LoginUser(e){
    e.preventDefault();
    let obj={
        email:email.value,
        password:password.value
    }
    try{
        const User=await axios.post('/user/login',obj)
        console.log(User.data.message)
        window.alert(User.data.message);
        localStorage.setItem('token',User.data.token);
        window.location.href="../Expenses/index.html";
    }
    catch(e){
        //console.log(e.response.data.err);
        formbody.innerHTML+=`<h3>${e.message}</h3>`;
    
    }
    email.value="";
    password.value="";
}

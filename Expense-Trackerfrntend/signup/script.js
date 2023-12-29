const SignUpForm = document.querySelector("#signupform");
const newname=document.querySelector("#name");
const email=document.querySelector("#email");
const password=document.querySelector("#password");
SignUpForm.addEventListener('submit',SignUpFormSubmit);
async function SignUpFormSubmit(e){
e.preventDefault();
    let obj={
        name:newname.value,
        email:email.value,
        password:password.value
    }
    try{
        const user=await axios.post('http://16.171.230.180:3000/user/signup',obj)
        window.alert("User Created!")
        location.replace('/login/index.html')
    }
    catch(e){
        console.log(e.response.data.err);
        const childhtml=`<h3>${e.response.data.err}</h3>`
        SignUpForm.innerHTML=SignUpForm.innerHTML+childhtml;
        setTimeout(()=>{
            location.reload()
        },3000);
    }
    newname.value="";
    email.value="";
    password.value="";
    
}
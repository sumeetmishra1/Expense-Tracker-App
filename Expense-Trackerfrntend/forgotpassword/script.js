const form=document.querySelector('#passwordform');
const email=document.querySelector('#email');
form.addEventListener('submit',forgotpass);
function forgotpass(e){
    e.preventDefault();
    let myoj={
        email:email.value
    }
    axios.post('http://16.171.230.180:3000/password/forgotpassword',myoj)
    .then((res)=>{
        alert("Reset link Successfully Send on Your Email");
        window.location.href="../login/index.html";
        email.value="";
        })
    .catch(err=>console.log(err))
}
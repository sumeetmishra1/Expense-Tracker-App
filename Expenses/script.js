const form=document.querySelector("#form");
const amount=document.querySelector("#expense");
const descrip=document.querySelector("#description");
const catgory=document.querySelector("#category");
const lists=document.querySelector("#items");
const razorpay=document.querySelector('#rzp-1');
const premium=document.querySelector('#premium');
const premiumleaderboard=document.querySelector('#leaderboard');
const prevdownload=document.querySelector('#prevdownload');
const pagination =document.querySelector('#pagination');
form.addEventListener('submit',onsubmit);
function onsubmit(e){
    let myoj={
    amount:amount.value,
    descrip:descrip.value,
    catgory:catgory.value
    };
    e.preventDefault();
    const token=localStorage.getItem('token');
    axios.post('http://localhost:3000/expenses/addexpense',myoj,{headers:{"Authorization":token}})
    .then(res=>{
        showonscreen(res.data.newExpense);
    })
    .catch(err=>console.log(err));
    
    amount.value="";
    descrip.value="";
    catgory.value="";
};
function deletefn(userid){
    console.log(userid)
    const token=localStorage.getItem('token');
    axios.delete(`http://localhost:3000/expenses/delete/${userid}`,{headers:{"Authorization":token}})
            .then((response)=>{
                console.log(response);
              removeuserfromscreen(userid)
            })
            .catch(err=>console.log(err.message));     
}
function removeuserfromscreen(userid){
    const childnodedelt=document.getElementById(userid);
    if(childnodedelt){
           lists.removeChild(childnodedelt);
    }
}
window.addEventListener("DOMContentLoaded",getexpenses(1));
async function getexpenses(page){
    const token=localStorage.getItem('token');
    const lim=document.querySelector('#paginationrows').value;
    axios.get(`http://localhost:3000/expenses/getexpense?page=${page}&lim=${lim}`,{headers:{"Authorization":token}})
    .then((res)=>{
        if(res.data.ispremium){
            razorpay.remove();
            premium.innerHTML='';
            premium.innerHTML+=`<h3 class="text-success">You are a Premium User!</h3>
             <button onclick="showleaderboad()" class="btn btn-primary ms-2">Show LeaderBoard</button>
             <button onclick="showreport()" class="btn btn-primary ms-2">Expense Report</button>`
        }
        lists.innerHTML='';
        for(var i=0;i<res.data.allExpense.length;i++){
            showonscreen(res.data.allExpense[i]);
        }
        showpagination(res.data)
    } )
    .catch(err=>console.log(err));
}

function showonscreen(obj){
    let amt=obj.amount
    let des=obj.description
    let catg=obj.category
    let userid=obj.id;
    const childHTML=`<li id=${userid} class='list-group-item'>${amt} ${des} ${catg} 
    <button onclick=deletefn('${userid}') class='delete btn btn-danger mx-2'>Delete</button>
    <button onclick=editfn('${userid}') class='edit  btn btn-secondary'>Edit</button></li>`;
    lists.innerHTML=lists.innerHTML+childHTML;
}
razorpay.onclick=async(e)=>{
    console.log("clicked")
    e.preventDefault();
    const token=localStorage.getItem('token');
    const response= await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}})
    console.log(response);
    var options=
    {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})

            alert("You are a premium User");
        }
    }
    const rzp1 =new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',function(response){
        console.log(response);
        alert("Something Went Wrong");
    })
}
async function  showleaderboad (){
    while(premiumleaderboard.firstChild){
        premiumleaderboard.removeChild(premiumleaderboard.firstChild)
    }
    const token=localStorage.getItem('token');
   const userlist= await axios.get('http://localhost:3000/premium/showleaderboard',{headers:{"Authorization":token}});
    premiumleaderboard.innerHTML+='<h3>Leaderboard</h3>'
    console.log(userlist)
    const userleaderboard=userlist.data.leaderboard;
    userleaderboard.forEach((user)=>{
        const childHTML=`<li class='list-group-item'>Name-${user.name} Total Expenses-${user.totalExpense}</li>`;
        premiumleaderboard.innerHTML+=childHTML;
    })
}

function showreport(){
    window.location.href="../Expense-Report/index.html"
}
async function  downloadexpense(){
    const token=localStorage.getItem('token');
   const data = await axios.get('http://localhost:3000/expenses/download',{headers:{"Authorization":token}});
   if(data.status==200){
    var a = document.createElement('a');
    a.href=data.data.fileUrl;
    a.download='myexpense.csv';
    a.click();
   }
   else{
    console.log(err)
   }
}
async function getdownloads(){
    try{
    const token=localStorage.getItem('token');
    const downloads=await axios.get('http://localhost:3000/expenses/get-downloads',{headers:{"Authorization":token}})
    prevdownload.innerHTML+='<h3>Previous Downloads</h3>'
    for(var i=0;i<downloads.data.allDownloads.length;i++){
        
       showdownloadsonscreen(downloads.data.allDownloads[i]);
    }
    }
    catch(e){
        console.log(e);
    }
}
function showdownloadsonscreen(array){
    const fileUrl=array.fileUrl;
    const date=array.createdAt;
    const childHTML=`<li class='list-group-item'><a href="${fileUrl}">${date}<a></li>`
    prevdownload.innerHTML+=childHTML;
}
function showpagination(response){
    pagination.innerHTML=''
    const currpage=response.currPage
    if(!response.hasPreviousPage){
        pagination.innerHTML+=`${currpage}-<button class="btn btn-success" onclick="getexpenses(${currpage+1})">Next</button>`;
    }
    else if(!response.hasLastPage){
        pagination.innerHTML+=`<button  class="btn btn-success" onclick="getexpenses(${currpage-1})">Prev</button>-${currpage}`
    }
    else{
        pagination.innerHTML+=`<button  class="btn btn-success" onclick="getexpenses(${currpage-1})">Prev</button>-${currpage}-<button class="btn btn-success" onclick="getexpenses(${currpage+1})">Next</button>`;
    }
    
}
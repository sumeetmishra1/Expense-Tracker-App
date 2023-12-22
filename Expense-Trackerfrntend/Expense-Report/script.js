const monthtable=document.querySelector('#monthtable');
const yeartable=document.querySelector('#yeartable');
window.addEventListener('DOMContentLoaded',async()=>{
const date = new Date()
const month = date.toLocaleString('default', { month: 'long' });
const year=date.getFullYear();
const yearhead=document.querySelector('#year').innerHTML=`Year - ${year}`
const monthhead=document.querySelector('#month').innerHTML=`${month}-${year}`
const token=localStorage.getItem('token');
  const expense = await  axios.get("http://16.171.15.121:3000/expenses/getexpense",{headers:{"Authorization":token}})
  const allexpense=expense.data.allExpense;
  let totalExpense=0;
    for(var i=0;i<allexpense.length;i++){
        const date=allexpense[i].createdAt.split('T')[0];
        const Description=allexpense[i].description;
        const Expenseamt=allexpense[i].amount;
        const category=allexpense[i].category;
        const childHTML=`<tr>
    <th>${date}</th>
    <th>${Description}</th>
    <th>${category}</th>
    <th>0</th>
    <th>${Expenseamt}</th>
</tr>`
totalExpense+=Expenseamt;
monthtable.innerHTML+=childHTML;
    }
    yeartable.innerHTML+=` <tr>
    <th>${month}</th>
    <th>0</th>
    <th>${totalExpense}</th>
    <th>0</th>
</tr>`
    document.querySelector('#totalexpense').innerHTML=`Total Expense = ${totalExpense}`;

})
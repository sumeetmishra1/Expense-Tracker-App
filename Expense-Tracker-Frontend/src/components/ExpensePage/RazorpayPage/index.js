import axios from "axios"


export default async function paymentPage(){
        console.log("clicked")
        const token=localStorage.getItem('token');
        const response= await axios.get('/purchase/premiummembership',{headers:{"Authorization":token}})
        console.log(response);
        var options=
        {
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async function(response){
                await axios.post('/purchase/updatetransactionstatus',{
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                },{headers:{"Authorization":token}})
    
                alert("You are a premium User");
            }
        }
        const rzp1 =new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed',function(response){
            console.log(response);
            alert("Something Went Wrong");
        })
}
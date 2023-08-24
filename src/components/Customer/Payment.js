import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../SharedComponents/css/common.css"
import "../SharedComponents/css/modal.css"
import "../SharedComponents/css/form.css"
import Navbar from '../SharedComponents/Navbar';

const Payment = () => {

    const token = localStorage.getItem('auth')
    const customerid = localStorage.getItem('customerid')
    const [userallaccounts,setUserallaccounts] = useState({})

    const dbUsername = localStorage.getItem('username')

    const [isreceiverdisabled,setIsreceiverdisabled ] = useState(true);

    const [senderAccNo,setSenderAccNo] = useState()
    const [receiverAccNo,setReceiverAccNo] = useState()
    const [type,setType] = useState()
    const [amount,setAmount] = useState()

    const doPayment = async (e)=>{
        e.preventDefault()
        console.log(senderAccNo)
        console.log(receiverAccNo)
        console.log(type)
        console.log(amount)

        if(type === "credit" || type === "debit" ){
            if(senderAccNo === undefined || (amount === undefined && amount !==0) ){
                alert("Enter Sender & amount")
                return
            }
        }
        if(type === "transfer"){
            if(senderAccNo === undefined || (amount === undefined && amount !==0) || receiverAccNo === undefined){
                alert("Enter Sender,Receiver & amount")
                return
            }
        }
        

            if(type === "credit"){
               
                let res = await axios.post('http://localhost:8080/bank/transaction/credit',
                {
                    account:{
                        accountno:senderAccNo
                    },
                
                    amount:amount,
                    transactiontype:{
                        typeid:1
                    }
                },{
                    headers: {Authorization: `Bearer ${token}`}
                })

                alert(res.data)
            }

            if(type === "debit"){

                let res = await axios.post('http://localhost:8080/bank/transaction/debit',
                {
                    account:{
                        accountno:senderAccNo
                    },
                
                    amount:amount,
                    transactiontype:{
                        typeid:2
                    }
                },
                {
                    headers: {Authorization: `Bearer ${token}`}
                })

                alert(res.data)
                
            }

            if(type === "transfer"){
                let res = await axios.post('http://localhost:8080/bank/transaction/transfer',
                {
                    senderaccountno:senderAccNo,
                    receiveraccountno:receiverAccNo,
                    amount:amount,
                     transactiontype:{
                        typeid:2
                    }
                }
                ,{headers: {Authorization: `Bearer ${token}`}})
                alert(res.data)
            }

    }

    const dropDownData = async()=>{
        console.log(token)
        let res = await axios.get(`http://localhost:8080/bank/account/${customerid}`,{
            headers: {
                Authorization: `Bearer ${token}`}
        })

       setUserallaccounts(res.data)
        console.log(res.data)
    }

    useEffect(()=>{
        dropDownData()
        if(type === 'transfer') setIsreceiverdisabled(false)
        else setIsreceiverdisabled(true)
    },[type])

    let userAccountsDropDown
    if(userallaccounts.length>0){
        userAccountsDropDown = userallaccounts.map((acc)=>{
            return(
                <option value={acc.accountno}>Account No {acc.accountno}</option>
            )
        })
    }

  return (
    <>
     <Navbar role={'User'} username={dbUsername}/>
    <div className="container1 App">

        <h3>Payment</h3>
         <div className="tab-content" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <form  className="form-box">

                <div className="form-group">
                    <select name="senderaccno" className="form-control" id="sender" required onChange={(e)=>{
                        setSenderAccNo(e.target.value)
                    }}>
                    <option value="" selected disabled>Select Your Account No.</option>
                    
                        {userAccountsDropDown}
                    
                </select> 
                </div>

                    <div className="form-group">
                        <select name="type" className="form-control" id="dropdown" onChange={(e)=>{
                            setType(e.target.value)
                        }}>
                        <option value="" selected disabled>Payment Type.</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                            <option value="transfer">Transfer</option> 
                        
                        </select>
                </div>

                        <div className="form-group">
                        <input disabled={isreceiverdisabled} type="text" className="form-control" placeholder="Receiver Account No" required pattern="^[0-9]+$" onChange={(e)=>{
                            setReceiverAccNo(e.target.value)
                        }}/>
                        </div>

                        <div className="form-group">
                            <input  name="amount" type="text" className="form-control" placeholder="Enter amount" required pattern="^[0-9]+$" onChange={(e)=>{
                                    setAmount(e.target.value)
                            }}/>
                            </div>
         <button type="submit" className="btn btn-primary" onClick={doPayment}>Submit</button>
     </form>
         </div>
        </div>


         </>

  )
}

export default Payment
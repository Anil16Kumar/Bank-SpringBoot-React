import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { addAccountAdmin, dropDownBankDataAdmin, dropDownCustomerDataAdmin } from '../Utils/Admin'

const AddAccount = ({setAddaccountmodalstatus , getAllAccounts}) => {

    const token = localStorage.getItem('auth')
    const [allcustomers,setAllcustomers] = useState({})
    const [allbanks,setAllbanks] = useState({})

    const [customerId,setCustomerid] = useState()
    const [bankabbrv,setBankabbrv] = useState()
    const [balance,setBalance] = useState(0)

    const addAccountBackend = async(e) =>{
        e.preventDefault() 

        console.log(bankabbrv)
        console.log(customerId)
        console.log(balance)

        try {
            let response = await addAccountAdmin(customerId,bankabbrv,balance)
            alert("Bank Account Added")
        } catch (error) {
            alert(error.message)
        }


        // let response = await axios.post(`http://localhost:8080/bank/customer/addcustomerbankaccount/${customerId}/${bankabbrv}/${balance}`,{},{
        //     headers: {
        //         Authorization: `Bearer ${token}`}
        // })

        getAllAccounts()
        setAddaccountmodalstatus(false)
        
    }


    const dropDownData = async ()=>{

        try {
            let response = await dropDownCustomerDataAdmin()
            setAllcustomers(response.data)
        } catch (error) {
            alert(error.message)
        }
       
        try {
            let res = await dropDownBankDataAdmin()
            setAllbanks(res.data)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(()=>{
        dropDownData()
    },[])

    let customerDropDown
    if(allcustomers.length>0){
        customerDropDown = allcustomers.map((cus)=>{
           return (
            <option value={cus.customerid} > Account No :{cus.customerid} Of {cus.firstname}</option>
           )
        })
    }

    let bankDropDown
    if(allbanks.length>0){
        bankDropDown = allbanks.map((bank)=>{
            return (
                <option value={bank.abbrevation} >{bank.abbrevation}</option>
            )
        })
    }

   

    return (
        <div className="modalBackground">
          <div className="modalContainer">
           
            <div className="title">
             <h2>Add New Customer Account </h2>
            </div>
            <div className="body">

              <form class="form-box">

                <div class="form-group">
                    <select name="customerid" class="form-control" id="dropdown" onChange={(e)=>{
                        setCustomerid(e.target.value)
                    }}>
                        <option value="" disabled selected>Select Customer</option>
                        {customerDropDown}
                    </select>
                </div>

                <div class="form-group">
                    <select name="bankabbrv" class="form-control" id="dropdown" onChange={(e)=>{
                        setBankabbrv(e.target.value)
                    }}>
                        <option value="" disabled selected>Select Bank:</option>
                        {bankDropDown}
                    </select>
                </div>


            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="balance" type="number" class="form-control" id="lastName2" placeholder="Balance" onChange={
                    (e) =>{
                       setBalance(e.target.value)
                    }
                }/>
            </div>
           
            <button type="submit" class="btn btn-primary" onClick={addAccountBackend}  >Add Account</button>
        </form>
            </div>
            <div className="footer">
              <button
                onClick={() => {
                    setAddaccountmodalstatus(false)
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              {/* <button>Continue</button> */}
            </div>
          </div>
        </div>
      );
}

export default AddAccount
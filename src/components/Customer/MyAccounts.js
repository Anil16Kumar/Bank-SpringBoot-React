import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../SharedComponents/css/common.css"
import "../SharedComponents/css/modal.css"
import "../SharedComponents/css/form.css"
import Pagination from '../SharedComponents/Pagination';
import Passbook from '../SharedComponents/Passbook';
import Navbar from '../SharedComponents/Navbar';
import { myAccountsCustomer, myAccountsPagewiseCustomer } from '../Utils/Customer';

const MyAccounts = () => {

    const token = localStorage.getItem('auth')
    const customerid = localStorage.getItem('customerid')
    const dbUsername = localStorage.getItem('username')

    const [myaccountdata,setMyaccountdata] = useState({})
    const [passbookmodalstatus,setPassbookmodalstatus] = useState(false)
    const [passbookaccountno,setPassbookaccountno] = useState()
    const [passbookaccountbalance,setPassbookaccountbalance] = useState()

    const [pages,setPages] = useState()
    const [currpage,setCurrpage] =useState(0)
    const pagesize = 6;

    const getMyAccounts = async() =>{

      try {
        let res = await myAccountsCustomer(customerid)
        setPages(Math.floor(res.data.length/pagesize))
        console.log(res.data)
      } catch (error) {
        alert(error.message)
      }
       
      try {
        let response = await myAccountsPagewiseCustomer(customerid,currpage,pagesize)
        setMyaccountdata(response.data.content)
        console.log(response.data.content,'Paginated')
      } catch (error) {
        alert(error.message)
      }
       

    }

    useEffect(()=>{
        getMyAccounts()
    },[currpage])

    let myaccounttabledata
    if(myaccountdata.length>0){
        myaccounttabledata = myaccountdata.map((acc)=>{
           return (
            <tr>
            <th scope="row">{acc.accountno}</th>
            <td>{acc.customerID}</td>
             <td>{acc.bankAbbriviation}</td> 
            <td>{acc.balance}</td>
            <td className="text-center"><button type="button" className="btn btn-danger" onClick={(e)=>{
              setPassbookaccountno(acc.accountno)
              setPassbookaccountbalance(acc.balance)
              setPassbookmodalstatus(true)
            }}>Passbook</button></td>
          </tr>
           )
        })
    }

  return (
    <>
     <Navbar role={'User'} username={dbUsername}/>

    <div className="container1 App">
        <h3>My Accounts</h3>
        {passbookmodalstatus && <Passbook setPassbookmodalstatus={setPassbookmodalstatus} passbookaccountno={passbookaccountno} passbookaccountbalance={passbookaccountbalance}/>}
        <div className="tab-content">

        <table className="table  table-bordered  table-striped">
                <thead>
                  <tr>
                    <th scope="col">Account No</th>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Bank</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Passbook</th>
                  </tr>
                </thead>
                  <tbody>
                   {myaccounttabledata}
                  </tbody>
            </table>

        </div>
        <Pagination pages={pages} currpage={currpage} setCurrpage={setCurrpage} list={getMyAccounts}/>
    </div>
    </>
  )
  
}

export default MyAccounts
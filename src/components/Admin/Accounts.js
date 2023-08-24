import React, { useEffect, useState } from 'react'
import Navbar from '../SharedComponents/Navbar'
import axios from 'axios'
import Pagination from '../SharedComponents/Pagination'
import AddAccount from './AddAccount'
import Passbook from '../SharedComponents/Passbook'
import { allAccountsAdmin, allAccountsAdminPageWise, delAccountAdmin } from '../Utils/Admin'

const Accounts = () => {

    const[allaccounts,setAllaccounts] = useState({})
    const[addaccountmodalstatus,setAddaccountmodalstatus] = useState(false)

    const [pages,setPages] = useState()
    const [currpage,setCurrpage] =useState(0)
    const pagesize = 6;

    const token = localStorage.getItem('auth')
    const dbUsername = localStorage.getItem('username')

    const [passbookmodalstatus,setPassbookmodalstatus] = useState(false)
    const [passbookaccountno,setPassbookaccountno] = useState()
    const [passbookaccountbalance,setPassbookaccountbalance] = useState()



    const delAccountBackend = async(e,accountno,abbrv,customerid)=>{
      e.preventDefault()
        try {
          let response = await delAccountAdmin(accountno,abbrv,customerid)
          getAllAccounts()
          alert("Account Deleted")

        } catch (error) {
          alert(error.message)
        }
      
    }


    const getAllAccounts = async () =>{

            try {
              let res = await allAccountsAdmin()
              setPages(Math.floor(res.data.length/pagesize))
              console.log(res.data,'All Accounts')
            } catch (error) {
              alert(error.message,'')
            }

            try {
              let response = await allAccountsAdminPageWise(currpage,pagesize)
              setAllaccounts(response.data.content)
              console.log(response.data.content,'All Accounts Pageable')
            } catch (error) {
              alert(error.message)
            }

    }

    let accountData
    if(allaccounts.length>0){
        accountData = allaccounts.map((acc)=>{
            return (
              <tr>
              <th scope="row">{acc.accountno}</th>
              <td>{acc.customerID}</td>
               <td>{acc.bankAbbriviation}</td> 
              <td>{acc.balance}</td>

              <td className="text-center"><button type="button" className="btn btn-success" onClick={(e)=>{
              setPassbookaccountno(acc.accountno)
              setPassbookaccountbalance(acc.balance)
              setPassbookmodalstatus(true)
            }}>Passbook</button></td>

              <td className="text-center"><button type="button" className="btn btn-danger" onClick={(e)=>{
                delAccountBackend(e,acc.accountno,acc.bankAbbriviation,acc.customerID)
              }}>Delete</button></td>
            </tr>
            )
        })
    }

    useEffect(()=>{
        getAllAccounts()
    },[currpage])

  return (<>
    <Navbar role={'Admin'} username={dbUsername}/>  
    <div className="container1">
        <h3>Accounts</h3>
        {passbookmodalstatus && <Passbook setPassbookmodalstatus={setPassbookmodalstatus} passbookaccountno={passbookaccountno} passbookaccountbalance={passbookaccountbalance}/>}

            {addaccountmodalstatus && <AddAccount setAddaccountmodalstatus={setAddaccountmodalstatus} getAllAccounts={getAllAccounts}/>}
            <div className={`tab-content ${passbookmodalstatus || addaccountmodalstatus   ? 'blurred' : ''}`}>
            <table className="table  table-bordered  table-striped">
                <thead>
                  <tr>
                    <th scope="col">Account No</th>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Bank</th>
                    <th scope="col">Balance</th>
                    <th scope="col">View Passbook</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                  <tbody>
                    {accountData}
                  </tbody>
            </table>
            </div>  <div className="text-center">
        <button type="button" className="btn btn-primary openModalBtn" onClick={()=>{
            setAddaccountmodalstatus(true)
        }}>Add Account</button>
      </div><br />
        <Pagination pages={pages} currpage={currpage} setCurrpage={setCurrpage} list={getAllAccounts}/>

    </div>
    </>
  )
}

export default Accounts
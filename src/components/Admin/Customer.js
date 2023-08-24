import React, { useEffect, useState } from 'react'
import "../SharedComponents/css/common.css"
import "../SharedComponents/css/modal.css"
import "../SharedComponents/css/form.css"
import axios from 'axios';
import Pagination from '../SharedComponents/Pagination'
import AddCustomer from './AddCustomer'
import Navbar from '../SharedComponents/Navbar'
import ViewAccounts from '../SharedComponents/ViewAccounts'
import { allAccountsAdminPageWise, allCustomerAdmin, allCustomerPageWiseAdmin, deleteCustomerAdmin } from '../Utils/Admin';


const Customer = () => {
    const token = localStorage.getItem("auth")
    const dbUsername = localStorage.getItem('username')

    const [allcustomers,setAllcustomers] = useState({})
    const [addcustomermodalstatus,setAddcustomermodalstatus] = useState(false)
    const [viewAccountsModalStatus,SetViewAccountsModalStatus] = useState(false)
    const [specificAccounts,setSpecificAccounts] = useState()
    const [specificName,setSpecificName] = useState()

    const [pages,setPages] = useState()
    const [currpage,setCurrpage] =useState(0)
    const pagesize = 6;

    const deleteCustomerBackend = async(e,customerId,noofaccounts) =>{
        e.preventDefault()

        if(noofaccounts > 0 ){
          alert(`Delete Failed : Customer Has ${noofaccounts} Accounts `)
          return
        }

        console.log(customerId)

        try {
          let response = await deleteCustomerAdmin(customerId)
          alert("Customer deleted")
        } catch (error) {
          alert(error)
        }

       
        getAllCustomers()
      }

    const getAllCustomers= async ()=>{

        try {
          let res = await allCustomerAdmin()
          setPages(Math.floor(res.data.length/pagesize)) 
          console.log(res)
        } catch (error) {
          alert(error.message)
        }
      
        
        try {
          let response = await allCustomerPageWiseAdmin(currpage,pagesize)
          setAllcustomers(response.data.content)
        } catch (error) {
          alert(error.message)
        }

       

    }

    useEffect(() => {
        getAllCustomers() // Fetch banks when the component mounts
      }, [currpage]); 

      let customerData
      if(allcustomers.length>0){
        customerData = allcustomers.map((c)=>{
              return (
                <tr>
                <th scope="row">{c.customerid}</th>
                <td>{c.firstname}</td>
                <td>Customer</td>
                <td>&nbsp;&nbsp;{c.accounts.length} &nbsp;&nbsp;&nbsp;
                   <button type="button" class="btn btn-warning" onClick={(e)=>{
                    setSpecificName(c.firstname)
                    setSpecificAccounts(c.accounts)
                    SetViewAccountsModalStatus(true)
                   }}>View Acounts</button>
                </td>
                <td className="text-center"><button type="button" className="btn btn-success" onClick={(e)=>{
                  
    
                }}>Update</button></td>
    
                <td className="text-center"><button type="button" className="btn btn-danger" onClick={(e)=>{
                 deleteCustomerBackend(e,c.customerid,c.accounts.length)
                }}>Delete</button></td>
              </tr>
              )
          })
      }
    

  return (<> 
  <Navbar role={'Admin'} username={dbUsername}/>  
    <div className="container1">
        <h3>Customers</h3>
        {viewAccountsModalStatus && <ViewAccounts specificName={specificName} SetViewAccountsModalStatus={SetViewAccountsModalStatus} specificAccounts={specificAccounts}/>}
        {addcustomermodalstatus && <AddCustomer setAddcustomermodalstatus={setAddcustomermodalstatus}  getAllCustomers={getAllCustomers}/>}
         <div className={`tab-content ${viewAccountsModalStatus || addcustomermodalstatus   ? 'blurred' : ''}`}>
            {/* <Table header={['Serial No.','Name','Accounts','Update','Delete']}/> */}
            <table className="table  table-bordered  table-striped">
                <thead>
                  <tr>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Accounts</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                  <tbody>
                    {customerData}
                  </tbody>
            </table>
        </div>
        
        <div className="text-center">
        <button type="button" className="btn btn-primary openModalBtn" onClick={()=>{
         setAddcustomermodalstatus(true)
        }}>Add Customer</button>
      </div><br />
        <Pagination pages={pages} currpage={currpage} setCurrpage={setCurrpage} list={getAllCustomers}/>
    </div>
    </>
  )
}

export default Customer
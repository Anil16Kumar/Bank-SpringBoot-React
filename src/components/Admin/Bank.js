import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import "../SharedComponents/css/common.css"
import "../SharedComponents/css/modal.css"
import "../SharedComponents/css/form.css"
import BankAddModal from './BankAddModal';
import BankUpdateModal from './BankUpdateModal';
import Pagination from '../SharedComponents/Pagination';
import Navbar from '../SharedComponents/Navbar';
import ViewAccounts from '../SharedComponents/ViewAccounts';
import { allBanks , allBanksPageWise ,deleteBankById} from '../Utils/Admin';

const Bank = () => {

  const token = localStorage.getItem("auth")
  const dbUsername = localStorage.getItem('username')

  const myElementRef = useRef(null);


  const [allbanks,setAllbanks] = useState({})
  const [addbankmodalstatus,setAddbankmodalstatus] = useState(false)
  const [updatebankmodalstatus,setUpdatebankmodalstatus] = useState(false)
  const [prefilledbankid,setPrefilledbankid] = useState()
  const [prefilledbankname,setPrefilledbankname] = useState()
  const [prefilledbankabrv,setPrefilledbankabrv] = useState()


  const [specificAccounts,setSpecificAccounts] = useState()
  const [specificName,setSpecificName] = useState()
  const [viewAccountsModalStatus,SetViewAccountsModalStatus] = useState(false)


  const [pages,setPages] = useState()
  const [currpage,setCurrpage] =useState(0)
  const pagesize = 6;

  const getAllBanks = async (e)=>{

    try {
      let res = await allBanks()
      setPages(Math.floor(res.data.length/pagesize))
    } catch (error) {
      console.log('In Bank.js allBanks()')
      alert(error.message,'In Bank.js allBanks()')
    }

    try {
        let response = await allBanksPageWise(currpage,pagesize)
        setAllbanks(response.data.content)
    } catch (error) {
      console.log('In Bank.js allBanksPageWise')
      alert(error.message,'In Bank.js allBanksPageWise')
    }

  }

  const deleteBankBackend = async(e,bankid,noOFBankAccounts) =>{
    e.preventDefault()

    if(noOFBankAccounts>0){
      alert(`Bank Has ${noOFBankAccounts} Accounts Cant Delete`)
      return
    }

    console.log(token,'delete')
    console.log(bankid)

    try {
      let response = await deleteBankById(bankid)
    } catch (error) {
      alert(error.message,'In Bank.js')
    }

    getAllBanks()
   
  }


  useEffect(() => {
    getAllBanks(); // Fetch banks when the component mounts
  }, [currpage]); 


  let bankData
  if(allbanks.length>0){
    bankData = allbanks.map((b)=>{
          return (
            <tr>
            <th scope="row">{b.bankid}</th>
            <td>{b.bankname}</td>
            <td>{b.abbrevation}</td>

            <td> {b.accounts.length}  &nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-warning" onClick={(e)=>{
               setSpecificName(b.bankname)
               setSpecificAccounts(b.accounts)
               SetViewAccountsModalStatus(true)
            }}>View Accounts</button>
            </td>

            <td className="text-center"><button type="button" className="btn btn-success" onClick={(e)=>{
              setUpdatebankmodalstatus(true)
              setPrefilledbankid(b.bankid)
              setPrefilledbankname(b.bankname)
              setPrefilledbankabrv(b.abbrevation)

            }}>Update</button></td>

            <td className="text-center"><button type="button" className="btn btn-danger" onClick={(e)=>{
              deleteBankBackend(e, b.bankid,b.accounts.length)
            }}>Delete</button></td>
          </tr>
          )
      })
  }

  return (<>
  <Navbar role={'Admin'} username={dbUsername}/>  
      <div className="container1 App">
        <h3>Trusted Banks</h3> 
  
  {viewAccountsModalStatus && <ViewAccounts specificName={specificName} SetViewAccountsModalStatus={SetViewAccountsModalStatus} specificAccounts={specificAccounts}/>}

  {addbankmodalstatus && <BankAddModal setAddbankmodalstatus={setAddbankmodalstatus} updateBank={getAllBanks}/>}
  
  {updatebankmodalstatus && 
  <BankUpdateModal
   setUpdatebankmodalstatus={setUpdatebankmodalstatus} 
   prefilledbankname={prefilledbankname} 
   prefilledbankabrv={prefilledbankabrv}
   prefilledbankid={prefilledbankid}
   setPrefilledbankname={setPrefilledbankname}
   setPrefilledbankabrv={setPrefilledbankabrv}
   updateBank={getAllBanks}
   />}


        <div className={`tab-content ${addbankmodalstatus || viewAccountsModalStatus || updatebankmodalstatus  ? 'blurred' : ''}`} >

        <table className="table  table-bordered  table-striped">
  <thead>
    <tr>
      <th scope="col">Bank Id</th>
      <th scope="col">Bank Name</th>
      <th scope="col">Abbreviation</th>
      <th scope="col">Accounts</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <th scope="row">1</th>
      <td>State Bank of India</td>
      <td>SBI</td>
      <td className="text-center"><button type="button" className="btn btn-primary">Primary</button></td>
      <td className="text-center"><button type="button" className="btn btn-danger">Danger</button></td>
    </tr> */}
    {bankData}
  
  </tbody>
</table>
        </div>
        <div className="text-center">
        <button type="button" className="btn btn-primary openModalBtn" onClick={()=>{
          setAddbankmodalstatus(true)
        }}>Add Bank</button>
      </div><br />
        <Pagination pages={pages} currpage={currpage} setCurrpage={setCurrpage} list={getAllBanks}/>
  </div>
  </>
  )


}

export default Bank
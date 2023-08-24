import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const Passbook = ({setPassbookmodalstatus , passbookaccountno , passbookaccountbalance}) => {


  const token = localStorage.getItem('auth')

  const [pages,setPages] = useState()
  const [currpage,setCurrpage] =useState(0)
  const pagesize = 6;

  const [passbookdata,setPassbookdata] = useState({})


    const getPassbook = async() =>{
      let res = await axios.get(`http://localhost:8080/bank/transaction/${passbookaccountno}`,{
        headers: {Authorization: `Bearer ${token}`}
      })

      setPages(Math.floor(res.data.length/pagesize))
      console.log(res.data)

      let response = await axios.get(`http://localhost:8080/bank/transaction/${passbookaccountno}/${currpage}/${pagesize}`,{
        headers: {Authorization: `Bearer ${token}`}
      })

      setPassbookdata(response.data.content)
      console.log(response.data.content,'Paginated')


    }

    useEffect(()=>{
      getPassbook()
    },[currpage])

    let passbookTableData
    if(passbookdata.length>0){
      passbookTableData = passbookdata.map((passbook)=>{
        let i=1
        return(
          <tr>
          <th scope="row">{passbook.transactionid}</th>
          <td>{passbook.amount}</td>
          <td>{passbook.senderaccountno}</td>
          <td>{passbook.receiveraccountno}</td>
          <td>{passbook.date}</td>
          <td>{passbook.status}</td>
          </tr>
        )
      })
    }

    return (
        <div className="modalBackground">
          <div className="modalContainer" style={{width:'70%',height:'65%'}}>
           
            <div className="title">
             <h4>Passbook For Account No : {passbookaccountno} Balance {passbookaccountbalance}</h4>
            </div>
                <div className="body">
                <table className="table  table-bordered  table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Transaction Id</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Sender Acc No</th>
                          <th scope="col">Receiver Acc No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                          {passbookTableData}
                      </tbody>
                    </table>
                </div>
            <div className="footer">
              <button
                onClick={() => {
                    setPassbookmodalstatus(false)
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              
              {/* <button>Continue</button> */}
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
             <Pagination pages={pages} currpage={currpage} setCurrpage={setCurrpage} list={getPassbook}/>
            </div>
           
          </div>
         
        </div>
      );
}

export default Passbook
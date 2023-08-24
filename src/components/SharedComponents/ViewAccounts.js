import React from 'react'
import Pagination from './Pagination'

const ViewAccounts = ({SetViewAccountsModalStatus ,specificAccounts ,specificName}) => {

    let specificAccountTableData
    let index = 0
    if(specificAccounts.length>0){
        specificAccountTableData = specificAccounts.map((acc)=>{
            return (
                <tr>
                <th scope="row">{++index}</th>
                <td>{acc.accountno}</td>
                <td>{acc.balance}</td>
                </tr>
            )
        })
    }

    return (
        <div className="modalBackground">
          <div className="modalContainer">
           
            <div className="title">
             <h2>{specificName}'s Accounts </h2>
            </div>
            <div className="body">
              
            <table className="table  table-bordered  table-striped">
  <thead>
    <tr>
      <th scope="col">Serial No</th>
      <th scope="col">Account No</th>
      <th scope="col">Balance</th>
     
    </tr>
  </thead>
  <tbody>
        {specificAccountTableData}
  
  </tbody>
</table>

              
            </div>
            <div className="footer">
              <button
                onClick={() => {
                    SetViewAccountsModalStatus(false)
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
             
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
             {/* <Pagination pages={1} currpage={1} setCurrpage={setCurrpage} list={getPassbook}/> */}
            </div>
          </div>
          
        </div>
        
      );
}

export default ViewAccounts
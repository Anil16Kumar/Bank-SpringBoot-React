import React from 'react'
import axios from 'axios';
import { updateBankAdmin } from '../Utils/Admin';


const BankUpdateModal = ({setUpdatebankmodalstatus,prefilledbankname,prefilledbankabrv,setPrefilledbankname,setPrefilledbankabrv,prefilledbankid,updateBank}) => {

  const token = localStorage.getItem("auth")
  
    const updateBankBackend= async (e) =>{
        e.preventDefault()
        console.log(prefilledbankid)
        console.log(prefilledbankname)
        console.log(prefilledbankabrv)

        try {
          let response = await updateBankAdmin(prefilledbankid,prefilledbankname,prefilledbankabrv)
          alert("Bank Updated")
        } catch (error) {
          alert(error.message)
        }

        setUpdatebankmodalstatus(false)
        updateBank()
    }
    

    return (
        <div className="modalBackground">
          <div className="modalContainer">
           
            <div className="title">
             <h2>Update Bank </h2>
            </div>
            <div className="body">
              {/* <p>The next page looks amazing. Hope you want to go there!</p> */}

              <form class="form-box">
            <div class="form-group">
              {/* <label for="firstName2">Bank Name</label> */}
              <input name="bakname" type="text" value={prefilledbankname} class="form-control" id="firstName2" placeholder="Enter Bank Name" 
              onChange={
                    (e) =>{
                        setPrefilledbankname(e.target.value)
                    }
                }/>
            </div>
            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="abbreviation" type="text" value={prefilledbankabrv} class="form-control" id="lastName2" placeholder="Enter Bank Abbreviation" onChange={
                    (e) =>{
                        setPrefilledbankabrv(e.target.value)
                    }
                }/>
            </div>
           
            <button type="submit" class="btn btn-primary" onClick={updateBankBackend}>Update</button>
        </form>
            </div>
            <div className="footer">
              <button
                onClick={() => {
                    setUpdatebankmodalstatus(false);
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

export default BankUpdateModal
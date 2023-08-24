import React, { useState } from 'react'
import axios from 'axios';
import { addBankAdmin } from '../Utils/Admin';

const BankAddModal = ({ setAddbankmodalstatus ,updateBank}) => {

  

    const [bankname,setBankname] = useState()
    const [bankabbr,setBankabbr] = useState()

    const addBankBackend = async(e) =>{
        e.preventDefault()

        try {
          let response = await addBankAdmin(bankname,bankabbr)
          alert('Bank Added Successfulyy')
        } catch (error) {
          alert(error.message)
        }
       

        updateBank()
        setAddbankmodalstatus(false);
    }

 

    
    return (
        <div className="modalBackground">
          <div className="modalContainer">
           
            <div className="title">
             <h2>Add New Bank </h2>
            </div>
            <div className="body">
              {/* <p>The next page looks amazing. Hope you want to go there!</p> */}

              <form class="form-box">
            <div class="form-group">
              {/* <label for="firstName2">Bank Name</label> */}
              <input name="bakname" type="text" class="form-control" id="firstName2" placeholder="Enter Bank Name" 
              onChange={
                    (e) =>{
                        setBankname(e.target.value)
                    }
                }/>
            </div>
            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="abbreviation" type="text" class="form-control" id="lastName2" placeholder="Enter Bank Abbreviation" onChange={
                    (e) =>{
                        setBankabbr(e.target.value)
                    }
                }/>
            </div>
           
            <button type="submit" class="btn btn-primary" onClick={addBankBackend}>Submit</button>
        </form>
            </div>
            <div className="footer">
              <button
                onClick={() => {
                    setAddbankmodalstatus(false);
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

export default BankAddModal
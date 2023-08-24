import axios from 'axios'
import React, { useState } from 'react'
import { addNewCustomer } from '../Utils/Admin'

const AddCustomer = ({setAddcustomermodalstatus,getAllCustomers}) => {

    const token = localStorage.getItem('auth')

    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [firstname,setFirstname] = useState()
    const [lastname,setLastname] = useState()

    const addUserBackend = async (e)=>{
        e.preventDefault()

        try {
          let response = await addNewCustomer(username,password,firstname,lastname)
          alert('Customer Added')
        } catch (error) {
          alert(error.message)
        }

        // let response = await axios.post('http://localhost:8080/api/auth/register',{
        //     username,
        //     password,
        //     customer:{
        //         firstname,
        //         lastname
        //     }
        // },{  headers: {
        //     Authorization: `Bearer ${token}`}
        // })
        getAllCustomers()
        setAddcustomermodalstatus(false)
    }

    return (
        <div className="modalBackground">
          <div className="modalContainer">
           
            <div className="title">
             <h2>Add New Customer </h2>
            </div>
            <div className="body">

              <form class="form-box">
            <div class="form-group">
              <input name="username" type="text" class="form-control" id="firstName2" placeholder="Username" 
              onChange={
                    (e) =>{
                        setUsername(e.target.value)
                    }
                }/>
            </div>
            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="password" type="password" class="form-control" id="lastName2" placeholder="Password" onChange={
                    (e) =>{
                        setPassword(e.target.value)
                    }
                }/>
            </div>

            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="firstname" type="text" class="form-control" id="lastName2" placeholder="Firstname" onChange={
                    (e) =>{
                        setFirstname(e.target.value)
                    }
                }/>
            </div>

            <div class="form-group">
              {/* <label for="lastName2">Bank Abbreviation</label> */}
              <input name="abbreviation" type="text" class="form-control" id="lastName2" placeholder="Lastname" onChange={
                    (e) =>{
                        setLastname(e.target.value)
                    }
                }/>
            </div>
           
            <button type="submit" class="btn btn-primary" onClick={addUserBackend} >Add Customer</button>
        </form>
            </div>
            <div className="footer">
              <button
                onClick={() => {
                    setAddcustomermodalstatus(false)
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

export default AddCustomer
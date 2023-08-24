import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../SharedComponents/css/common.css"
import "../SharedComponents/css/modal.css"
import "../SharedComponents/css/form.css"
import Navbar from '../SharedComponents/Navbar';
import { updateUserDetailsCustomer, userDetailsCustomer } from '../Utils/Customer';

const Profile = () => {

    const token = localStorage.getItem('auth')
    const dbUsername = localStorage.getItem('username')
    const customerID = localStorage.getItem('customerid')

    const [password,setPassword] = useState()
    const [firstname,setFisrtname] = useState()
    const [lastname,setLastname] = useState()

    const updateUserBackend = async (e)=>{
        e.preventDefault()
        console.log(firstname)
        console.log(lastname)
        console.log(password)

        try {
            let res = await updateUserDetailsCustomer(customerID,password,firstname,lastname)
            alert(res.data)
            console.log(res.data)
        } catch (error) {
            alert(error.message)
        }

        // let res = await axios.post(`http://localhost:8080/bank/user/update/${customerID}`,{
        //     password,
        //     customer:{
        //         firstname,
        //         lastname
        //     }
        // },{
        //     headers: { Authorization: `Bearer ${token}`}
        // })

        getUserDetails()

    }


    const getUserDetails = async() =>{
        console.log(token)

        try {
            let res = await userDetailsCustomer(customerID)
            console.log(res)
            setFisrtname(res.data.customer.firstname)
            setLastname(res.data.customer.lastname)
        } catch (error) {
            alert(error.message)
        }

        
        // let res = await axios.get(`http://localhost:8080/bank/user/${customerID}`,{
        //     headers: { Authorization: `Bearer ${token}`}
        // })

        
       
    }

    useEffect(()=>{
        getUserDetails()
    },[])


  return (
    <>
     <Navbar role={'User'} username={dbUsername}/>

     <div className="container1 App">
        <h3>My Profile</h3>
        <div className="tab-content" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <form action="AdminNewCustomer" method="post" className="form-box">
                    <div className="form-group">
                    <label for="firstName2">First Name</label>
                    <input value={firstname} name="firstname" type="text" className="form-control" id="firstName2" placeholder="Enter your first name" onChange={(e)=>{
                        setFisrtname(e.target.value)
                    }}/>

                    </div>
                    <div className="form-group">
                    <label for="lastName2">Last Name</label>
                    <input value={lastname} name="lastname" type="text" className="form-control" id="lastName2" placeholder="Enter your last name"onChange={(e)=>{
                        setLastname(e.target.value)
                    }}/>
                    </div>
                    <div className="form-group">
                    <label for="password2">Password</label>
                    <input name="password" type="password" className="form-control" id="password2" placeholder="Enter your password"onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={updateUserBackend}>Submit</button>
                </form>
        </div>
    </div>

    </>
  )
}

export default Profile
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../SharedComponents/Navbar'

const UserDashboard = () => {
  const username = useParams().email
  const navigate = useNavigate()

  const transfer = ()=>{
    navigate(`/myaccounts`)
  }

  useEffect(()=>{
    transfer()  
  })
 

  return (
    <div>
       <Navbar role={'User'} username={username}/>
       
       
    </div>
    
      
  )
}

export default UserDashboard
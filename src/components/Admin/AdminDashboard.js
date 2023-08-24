import React, { useEffect } from 'react'
import Navbar from '../SharedComponents/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const AdminDashboard = () => {
  const username = useParams().email
  const navigate = useNavigate()

  const transfer = ()=>{
    navigate(`/bank`)
  }

  useEffect(()=>{
    transfer()
  })

  return (
    <div>
      <Navbar role={'Admin'} username={username}/>  
    </div>
  )
}

export default AdminDashboard
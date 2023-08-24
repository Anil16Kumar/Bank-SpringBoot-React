import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Guard = (props) => {
    const {Component,role} = props

    const navigate  = useNavigate();

    useEffect(()=>{
        let lsRole = localStorage.getItem('role')

        if(lsRole!==role){
            navigate('/notfound')
        }
    })

  return (
    <div>
      <Component></Component>
    </div>
  )
}

export default Guard
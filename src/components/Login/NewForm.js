import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';

const divStyle={
    display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',
}

const formStyle = {
  backgroundColor:'lightgray',
  color:'brown',

  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  
};

const NewForm = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [isChecked, setIsChecked] = useState(false);

    const [data,setData] = useState({})
    const navigate = useNavigate();
   



    const handleMySubmit= async (e)=>{
        e.preventDefault()  
        let response = await axios.post('http://localhost:8080/api/auth/login',{
            username:email,
            password
        })

        if(response.status == 200){
        localStorage.setItem("auth",response.data.accessToken)
        localStorage.setItem("role",response.data.roleName)
        localStorage.setItem("username",email)
        localStorage.setItem("customerid",response.data.customerid)
        }


        const token = localStorage.getItem("auth")
        console.log("token:",token)

        if(response.data.roleName === "ROLE_ADMIN"){
            navigate(`/admindashboard/${email}`);
            return
        }

        navigate(`/userdashboard/${email}`);

        return 
    }



    const abc=(e)=>{
        setEmail(e.target.value)
    }

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
      }

  
   
  return (
    <div style={divStyle}>
    <form  style={formStyle}>
    
    

    <div className="mb-3">
    <label  className="form-label">Email address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={abc}
    value={email}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
    <label  className="form-label">Password</label>
    <input type="password" className="form-control"
    onChange={
        (e) =>{
            setPassword(e.target.value)
        }
    }
    id="exampleInputPassword1"  value ={password}/>
   </div>
   <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input"
     id="exampleCheck1"  onClick={handleCheckboxClick}
     checked={isChecked}/>
    <label className="form-check-label" >Check me out</label>
    </div>
     <button type="submit" className="btn btn-primary" onClick={handleMySubmit}>Submit</button>
   
    </form>
  


    </div>
  )
}

export default NewForm
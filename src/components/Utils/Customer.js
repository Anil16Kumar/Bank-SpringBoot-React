import axios from 'axios';
const token = localStorage.getItem("auth")

export const  myAccountsCustomer = async(customerid)=>{

    try {
        let response = await axios.get(`http://localhost:8080/bank/account/${customerid}`,{
            headers: {
                Authorization: `Bearer ${token}`}
        })
        return response 
    } catch (error) {
        throw error
    }
}

export const  myAccountsPagewiseCustomer = async(customerid,currpage,pagesize)=>{

    try {
        let response = await axios.get(`http://localhost:8080/bank/account/${customerid}/${currpage}/${pagesize}`,{
            headers: {
                Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}

export const userDetailsCustomer = async(customerID)=>{
    try {
        let response = await axios.get(`http://localhost:8080/bank/user/${customerID}`,{
            headers: { Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}

export const updateUserDetailsCustomer = async(customerID,password,firstname,lastname)=>{
    try {
        let response = await axios.post(`http://localhost:8080/bank/user/update/${customerID}`,{
            password,
            customer:{
                firstname,
                lastname
            }
        },{
            headers: { Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}
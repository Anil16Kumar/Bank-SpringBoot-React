import axios from 'axios';
const token = localStorage.getItem("auth")



export const allBanks = async ()=>{

    try {
        let response = await axios.get('http://localhost:8080/bank/allbanks',{
            headers: {
              Authorization: `Bearer ${token}`}
          })

        return response
    } catch (error) {
        throw error
    }

}

export const allBanksPageWise = async(currpage,pagesize)=>{
    
    try {
        let response  =  await axios.get(`http://localhost:8080/bank/allbanks/${currpage}/${pagesize}`,{
            headers: {
              Authorization: `Bearer ${token}`}
          })

          return response
      
    } catch (error) {
        throw error
    }
}


export const deleteBankById = async(bankid)=>{

    try {
        let response = await axios.post(`http://localhost:8080/bank/deletebank/${bankid}`,{},{
            headers: {
              Authorization: `Bearer ${token}`}
          })
          alert("Bank deleted")
    } catch (error) {
        throw error
    }
}

export const allAccountsAdmin = async()=>{
    
        try {
            let response = await axios.get('http://localhost:8080/bank/allaccounts',{
                headers: {
                    Authorization: `Bearer ${token}`}
            })

            return response
            
        } catch (error) {
            throw error
        }
}

export const allAccountsAdminPageWise = async(currpage,pagesize)=>{

    try {
        let response = await axios.get(`http://localhost:8080/bank/allaccounts/${currpage}/${pagesize}`,{
            headers: {
                Authorization: `Bearer ${token}`}
        })

        return response

        
    } catch (error) {
        throw error
    }
}

export const delAccountAdmin = async(accountno,abbrv,customerid)=>{
    try {
        let response = await axios.post(`http://localhost:8080/bank/deleteaccount/${accountno}/${abbrv}/${customerid}`,{},{
            headers: {
              Authorization: `Bearer ${token}`}
          })

          return response
    } catch (error) {
        throw error
    }
}

export const dropDownCustomerDataAdmin = async()=>{
    try {
        let response = await axios.get('http://localhost:8080/bank/customer/customers',{
            headers: {
                Authorization: `Bearer ${token}`}
        })

        return response
    } catch (error) {
        throw error
    }
}

export const dropDownBankDataAdmin = async()=>{
    try {
        let response = await axios.get('http://localhost:8080/bank/allbanks',{
            headers: {
              Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}
export const addBankAdmin = async(bankname,bankabbr)=>{
    try {
        let response = await axios.post('http://localhost:8080/bank/addnewbank',{
            bankname:bankname,
            abbrevation:bankabbr
        })
        return response
    } catch (error) {
        throw error
    }
}

export const updateBankAdmin = async(prefilledbankid,prefilledbankname,prefilledbankabrv)=>{
    try {
        let response = await axios.post('http://localhost:8080/bank/update',{
            bankid: prefilledbankid,
            bankname: prefilledbankname,
            abbrevation: prefilledbankabrv,
        },{
          headers: {
            Authorization: `Bearer ${token}`}
        })

        return response
    } catch (error) {
        throw error
    }
}

export const allCustomerAdmin = async()=>{
    try {
        let response = await axios.get('http://localhost:8080/bank/customer/customers',{
            headers: {
                Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}

export const allCustomerPageWiseAdmin = async(currpage,pagesize)=>{
    try {
        let response = await axios.get(`http://localhost:8080/bank/customer/customers/${currpage}/${pagesize}`,{
            headers: {
                Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        throw error
    }
}

export const deleteCustomerAdmin = async(customerId)=>{

    try {
        let response = await axios.post(`http://localhost:8080/bank/user/${customerId}`,{},{
            headers: {
              Authorization: `Bearer ${token}`}
          })
         return response 
    } catch (error) {
        throw error
    }
}

export const addAccountAdmin = async(customerId,bankabbrv,balance)=>{

    try {
        let response = await axios.post(`http://localhost:8080/bank/customer/addcustomerbankaccount/${customerId}/${bankabbrv}/${balance}`,{},{
            headers: {
                Authorization: `Bearer ${token}`}
        })

        return response
    } catch (error) {
        throw error
    }

    
}

export const addNewCustomer = async(username,password,firstname,lastname)=>{
    try {
        let response = await axios.post('http://localhost:8080/api/auth/register',{
            username,
            password,
            customer:{
                firstname,
                lastname
            }
        },{  headers: {
            Authorization: `Bearer ${token}`}
        })

        return response
    } catch (error) {
        throw error
    }
}
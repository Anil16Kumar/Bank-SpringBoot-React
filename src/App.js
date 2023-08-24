import logo from './logo.svg';
import './App.css';
import NewForm from './components/Login/NewForm';
import UserDashboard from './components/Customer/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bank from './components/Admin/Bank';
import Customer from './components/Admin/Customer';
import Accounts from './components/Admin/Accounts';
import MyAccounts from './components/Customer/MyAccounts';
import Payment from './components/Customer/Payment';
import Profile from './components/Customer/Profile';
import Guard from './components/SharedComponents/Guard';
import Notfound from './components/SharedComponents/Notfound';

function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
            
            <Route path='/customer'element={<Guard Component ={Customer} role={'ROLE_ADMIN'}/>}/>
            <Route path='/accounts' element={<Guard Component ={Accounts} role={'ROLE_ADMIN'}/>}/>
            <Route path='/bank' element={<Guard Component ={Bank} role={'ROLE_ADMIN'}/>}/>
           
            <Route path='/admindashboard/:email' element={<Guard Component ={AdminDashboard} role={'ROLE_ADMIN'}/>}/>


            <Route path='/notfound' element={<Notfound/>}/>
            <Route path='/' element={<NewForm/>}/>

            <Route path='/userdashboard/:email' element={<Guard Component ={UserDashboard} role={'ROLE_USER'}/>}/>
            <Route path='/myaccounts' element={<Guard Component ={MyAccounts} role={'ROLE_USER'}/>}/>
            <Route path='/payment' element={<Guard Component ={Payment} role={'ROLE_USER'}/>}/>
            <Route path='/profile' element={<Guard Component ={Profile} role={'ROLE_USER'}/>}/>
            
          </Routes>
       </BrowserRouter>
     </>
  );
}

export default App;
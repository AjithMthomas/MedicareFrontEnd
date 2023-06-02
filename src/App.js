import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Accounts/Login';
import SignUp from './Components/Accounts/Register';
import ForgetPassword from './Components/Accounts/ForgotPassword';
import ResetPassword from './Components/Accounts/ResetPassword';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import HomePage from './pages/User/Home';
import AdminHome from './pages/admin/AdminHome';
import AdminDashbord from './Components/Admin/Dashboard';
import UsersList from './Components/Admin/userList';
import DoctorsList from './Components/Admin/doctorsList';
import axios from 'axios';
import { BASE_URL } from './Utils/config';
import Appointments from './Components/Admin/Appointment';
import Department from './Components/Admin/Department';
import AddDepartmentForm from './Components/Admin/AddDepartment';



function App() {
  axios.defaults.baseURL = BASE_URL;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='login' element ={<Login/>}/>
          <Route path='Register' element ={<SignUp/>}/>
          <Route path='/' element ={<HomePage/>}/>
          <Route path='forgotPassword' element ={<ForgetPassword/>}/>
          <Route path='ResetPassword' element ={<ResetPassword/>}/>
          <Route path='DoctorHome' element ={<DoctorDashboard/>}/>
        
        {/* admin interface */}
          <Route path='AdminDashboard/' element ={<AdminHome/>} children={[
               <Route path='' element ={<AdminDashbord/>}/>,
               <Route path='usersList/' element ={<UsersList/>}/>,
               <Route path='doctorsList/' element ={<DoctorsList/>}/>,
               <Route path='appointments/' element ={<Appointments/>}/>,
               <Route path='department/' element ={<Department/>}/>,
               <Route path='addDepartment/' element ={<AddDepartmentForm/>}/>,
               ]}/>
               
        </Routes>
      </Router>
    </div>
  );
}

export default App;

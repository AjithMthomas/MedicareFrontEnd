import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Accounts/Login';
import SignUp from './Components/Accounts/Register';
import ForgetPassword from './Components/Accounts/ForgotPassword';
import ResetPassword from './Components/Accounts/ResetPassword';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import HomePage from './pages/User/Home';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
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
          <Route path='AdminDashboard' element ={<AdminDashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

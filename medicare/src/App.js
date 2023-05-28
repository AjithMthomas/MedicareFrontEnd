import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Accounts/Login';
import SignUp from './Components/Accounts/Register';
import ForgetPassword from './Components/Accounts/ForgotPassword';
import ResetPassword from './Components/Accounts/ResetPassword';
import HomePage from './pages/Home';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

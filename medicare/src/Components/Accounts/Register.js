import {Link} from 'react-router-dom'
import React,{useState,useEffect} from 'react';
import { BASE_URL } from '../../Utils/config';
import { toast,Toaster } from 'react-hot-toast'
import PageLoader from '../UserSide/PageLoader';

function SignUp() {
    const [username,setUsername] = useState ('')
    const [email,setEmail] = useState('')
    const [phone_number,setPhonenumber] = useState('')
    const [password,setPassword] = useState('')
    const [cPassword,setCpassword] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous task
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);

    const SignUpSubmit = async (e) => {
        e.preventDefault();
      
        if (password === cPassword) {
          try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                email,
                phone_number: phone_number,
                password,
              }),
            });
      
            if (response.ok) {
              toast.success('Account Created, Check mail for activation');
              e.target.reset();
            } else {
              toast.error('Credential already exist');
            }
          } catch (error) {
            toast.error('Credential already exist');
            console.error(error);
          }
        } else {
          toast.error("Password didn't match");
        }
      };
      

    return (
        <div>
        {isLoading ? (
          <PageLoader />
        ) : (
     
        <div className="relative flex flex-row  min-h-screen bg-no-repeat bg-cover justify-end overflow-hidden bg-[url('images/login.jpg')] " >
        <Toaster position='top-center' reverseOrder='false'  ></Toaster>
         <h1 className='ps-6 pt-4 text-xl font-bold '>MEDIcare</h1>
         <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg:max-w-xl  border border-purple-100">
                <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                   Register
                </h1>
                
                <form className="mt-6" onSubmit={SignUpSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="Name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="Name" name='Name' onChange={e =>setUsername(e.target.value)}
                            className="w-3/4 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email" name='email' onChange={e =>setEmail(e.target.value)}
                            className="w-3/4 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="number"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"  name='Pnumber' onChange={e=>setPhonenumber(e.target.value)}
                            className="w-3/4 px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password" name='password' onChange={e=>setPassword(e.target.value)}
                            className=" w-3/4  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                             Confirm Password
                        </label>
                        <input
                            type="password" name='cPassword' onChange={e=> setCpassword(e.target.value)}
                            className=" w-3/4  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                   
                    <div className="mt-6">
                        <button className="w-80 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                Have an account?{" "}
                <Link to="/login"><button className="font-medium text-purple-600 hover:underline">Login</button></Link>
                    
                </p>
            </div>
            <div className="w-1/2"></div> 
        </div>
        )}
        </div>   
    );
}

export default SignUp



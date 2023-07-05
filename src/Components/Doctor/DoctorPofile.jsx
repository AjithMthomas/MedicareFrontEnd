import React ,{useState}from 'react'
import { HiUsers } from 'react-icons/hi'
import { FaPowerOff } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import {LuHistory} from "react-icons/lu";
import { BiEdit, BiCategory } from "react-icons/bi";
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import { useEffect } from 'react';
import { getLocal } from '../Contexts/auth'
import jwt_decode from 'jwt-decode';
import { BASE_URL } from "../../Utils/config";



function DoctorProfile() {
    const [options,setOptions] = useState(false)
    
    const [doctor,setDoctor] = useState('')
    const [docDetails,setDocDetails] = useState({})
   
    

    
      async function getDoctorDetails() {
        try {
          const response = await axios.get(`doctor/getSingleDocter/${doctor}`);
          setDocDetails(response.data);
        } catch (error) {
          console.error('could not fetch data', error);
        }
      }
      useEffect(() => {
        const localResponse = getLocal('authToken');
        const response = jwt_decode(localResponse);
        setDoctor(response?.user_id,'id');
       
      }, []);

      useEffect(() => {
        if (doctor) {
          getDoctorDetails();
        }
      }, [doctor]);
  return (
   <>
    <div className='mt-2 '>
  <div className="w-full h-[250px]">
    <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
  </div>
  <div className="flex flex-col items-center -mt-20">
    <img src={BASE_URL+ docDetails?.user?.image} className="w-40 border-4 h-40 object-cover border-white rounded-full"/>
    <div className="flex items-center space-x-2 mt-2">
      <p className="text-2xl">{docDetails?.user?.username}</p>
      <span className="bg-blue-500 rounded-full p-1" title="Verified">
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </div>
    
  </div>
  <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
    <div className="flex items-center space-x-4 mt-2">
      <button onClick={()=>setOptions(!options)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
        <span>Menu</span>
      </button>
      {options&&
      <div className="bg-white absolute right-8 w-40  mt-64 border border-gray-200 shadow-2xl" >
      <div className="py-2 border-b">
        <button onClick={()=>{
            localStorage.setItem('component','profiledetails')
            setOptions(false)
        }} className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
          <CgProfile/>
          <span className="text-sm text-gray-700">profile</span>
        </button>
        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
         <LuHistory />
        <span className="text-sm text-gray-700">History</span>
      </button>
        <button 

         className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
          <BiEdit />
          <span className="text-sm text-gray-700">Edit profile</span>
        </button>
      </div>
    </div>
      }
     
    </div>
  </div>
    {localStorage.getItem('component')==='profiledetails' ? < ProfileDetails doctor={docDetails}/>:''}
  </div>
</>
  )
}

export default DoctorProfile
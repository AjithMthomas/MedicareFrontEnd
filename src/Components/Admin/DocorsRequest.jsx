import axios from 'axios'
import React,{useState,useEffect,useNaviagate} from 'react'
import { FaEye } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';
import { BASE_URL } from '../../Utils/config';
import { toast, Toaster } from 'react-hot-toast';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";




function DocorsRequest() {
  
    const [doctors,setDoctors] = useState([])
    const [view,setVIew] = useState(false)
    const [doctor, setDoctor] = useState({});



    async function getDoctors(){
        try{
            const response = await axios.get('/admins/doctorsRequest/')
            console.log(response.data)
            setDoctors(response.data)
        }catch(e){
            console.log(e)
        }
    }

    
  
    async function getDoctor(id) {
        setVIew(true)
      try {
        const response = await axios.get(`/doctor/viewDoctorRequest/${id}`);
        setDoctor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("error", error);
      }
    }
    
    async function acceptDoctor(id){
      try{
        const response = await axios.get(`/admins/accept_doctor/${id}`)
        toast.success('Request accepted')
        setVIew(true)
       

      }catch(e){
        console.log(e)
      }
    }
    async function rejectDoctor(id){
      try{
        const response = await axios.get(`/admins/reject_doctor/${id}`)
        toast.error('Request rejected')
        setVIew(true)
       

      }catch(e){
        console.log(e)
      }
    }

    useEffect(()=>{
        getDoctors()
        },[])
    
  
  return (
    <div className='flex h-full bg-acontent mt-3'>
    {view?
        
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col place-items-center place-content-center'>
                <Toaster position="top-right" reverseOrder={false} limit={1}></Toaster>

          <RiCloseCircleFill className='w-8 text-end h-8 text-gray-100 mt-0' onClick={()=>setVIew(false)}/>
        <Card className="mt-6 w-2/4 h-3/4 ">
    
        <CardHeader color="blue-gray" className="relative ">
          <div className="h-full">
          
          <img

            src={BASE_URL+doctor.certificate}
            alt="image"
            className="w-full h-full bg-cover "
          />
          </div>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Address: {doctor.address}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Specialization: {doctor.specialization}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Experience: {doctor.experience} years
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Fee: RS {doctor.fee}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 justify-between">
          <Button className="bg-green-500 p-3 w-40" onClick={()=>acceptDoctor(doctor.id)}>Accept</Button>
          <Button className="bg-red-700 p-3 w-40 ms-3" onClick={()=>rejectDoctor(doctor.id)}>Reject</Button>
        </CardFooter>
       
      </Card>
      </div>
       
    :
    
       
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
       
        <div className="w-full p-5 flex justify-between"> 
        <h1 className='font-serif  text-3xl text-start  ms-4'>Doctors Request</h1>  
    <input
        type="text"
        placeholder='&#x1F50D; Search email or name'
        className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg "
    />
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Doctor Name</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Specialization</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Status</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Action</th>
            </tr>
            </thead>
           
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
             {doctors?.map((doctor)=>(
                            <tr class="hover:bg-gray-50" key={doctor?.id}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            
                            <div class="text-sm">
                                <div class="font-medium text-gray-700"></div>
                                <div class="text-gray-400">{doctor?.user?.username}</div>
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <p>{doctor?.specialization?.name}</p>
                            </td>
                            <td class="px-6 py-4">
                             
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                </span>
                            </td>

                            <td class="px-6 py-4">
                         <div className="flex" onClick={()=>getDoctor(doctor?.id)}>
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked="{doctor.is_active}"
                                        readOnly
                                    />
                                    <div
                                        
                                       
                                    > <FaEye/></div>
                                  
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            View
                                        </span>
                                </label>
                            </div>
                        </td>
                        </tr>
                     ) )} 
            </tbody>
        </table>
        </div>
    </div>
    </div>
}
    </div>
            

  )
}

export default DocorsRequest
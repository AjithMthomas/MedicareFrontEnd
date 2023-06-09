import React,{useState,useEffect} from 'react'
import axios from 'axios'
import avatar from "../../images/doctorAvatar.jpg"



function Appointments() {

   const [appointments,setAppointments] = useState([])

   async function getAppointments(){
    try{
        const response  = await axios.get('/doctor/appointments')
        console.log(response.data)
        setAppointments(response.data)
    }catch(error){
        console.error('could not fetch data',error)
    }
   }
   useEffect(()=>{
    getAppointments()
   },[])
   

  
  return (
    <div className='flex h-full bg-acontent mt-3'>
       
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
       
        <div className="w-full p-5 flex justify-between"> 
        <h1 className='font-serif  text-3xl text-start  ms-4'>Appointments</h1>  
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
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Patien Name</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Appoinment date</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Fees</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Status</th> 
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {appointments?.map((appointment,index)=>
                            <tr class="hover:bg-gray-50" key={index}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div class="relative h-10 w-10">
                                {appointment.doctor.user.image?
                                <img class="h-full w-full rounded-full object-cover object-center" src={appointment.doctor.user.image}
                                alt="avatar"/>
                                :
                                <img class="h-full w-full rounded-full object-cover object-center" src={avatar}
                                alt="avatar"/>
                            }
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-700">{appointment.doctor.user.username}</div>
                                <div class="text-gray-400">{appointment.doctor.specialization.name}</div>
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <p>{appointment.patient.username}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>{appointment.date}</p>
                            </td>
                            <td class="px-6 py-4">
                            <p>{<div>{appointment.conulting_fee}Rs</div>}</p>
                           </td>
                            <td class="px-6 py-4">
                            {appointment.status.Pending?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                     pending
                                    </span>
                                    :
                                     <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                     approved
                                    </span>
                                    
                                }
                            </td>
                        </tr>
                        )}
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Appointments
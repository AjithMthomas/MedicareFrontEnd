import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';





function DocorsRequest() {
  
    const [doctors,setDoctors] = useState([])
    
    async function getDoctors(){
        try{
            const response = await axios.get('/docter/doctorsRequest/')
            console.log(response.data)
            setDoctors(response.data)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getDoctors()
        },[])

  
  return (
    <div className='flex h-full bg-acontent mt-3'>
       
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
                            <tr class="hover:bg-gray-50" key={doctor.id}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            
                            <div class="text-sm">
                                <div class="font-medium text-gray-700"></div>
                                <div class="text-gray-400">{doctor.user.username}</div>
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <p>{doctor.specialization.name}</p>
                            </td>
                            <td class="px-6 py-4">
                             
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                </span>
                            </td>

                            <td class="px-6 py-4">
                         <Link to={`/AdminDashboard/AcceptDoctor/${doctor.id}`}><div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked="{doctor.is_active}"
                                        readOnly
                                    />
                                    <div
                                        onClick="{(()=>changeStatus(doctor.id))}"
                                       
                                    > <FaEye/></div>
                                  
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            View
                                        </span>
                                </label>
                            </div></Link> 
                        </td>
                        </tr>
                     ) )} 
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
  )
}

export default DocorsRequest
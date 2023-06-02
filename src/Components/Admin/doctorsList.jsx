import axios from 'axios'
import React,{useState,useEffect} from 'react'
import avatar from "../../images/doctorAvatar.jpg"





function DoctorsList() {
    const [doctors,setDoctors] = useState ([])

    async function getDoctors(){
        try{
            const response = await axios.get('/api/doctors/')
            setDoctors(response.data)

        }catch(error){
            console.error('error',error)
        } 
    }

    useEffect(()=>{
        getDoctors()
    },[])
  

    async function changeStatus(id){
        try{
            const response = await axios.get(`/api/blockDoctor/${id}`)
            getDoctors()
        }catch(error){
            console.error('No related user',error)
        }
    }


  
  return (
    <div className='flex h-full bg-acontent mt-3'>
       
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
       
        <div className="w-full p-5 flex justify-between"> 
        <h1 className='font-serif  text-3xl text-start  ms-4'>Doctors List</h1>  
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
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Email</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Status</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Action</th>
            </tr>
            </thead>
           
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {doctors?.map((doctor,index)=>(
                            <tr class="hover:bg-gray-50" key={index}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div class="relative h-10 w-10">
                                {doctor.image?
                                <img class="h-full w-full rounded-full object-cover object-center" src={doctor.image}
                                alt="avatar"/>
                                :
                                <img class="h-full w-full rounded-full object-cover object-center" src={avatar}
                                alt="avatar"/>
                                }
                                {doctor.is_active?
                                <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                :
                                <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-red-700 ring ring-white"></span>
                            
                            }
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-700">{doctor.username}</div>
                                <div class="text-gray-400">{doctor.email}</div>
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <p>{doctor.email}</p>
                            </td>
                            <td class="px-6 py-4">
                              {doctor.is_active?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                </span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                        Blocked
                                </span>
                                }
                            </td>

                            <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={doctor.is_active}
                                        readOnly
                                    />
                                    <div
                                        onClick={(()=>changeStatus(doctor.id))}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                  {doctor.is_active?
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Block
                                        </span>
                                        :
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Unblock
                                        </span>
                                  }
                                </label>
                            </div>
                        </td>
                        </tr>
                        ))}
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
  )
}

export default DoctorsList
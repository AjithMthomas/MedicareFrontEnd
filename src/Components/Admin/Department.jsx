import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Button } from "@material-tailwind/react";


function Department() {
    const [departments,setDepartments] = useState([])
    
    async function getDeparments(){
        try{
            const response = await axios.get('/api/departments')
            setDepartments(response.data)
        }catch(error){
            console.log('could not fetch data',error)
        }
    }

    useEffect(()=>{
        getDeparments()
    },[])
  
  return (
    <div className='flex h-full bg-acontent mt-3 w-full '>
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
        <h1 className='font-serif  text-3xl text-start  underline ms-4'>Appointments</h1>  
        <div className="w-full p-5 flex justify-end ">
        <Link to="/AdminDashboard/addDepartment"><Button variant="outlined " className='py-4  text-grayh border border-blue-300'>Add Department</Button></Link> 
       
    <input
        type="text"
        placeholder='&#x1F50D; Search email or name'
        className="border  border-blue-300 border-solid focus:outline-none px-2 w-1/5 rounded-lg ml-3 "
    />
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Category Name</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Doctors</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Active Doctors</th>
                <th scope="col" class="px-6 py-4 font-large text-gray-900">Edit</th>
       
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {departments?.map((department,index)=>
                            <tr class="hover:bg-gray-50" key={index}>
                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <div class="relative h-10 w-10">
                                <img class="h-full w-full rounded-full object-cover object-center" src={department.image}
                                alt="avatar"/>
                           
                            </div>
                            <div class="text-sm">
                                <div class="font-medium text-gray-700">{department.name}</div>
                                
                            </div>
                            </th>
                            <td class="px-6 py-4">
                                <p>hsfgswihf</p>
                            </td>
                            <td class="px-6 py-4">
                                <p>shss</p>
                            </td>
                            <td class="px-6 py-4">
                          <AiFillEdit/>
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

export default Department
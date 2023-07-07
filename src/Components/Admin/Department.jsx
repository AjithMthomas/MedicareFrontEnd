import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import { RxSwitch } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { toast,Toaster,} from "react-hot-toast";
import EditDepartment from './EditaDepartment';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [show,setShow] = useState(false)
  const [departmentId,setDepartmentId] = useState ('')

  async function getDepartments() {
    try {
      const response = await axios.get('/doctor/departments');
      setDepartments(response.data);
    } catch (error) {
      console.log('Could not fetch data', error);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((department) =>
        department?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchQuery, departments]);

  function handleClick(id){
    setDepartmentId(id)
    setShow(true)
 }


  return (
    <div className="flex h-full bg-acontent mt-3 w-full">
    <Toaster position='top-center' reverseOrder='false'  ></Toaster>
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <h1 className="font-serif  text-3xl text-start ms-4">Appointments</h1>
          <div className="w-full  flex justify-between mt-4">
            <Link to="/AdminDashboard/addDepartment">
              <Button variant="outlined" className="py-4  text-grayh border border-blue-300 ms-10">
                Add Department
              </Button>
            </Link>

            <input
              type="text"
              placeholder="&#x1F50D; Search email or name"
              className="border  border-blue-300 border-solid focus:outline-none px-2 w-1/5 rounded-lg ml-3 me-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-hidden rounded-lg border shadow-lg mt-2 max-w-[950px] mx-auto ">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 ">
              <thead className="">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                   
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900 "
                  >
                   
                  </th>
                 
                  <th scope="col" className="px-6 py-4 font-large text-gray-900 "
                  >
                   
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {filteredDepartments?.length > 0 ? (
                  filteredDepartments.map((department, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <td className="gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className= "flex relative items-center h-14 w-14">
                          <img
                            className="h-full w-full rounded-full "
                            src={department?.image}
                            alt="avatar"
                          />
                         
                        </div>
                       
                      </td>
                      <td className=" px-6 py-4  ">
                      <div className="font-medium text-gray-700 flex justify-center ">{department?.name}</div>
                      </td>
                     
                      <td className=" px-6 py-4  flex justify-center">
                        <div className="flex ms-10">
                        <Button color="green"  onClick={()=>handleClick(department?.id)}><span className='flex'> Edit  <AiFillEdit className='w-4 h-4 ms-3'/></span></Button>
                        <Button color="red" className='ms-3' ><span className='flex '>List  <RxSwitch className='w-4 h-4 ms-3 '/></span></Button>
                       </div>
                      </td>
                      {show && 
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <EditDepartment setShow={setShow} departmentId={departmentId} />
                    </div>}
                    </tr>
                    
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-red-500 font-bold"
                    >
                      No related departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;

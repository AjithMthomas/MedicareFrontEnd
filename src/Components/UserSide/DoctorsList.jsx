import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BiCategory } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { BASE_URL } from "../../Utils/config";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react"
import axios from "axios"; 


 
export default function  DoctorList() {

  const [doctors,setDoctors] =useState([])

  async function getDoctor() {
    try {
      const response = await axios.get('/api/doctors/');
      setDoctors(response.data);
      console.log(response.data)
    } catch (error) {
      // Handle the error here
      console.error('Error fetching users:', error);
    }
  }
  useEffect (()=>{
    getDoctor()
  },[])

  return (
    <Card className="h-full mx-10 my-3">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className="font-serif text-start ml-5">
             Doctors
            </Typography>
            <Typography color="gray" className="mt-1 font-normal ml-5">
              Search for doctors accordin to your needs
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-ful px-2 place-items-center border-black-500 border-2 rounded-lg md:w-72 flex">
              <FiSearch className=" text-black-300" size={20}/>
              <input type="tex" placeholder="Search" className=" ms-2 focus:outline-none bg-transparent " />
          </div>
            <Button className="flex items-center gap-3 me-8" color="blue" size="sm">
              <BiCategory strokeWidth={2} className="h-4 w-4" /> Specialization
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
          </thead>
          <tbody className=" place-content-center place-items-center flex flex-col w-full">
            {doctors?.map((doctor,index)=>{
                return (
                  <tr key={index} className="w-5/6 flex place-content-between">
                    <td className="{classes}">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={doctor.image}
                          alt="profile "
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="small" color="blue-gray" className="font-bold">
                         {doctor.username}
                        </Typography>
                      </div>
                    </td>
                    <td className="{classes}">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {doctor.fee}
                      </Typography>
                    </td>
                    <td className="{classes}">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                       
                      </Typography>
                    </td>
                    <td className="{classes}">
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value="{status}"
                        
                        />
                      </div>
                    </td>
                   
                    <td className="{classes}">
                    <Button className="flex items-center gap-3 me-8  bg-yellow-500  text-black"  size="sm">
                      Appointment
                    </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
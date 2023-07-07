import React, { useState,useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  avatar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@material-tailwind/react";
import profile from "../../images/doctorAvatar.jpg"
import { Link, useNavigate } from "react-router-dom";
import login,{ getLocal } from '../Contexts/auth'
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { BASE_URL } from "../../Utils/config";

 
export default function Sidebar() {
  const [open, setOpen] = React.useState(0);

  const [doctor,setDoctor] = useState('')
  const [docDetails,setDocDetails] = useState({})
   

  

  const history = useNavigate()

  const handleclick=()=>{
    localStorage.removeItem('authToken');
    history('/login')
  }
 
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
  
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-xl" >
      <div className="mb-2 p-4  ">
      <Avatar src={BASE_URL+docDetails?.user?.image}alt="avatar" size="sm" className="h-[8rem] w-[8rem] rounded-full " />
        <Typography variant="h5" color="blue-gray">
       Dr. {docDetails?.user?.username}
        
        </Typography>
      </div>
      <List>
      
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Appointments
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
             <Link to='appointment/'><ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                View Appointments 
              </ListItem></Link> 
            <Link to='shedule/'><ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
              Shedule Appointments
              </ListItem></Link>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        
       <Link to='profile/'> <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem></Link>
        <Link to='createRoom/'><ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Create Room
          <ListItemSuffix>
          </ListItemSuffix>
        </ListItem></Link>
       
       <Link to='createBlog/'> <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
         Create blog
        </ListItem></Link>
        <ListItem onClick={()=>handleclick()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
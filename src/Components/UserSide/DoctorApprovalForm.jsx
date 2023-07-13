import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { toast,Toaster } from 'react-hot-toast';
  import { getLocal } from '../Contexts/auth'
  import jwt_decode from 'jwt-decode';
  import baground from "../../images/thome.jpg"
  import { useNavigate } from "react-router-dom";
  
  export default function DoctorApprovalForm() {
    const [departments, setDepartments] = useState([]);
    const [address, setAddress] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState(0);
    const [fee, setFee] = useState(0);
    const [certificate, setCertificate] = useState(null);
    const [user,setUser] = useState("")
    const [is_approved,setIs_approved] = useState(false)
  
    const histoty = useNavigate()
  
    const createDoctor = async (e) => {
        e.preventDefault()
        try {
          if (!localStorage.getItem('authToken')) {
             histoty('login')
            return;
          }
      
          
          if (address === '') {
            throw new Error('Please enter an address');
          }
      
          if (specialization === '') {
            throw new Error('Please select a specialization');
          }
      
          if (experience === '') {
            throw new Error('Please enter your experience');
          }
      
          if (fee === '') {
            throw new Error('Please enter your fee');
          }
      
          // Create a new FormData object
          const formData = new FormData();
          formData.append("address", address);
          formData.append("specialization", specialization);
          formData.append("experience", experience);
          formData.append("fee", fee);
          formData.append("certificate", certificate);
          formData.append("is_approved", is_approved);
          formData.append("user",user);
      
         
          const response = await axios.post("/doctor/createDoctors/", formData);
      
          if (response.status === 201) {
            toast.success('Doctor request sent successfully,check email');
          } else {
        
            toast.error('Error creating doctor');
          }
        } catch (error) {
          console.log(error);
          toast.error('coudnt submit the request');
        }
      };

    async function getDepartments() {
      try {
        const response = await axios.get("/doctor/departments");
        setDepartments(response.data);
      } catch (error) {
        console.log("could not fetch data", error);
      }
    }
  
    useEffect(() => {
      
      const localResponse = getLocal('authToken');
      const decoded = jwt_decode(localResponse)
      if(decoded){
        setUser(decoded.user_id)
        getDepartments();
      }else{
        histoty('login')
        toast.error('Please Login to fill the form',{duration:5000})
      }
    }, []);
  
   
  
    return (
    <div className="w-full h-screen bg-cover " style={{backgroundImage: `url(${baground})`}}>
      <div className="flex place-content-center top-0 place-items-center h-/4  mb-32 ">
        <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
        <Card  shadow={false} className=" ms-40 p-4 w-3/6 mt-16 bg-cover bg-blur-lg">
          <Typography variant="h4" color="blue-gray" className="font-serif mt-2 ">
            FILL THE FORM
          </Typography>
          <form className="mt-8 mb-2 w-full flex flex-col place-content-center place-items-center "  onSubmit={createDoctor}>
            <div className="mb-4 flex flex-col gap-6 w-3/4">
              <Input size="lg" label="Address" className="mt-4 text-start p-3" name="address" onChange={(e) => setAddress(e.target.value)} />
  
              <div className="relative mt-3">
                <select
                  className="w-full py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  name="specialization"
                >
                  {departments?.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
  
              <Input size="lg" label="Experience" type="number" name="experience" className="mt-4 p-3" onChange={(e) => setExperience(e.target.value)} />
  
              <Input size="lg" label="Required Fee in Rs." type="number" name="fee" step="0.01" className="mt-4 p-3" onChange={(e) => setFee(e.target.value)} />
  
              <Input size="lg" label="Certificate" type="file" name="certificate" className="mt-4  p-3" onChange={(e) => setCertificate(e.target.files[0])} />
            </div>
            
            <Button className="mt-6 w-3/4 p-3 mb-7" type="submit" >
              Request
            </Button>
          </form>
        </Card>
      </div>
      </div>
    );
  }
  
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { toast,Toaster } from 'react-hot-toast';
  import login,{ getLocal } from '../Contexts/auth'
  import jwt_decode from 'jwt-decode';
  
  export default function DoctorApprovalForm() {
    const [departments, setDepartments] = useState([]);
    const [address, setAddress] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState(0);
    const [fee, setFee] = useState(0);
    const [certificate, setCertificate] = useState(null);
    const [user,setUser] = useState("")
    const  [is_approved,setIs_approved] = useState(false)
  
    const createDoctor = async (e) => {
        e.preventDefault()
        try {
          if (!localStorage.getItem('authToken')) {
            // User is not logged in, redirect to login page
            return;
          }
      
          // Validate the input data
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
          // Append the user ID to the FormData object
          
          formData.append("user",user);
      
          // Submit the form data to the server
          const response = await axios.post("/api/createDoctors/", formData);
      
          // Check the response status code
          if (response.status === 201) {
            // Success!
            toast.success('Doctor request sent successfully');
          } else {
            // Error!
            toast.error('Error creating doctor');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };

    async function getDepartments() {
      try {
        const response = await axios.get("/api/departments");
        setDepartments(response.data);
      } catch (error) {
        console.log("could not fetch data", error);
      }
    }
  
    useEffect(() => {
      const localResponse = getLocal('authToken');
      const decoded = jwt_decode(localResponse)
      setUser(decoded.user_id)
      getDepartments();
    }, []);
  
   
  
    return (
      <div className="flex place-content-center w-full bg-bl bg-opacity-50 top-0 place-items-center h-3/4 mt-12 mb-32">
        <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
        <Card color="transparent" shadow={false} className="border 2 border-gray-400 p-4 w-3/5">
          <Typography variant="h4" color="blue-gray" className="font-serif mt-2">
            FILL THE FORM
          </Typography>
          <form className="mt-8 mb-2 w-full flex flex-col place-content-center place-items-center"  onSubmit={createDoctor}>
            <div className="mb-4 flex flex-col gap-6 w-3/4">
              <Input size="lg" label="Address" className="mt-3 text-start p-3" name="address" onChange={(e) => setAddress(e.target.value)} />
  
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
  
              <Input size="lg" label="Experience" type="number" name="experience" className="mt-3 p-3" onChange={(e) => setExperience(e.target.value)} />
  
              <Input size="lg" label="Required Fee in Rs." type="number" name="fee" step="0.01" className="mt-3 p-3" onChange={(e) => setFee(e.target.value)} />
  
              <Input size="lg" label="Certificate" type="file" name="certificate" className="mt-3 p-3" onChange={(e) => setCertificate(e.target.files[0])} />
            </div>
            
            <Button className="mt-6 w-3/4 p-3 mb-7" type="submit" >
              Request
            </Button>
          </form>
        </Card>
      </div>
    );
  }
  
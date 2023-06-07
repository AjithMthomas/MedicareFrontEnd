import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";



export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

 


  useEffect(() => {

      // Simulate an asynchronous task
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    // Fetch doctors data from API
    axios.get("/doctor/docorsInUserSide/")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  return (
    <div>
    {isLoading ? (
      <PageLoader />
    ) : (
    <div className="flex flex-wrap justify-center mt-5">
      {doctors?.map((doctor) => (
        <div key={doctor.id} className="w-72 m-4">
          <Card>
            <CardHeader>
              <img
                src={doctor.user && doctor.user.image}
                className="w-full h-56 object-cover"
                alt="Doctor Image"
              />
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <Typography color="blueGray" className="font-small opacity-75">
                
                  {doctor.specialization && doctor.specialization.name}
                </Typography>
                <Typography color="blueGray" className="font-small opacity-75">
                  Fee : {doctor.fee}<span>.rs</span>
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-medium text-xl"
              >
                Dr. {doctor.user&& doctor.user.username}
              </Typography>
            </CardBody>
            <CardFooter>
              <Link to={`/doctorProfileInHome/${doctor.id}`}><Button
                ripple="light"
                block
                color="blueGray"
                className="hover:bg-blueGray-100"
              >
                Appointment
              </Button></Link>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
    )}
    </div>
  );
}

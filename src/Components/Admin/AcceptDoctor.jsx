import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../../Utils/config';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function AcceptDoctor() {
  const [doctor, setDoctor] = useState({});

  const { id } = useParams();

  async function getDoctor() {
    try {
      const response = await axios.get(`/doctor/viewDoctorRequest/${id}`);
      setDoctor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <Card className="mt-6 w-3/4 h-3/4">
      <CardHeader color="blue-gray" className="relative ">
        <div className="h-full">
        <img
          src={BASE_URL+doctor.certificate}
          alt="image"
          className="w-full h-full bg-cover "
        />
        </div>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Address: {doctor.address}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Specialization: {doctor.specialization}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Experience: {doctor.experience} years
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Fee: ${doctor.fee}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 justify-between">
        <Button className="bg-green-500 p-3 w-40">Accept</Button>
        <Button className="bg-red-700 p-3 w-40 ms-3">Reject</Button>
      </CardFooter>
    </Card>
  );
}

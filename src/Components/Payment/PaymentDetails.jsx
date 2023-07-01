import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import PaymentPage from "./Payment";
import { BASE_URL } from "../../Utils/config";
import { Rating } from "@material-tailwind/react";
import { format } from 'date-fns';

export default function PaymentDetails(props) {
  const { doctor, bookedSlot } = props;
  console.log(bookedSlot[0].id,'bopkedsfjosidfj')

  const start_time = format(new Date(`2000-01-01T${bookedSlot[0].start_time}`), 'h:mm a');
  const end_time = format(new Date(`2000-01-01T${bookedSlot[0].end_time}`), 'h:mm a');

  return (
    <Card className="w-96 mt-10 mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-indigo-500">
        <img
          src={BASE_URL + doctor?.user.image}
          alt="profile-picture"
          className="rounded-full w-24 h-24 object-cover mx-auto mt-6"
        />
      </CardHeader>
      <CardBody className="text-center py-8">
        <Typography variant="h5" color="blue-gray-800" className="mb-2">
          Dr. {doctor?.user?.username}
        </Typography>
        <Typography color="blue-500" className="text-lg font-medium">
          {doctor?.specialization?.name}
        </Typography>
        <Rating value={4} readonly className="text-yellow-400 mt-4" />
      </CardBody>
      <CardFooter className="flex flex-col items-center py-4">
        <h4 className="text-gray-700 font-medium">Booking Fee</h4>
        <p className="text-indigo-600 text-2xl mt-2">&#x20B9; {doctor.fee}</p>
        <h4 className="text-gray-700 font-medium mt-4">Booking Time</h4>
        <p className="text-indigo-600 text-2xl mt-2">{start_time} - {end_time}</p>
        <div className="w-full flex items-center justify-center mt-6">
          <PaymentPage doctor={doctor} bookedSlot={bookedSlot} />
        </div>
      </CardFooter>
    </Card>
  );
}

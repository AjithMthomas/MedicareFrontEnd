import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import avatar from "../../images/doctorAvatar.jpg";
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth';
import { BASE_URL } from '../../Utils/config';
import { Button } from "@material-tailwind/react";
import PrescriptionForm from './Prescription';
import { FaVideo } from 'react-icons/fa'
import { toast,Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext/SocketProvider';



function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [selectedAppointment,setSelected] = useState({})
  const [showPrescription,setPrescription] = useState(false)

  const socket = useSocket()
  console.log(socket,'sodsdfsdf')

  const Email = 'doctor@gmail.com'
  const navigate = useNavigate()

  const handleSubmitForm = useCallback(() => {
    console.log('hj')
    // e.preventDefault()
    socket.emit("room:join", { Email, doctor })

  }, [Email, doctor, socket])

 

  const handleJoinRoom = useCallback((data) => {
    const { Email, doctor } = data
    navigate(`/room/${doctor}`)
  }, [navigate])

 


  useEffect(() => {
    const localResponse = getLocal('authToken');
    const response = jwtDecode(localResponse);
    
    setDoctor(response?.user_id);
  }, []);



  async function getAppointments() {
    try {
      const response = await axios.get(`razorpay/appointmentsDoctor/${doctor}`);
      console.log(response.data, 'appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('could not fetch data', error);
    }
  }

  useEffect(() => {
    if (doctor) {
      getAppointments();
    }
  }, [doctor]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom)
    return () => {
      socket.off("room:join", handleJoinRoom)
    }
   },[socket])


  async function updateAppointmentStatus(appointmentId, newStatus) {
    try {
      await axios.put(`razorpay/updateAppointmentStatus/${appointmentId}/`, { status: newStatus });
      getAppointments();
    } catch (error) {
      console.error('could not update appointment status', error);
    }
  }

  function handleClick(id){
    setPrescription(true)
    const selectedAppointment = appointments?.find(appointment => appointment.id === id)
    console.log(selectedAppointment,'selected')
    setSelected(selectedAppointment)
  }

  return (
    <div className='flex h-full bg-acontent mt-3'>
        <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
    {showPrescription &&
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <PrescriptionForm   appointment={selectedAppointment} setPrescription={setPrescription}  />
      </div>}
      <div className='px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className='w-full h-screen px-3 font-poppins'>
          <div className="w-full p-5 flex justify-between">
            <h1 className='font-serif  text-3xl text-start  ms-4'>Appointments</h1>
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
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Patient Name</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Appoinment date</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Time</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Fees</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900">Status</th>
                  <th scope="col" class="px-6 py-4 font-large text-gray-900 text-center">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {appointments?.map((appointment, index) => (
                  <tr class="hover:bg-gray-50" key={index}>
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div class="relative h-10 w-10">
                        {appointment.doctor.user.image ? (
                          <img class="h-full w-full rounded-full object-cover object-center" src={BASE_URL + appointment?.patient?.image} alt="avatar" />
                        ) : (
                          <img class="h-full w-full rounded-full object-cover object-center" src={avatar} alt="avatar" />
                        )}
                      </div>
                      <div class="text-sm">
                        <div class="font-medium text-gray-700">{appointment?.patient?.username}</div>
                      </div>
                    </th>
                    <td class="px-6 py-4">
                      <p>{new Date(appointment.order_date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>
                        {new Date(`01/01/2000 ${appointment.slot.start_time}`).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                        -
                        {new Date(`01/01/2000 ${appointment.slot.end_time}`).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </td>
                    <td class="px-6 py-4">
                      <p><div>{appointment?.doctor?.fee}Rs</div></p>
                    </td>
                    <td class="px-6 py-4">
                      <p><div className={appointment.status === 'pending' || appointment.status === 'rejected'? 'text-red-500' : 'text-green-500'}>{appointment?.status}</div></p>
                    </td>
                    <td class="px-6 py-4 text-center">
                      {appointment?.status === 'pending' ? (
                        <>
                          <Button
                            color="green"
                            className="me-3"
                            onClick={() => updateAppointmentStatus(appointment.id, 'approved')}
                          >
                            Accept
                          </Button>
                          <Button
                            color="green"
                            className="bg-red-500"
                            onClick={() => updateAppointmentStatus(appointment.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (<>
                        {appointment.status === 'approved' ?
                        <div className='flex'>
                        <Button color="blue" onClick={()=>handleClick(appointment.id)}>Prescription</Button>
                        <FaVideo className="mx-auto w-6 h-6 mt-2" onClick={()=>handleSubmitForm()}/>
                        </div>
                        :
                        <p className="text-red-500 font-bold text-sm mt-4">Rejected appointment</p>
                      }</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;

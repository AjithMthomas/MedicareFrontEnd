import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from "../../images/doctorAvatar.jpg";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);

  async function getAppointments() {
    try {
      const response = await axios.get('razorpay/appointments/');
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error('Could not fetch data', error);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (appointment) =>
          appointment.doctor.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.patient.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchQuery, appointments]);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginateNext = () => {
    if (currentPage < Math.ceil(filteredAppointments.length / appointmentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-full bg-acontent mt-3">
      <div className="px-5 w-full h-auto min-h-screen mx-5 mt-2  py-8 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl">
        <div className="w-full h-screen px-3 font-poppins">
          <div className="w-full p-5 flex justify-between">
            <h1 className="font-serif  text-3xl text-start  ms-4">Appointments</h1>
            <input
              type="text"
              placeholder="&#x1F50D; Search email or name"
              className="border border-primaryBlue border-solid focus:outline-none px-2 w-1/5 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Doctor Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Appointment date
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Fees
                  </th>
                  <th scope="col" className="px-6 py-4 font-large text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((appointment, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          {appointment.doctor.user.image ? (
                            <img
                              className="h-full w-fullrounded-full object-cover object-center"
                              src={appointment.doctor.user.image}
                              alt="avatar"
                            />
                          ) : (
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={avatar}
                              alt="avatar"
                            />
                          )}
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {appointment?.doctor?.user?.username}
                          </div>
                          <div className="text-gray-400">
                            {appointment?.doctor?.specialization?.name}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <p>{appointment?.patient?.username}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{new Date(appointment.order_date).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{<div>{appointment?.doctor?.fee}Rs</div>}</p>
                      </td>
                      <td className="px-6 py-4">
                        {appointment.status === 'rejected' || appointment.status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            {appointment.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            {appointment.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-red-500 font-bold">
                      No related appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {currentPage > 1 && (
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 mx-2"
                onClick={paginatePrev}
              >
                Previous Page
              </button>
            )}
            {currentPage < Math.ceil(filteredAppointments.length / appointmentsPerPage) && (
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 mx-2"
                onClick={paginateNext}
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;

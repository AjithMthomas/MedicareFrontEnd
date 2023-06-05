import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the appointments data from the API endpoint
    const getAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments/');
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-left">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Patient</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Consulting Fee</th>
              <th className="py-3 px-4 border-b">Start Time</th>
              <th className="py-3 px-4 border-b">End Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b">{appointment.date}</td>
                <td className="py-4 px-6 border-b">{appointment.patient.username}</td>
                <td className="py-4 px-6 border-b">{appointment.status}</td>
                <td className="py-4 px-6 border-b">{appointment.conulting_fee}</td>
                <td className="py-4 px-6 border-b">{appointment.slot.start_time}</td>
                <td className="py-4 px-6 border-b">{appointment.slot.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;

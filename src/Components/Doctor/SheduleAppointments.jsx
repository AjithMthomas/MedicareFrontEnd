import React, { useState } from 'react';
import axios from 'axios';

function ScheduleAppointment() {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [status, setStatus] = useState('pending');
  const [consultingFee, setConsultingFee] = useState(0);
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/schedule/', {
        patient: patient,
        doctor: doctor,
        status: status,
        consulting_fee: consultingFee,
        date: date,
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Schedule Appointment</h1>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label className="block mb-2 font-bold">Patient:</label>
          <input
            type="text"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Doctor:</label>
          <input
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Consulting Fee:</label>
          <input
            type="number"
            value={consultingFee}
            onChange={(e) => setConsultingFee(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ScheduleAppointment;

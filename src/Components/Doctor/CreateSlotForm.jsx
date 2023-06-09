import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth'
import { toast,Toaster } from 'react-hot-toast';

const CreateSlotForm = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState(true);
  const [slotDuration, setSlotDuration] = useState('');
 
useEffect(()=>{
  const localResponse = getLocal('authToken');
  const response = jwtDecode(localResponse)
  setDoctor(response.user_id)
})

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const slotData = {
      doctor,
      date,
      start_time: startTime,
      end_time: endTime,
      status,
      slot_duration: slotDuration,
    };

    try {
      const response = await axios.post('/doctor/shedule/', slotData);
      console.log(response.data);
      toast.success('slot created succesfully')
      
    } catch (error) {
      console.error(error);
      toast.error('couldnt create slot')
    
    }
  };

  return (
    <div className='w-2/4 '>
      <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
    <div className="w-3/4 mt-16 mx-auto p-6  bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium mb-1">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-gray-300 border-2 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startTime" className="block font-medium mb-1">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border-gray-300 border-2 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block font-medium mb-1">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border-gray-300 border-2 rounded-md py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-medium mb-1">Status:</label>
          <input
            type="checkbox"
            id="status"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700">Active</span>
        </div>
        <div className="mb-4">
          <label htmlFor="slotDuration" className="block font-medium mb-1">Slot Duration in min:</label>
          <input
            type="number"
            id="slotDuration"
            value={slotDuration}
            onChange={(e) => setSlotDuration(e.target.value)}
            className="w-full border-gray-300 border-2 rounded-md py-2 px-3"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
          Create
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateSlotForm;

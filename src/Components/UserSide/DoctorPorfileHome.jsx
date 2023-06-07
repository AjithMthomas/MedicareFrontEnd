import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/config";

export default function DoctorProfileHome() {
  const [doctor, setDoctor] = useState({});
  const { id } = useParams();

  async function getDoctor() {
    try {
      const response = await axios.get(`/doctor/getDoctorInHome/${id}`);
      setDoctor(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Doctor's Profile</h2>
        <div className="flex items-center mb-4">
          <img
            src={doctor?.user && `${BASE_URL}/${doctor?.user?.image}`}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">
              {doctor.user && doctor.user.username}
            </h3>
            <p className="text-gray-600">
              {doctor.specialization && doctor.specialization.name}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-2">
            Phone Number: {doctor.user && doctor.user.phone_number}
          </p>
          <p className="mb-2">
            Email: {doctor.user && doctor.user.email}
          </p>
          <p className="mb-2">Fees: {doctor.fee}</p>
          <p className="mb-2">Experience: {doctor.experience}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600">
            {/* {showSlots ? "Hide Slots" : "Show Slots"} */}
          </button>
          {/* {showSlots && ( */}
          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Available Slots:</h4>
            {/* {slots.map((slot) => (
              <p key={slot.id}>{slot.time}</p>
            ))} */}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

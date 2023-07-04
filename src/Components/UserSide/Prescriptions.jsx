import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth';
import { BASE_URL } from '../../Utils/config';
import { Button } from "@material-tailwind/react";

function formatPrescriptionDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescription,setShowPrescription] = useState(false)

  useEffect(() => {
    const localResponse = getLocal('authToken');
    const decoded = jwtDecode(localResponse);
    const id = decoded.user_id;

    const handleDownload = async()=>{
      try {
        const response = await axios.get(`/razorpay/usersPrescription/${id}`,{
            responseType: 'blob'});
        setPrescriptions(response.data);
        const fileName = `Prescription_${prescriptions.id}.pdf`;
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, fileName);

        
      } catch (e) {
        console.log(e);
      }
    }

    handleDownload();
  }, []);

  return (
    <div className="antialiased px-4 mt-5 mx-20 mb-14">
      <div className="flex flex-col justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Prescriptions</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left"></div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Doctor Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Phone</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Prescription Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Country</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {prescriptions?.map((prescription) => (
                    <tr key={prescription.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center ms-5">
                          <div>
                            <img
                              className="rounded-full b border-2 border-blue-300 w-28 h-28"
                              src={BASE_URL + prescription?.doctor?.user?.image}
                              width={50}
                              height={50}
                              alt="Alex Shatov"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">Dr. {prescription?.doctor?.user?.username}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{prescription?.doctor?.user?.phone_number}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {formatPrescriptionDate(prescription?.date)}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center"><Button variant="outlined" onClick={()=>setShowPrescription(true)}>Prescription</Button></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showPrescription &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-2/5 bg-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
                <div className="mb-4">
                    <label className="text-lg font-medium">Doctor Name:</label>
                    <p></p>
                </div>
                <div className="mb-4">
                    <label className="text-lg font-medium">Patient Name:</label>
                    <p></p>
                </div>
                <div className="mb-4">
                    <label className="text-lg font-medium">Medication:</label>
                    <p></p>
                </div>
                <div className="mb-4">
                    <label className="text-lg font-medium">Dosage:</label>
                    <p></p>
                </div>
                <div className="mb-4">
                    <label className="text-lg font-medium">Instructions:</label>
                    <p></p>
                </div>
                <button
                    
                    className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-primary-dark font-sans"
                >
                    Download Prescription
                </button>
                </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;

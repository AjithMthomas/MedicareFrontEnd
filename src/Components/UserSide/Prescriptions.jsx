import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../Contexts/auth';
import { BASE_URL } from '../../Utils/config';
import { Button } from "@material-tailwind/react";
import PrescriptionDetails from './PrescriptionDetails';


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

    async function getPrescriptions() {
      try {
        const response = await axios.get(`/razorpay/usersPrescription/${id}`);
        setPrescriptions(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    getPrescriptions();
  }, []);

  return (
    <div className="antialiased mb-16 px-4 mt-5 mx-5">
      
      <div className="flex flex-col justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Prescription</h2>
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
                        <div className="flex items-center">
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
                        {showPrescription &&
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <PrescriptionDetails prescription={prescription} setShowPrescription={setShowPrescription}/>
                    </div>}
                      </td>
                     
                    </tr>
                    
                  ))}
                </tbody>
              </table>
              {prescriptions?.length == 0 &&
                  <div className="flex justify-center w-full my-20 ">
                  <h1 className='text-lg font-serif text-red-500'>No Prescriptions yet</h1>
                  </div>
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;

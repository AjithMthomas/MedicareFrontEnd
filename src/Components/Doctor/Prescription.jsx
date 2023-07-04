import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios  from 'axios';
import { toast,Toaster } from 'react-hot-toast'


const PrescriptionForm = ({setPrescription,appointment}) => {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [doc,setDoctor] = useState('')
  const [patient,setPatient] = useState('')

  

   useEffect(()=>{
    setDoctor(appointment?.doctor?.id)
    console.log(appointment,'appoint')
    setPatient(appointment?.patient?.id)
    
   },[])

  async function handleSubmit (e){
    e.preventDefault();
     const response = await axios.post('/razorpay/createPresciption/',{
        doctor:doc,
        patient:patient,
        medication:medication,
        dosage:dosage,
        instructions:instructions,

     })
     if (response.status === 201) {
      toast.success('Prescription added succesfully');
    } else {
  
      toast.error('Error creating prescription');
    }
    
    setMedication(''); 
    setDosage('');
    setInstructions('');
  };


  return (
    <div className="w-2/5 bg-gray-200 p-8 rounded-lg z-60 relative">
        <Toaster position='top-center' reverseOrder='false' limit={1} ></Toaster>
      <AiOutlineCloseCircle onClick={()=>setPrescription(false)} className='text-black w-5 h-5 ml-auto'/>
      <h2 className="text-2xl font-bold mb-4">Write Prescription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientName" className="text-lg font-medium">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            defaultValue={appointment?.patient?.username}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="medication" className="text-lg font-medium">
            Medication
          </label>
          <input
            type="text"
            id="medication"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dosage" className="text-lg font-medium">
            Dosage
          </label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="text-lg font-medium">
            Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-primary focus:border-primary"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-primary-dark font-sans"
        >
          Submit Prescription
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;

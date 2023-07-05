import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

function PrescriptionDetails({ prescription, setShowPrescription }) {
  const handleDownload = () => {
    const filename = 'prescription.pdf';

    // Create a PDF document
    const PrescriptionDocument = () => (
      <Document>
        <Page>
          <Text>Doctor Name: {prescription?.doctor?.user?.username}</Text>
          <Text>Patient Name: {prescription?.patient?.username}</Text>
          <Text>Medication: {prescription?.medication}</Text>
          <Text>Dosage: {prescription?.dosage}</Text>
          <Text>Instructions: {prescription?.instructions}</Text>
        </Page>
      </Document>
    );

    // Generate a blob from the PDF document
    const blob = new Blob([<PrescriptionDocument />], { type: 'application/pdf' });

    // Save the blob as a file
    saveAs(blob, filename);
  };

  return (
    <div className="w-2/5 bg-gray-200 p-8 rounded-lg">
      <AiOutlineCloseCircle onClick={() => setShowPrescription(false)} className="text-black w-5 h-5 ml-auto" />
      <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
      <div className="mb-4">
        <label className="text-lg font-medium">Doctor Name:</label>
        <p>{prescription?.doctor?.user?.username}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Patient Name:</label>
        <p>{prescription?.patient?.username}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Medication:</label>
        <p>{prescription?.medication}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Dosage:</label>
        <p>{prescription?.dosage}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium h-full">Instructions:</label>
        <h6>{prescription?.instructions}</h6>
      </div>
      <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-primary-dark font-sans" onClick={handleDownload}>
        Download Prescription
      </button>
    </div>
  );
}

export default PrescriptionDetails;

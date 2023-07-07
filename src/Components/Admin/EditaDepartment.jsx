import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditDepartment = ({ departmentId ,setShow}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/department/${departmentId}/`)
      .then(response => {
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      })
      .catch(error => {
        console.error(error);
      });
  }, [departmentId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

   
    axios.patch(`/docter/EditDepartment/${departmentId}`, formData)
      .then(response => {
        toast.success('Department updated successfully:');
        
      })
      .catch(error => {
        toast.error('Error updating department');
       
      });
  };

  return (
    <div className="container mx-auto p-4 w-2/4 bg-gray-50">
         <Toaster position="top-center" reverseOrder={false} limit={1} />
         <AiOutlineCloseCircle onClick={() => setShow(false)} className="text-black w-5 h-5 ml-auto" />
      <h1 className="text-2xl font-bold mb-4">Edit Department</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border rounded p-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(event) => setImage(event.target.files[0])}
            className="border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/config";
import doctorImg from "../../images/doctorAvatar.jpg";

export default function DoctorProfileHome() {
  const [doctor, setDoctor] = useState({});
  const [slots, setSlots] = useState([]);
  const [showSlots, setShowSlots] = useState(false);
  const [blogs, setBlogs] = useState([]);

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

  async function getSlots() {
    try {
      const doc = doctor.user.id;
      const response = await axios.get(`/doctor/getSlotsInHome/${doc}`);
      console.log(response.data, "dytrfytgfg");
      setSlots(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function getblogs() {
    try {
      const response = await axios.get(`/doctor/GetBlogsInHome/${id}`);
      console.log(response.data);
      setBlogs(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDoctor();
    getblogs()
  }, []);

  const toggleSlots = () => {
    getSlots();
    setShowSlots(!showSlots);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 ">
      <h2 className="text-2xl font-bold mb-4">Doctor's Profile</h2>
      <div className="flex items-center mb-4">
        {doctor?.user?.image ? (
          <img
            src={BASE_URL + doctor?.user.image}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full mr-4"
          />
        ) : (
          <img
            src={doctorImg}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full mr-4"
          />
        )}
       
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
        <p className="mb-2">Email: {doctor.user && doctor.user.email}</p>
        <p className="mb-2">Fees: Rs {doctor.fee}</p>
        <p className="mb-2">Experience: {doctor.experience}Years</p>

        <div className="mt-4">
          {/* <h4 className="text-lg font-bold mb-2">Available Slots:</h4> */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={toggleSlots}
          >
            {showSlots ? "Hide Slots" : "Show Slots"}
          </button>
          {showSlots && (
            <div className="mt-4 h-full w-full text-black">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  className="text-white py-2 px-6 me-2 rounded-md mb-2 bg-blue-500"
                >
                  {slot.start_time} - {slot.end_time}
                </button>
              ))}
            </div>
          )}
          <button className="bg-yellow-500 text-black py-2 px-4 rounded-md ms-3"><Link to='/chat'><span> Chat with Doctor</span></Link></button>
        </div> 
        
      </div>
     
      <div className="mt-8 mb-48" >
        <h4 className=" font-bold mb-4 text-start  text-3xl ">Blogs:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example Blog Card */}
          {blogs?.map((blog)=>(
          <div className="bg-white rounded-md shadow-md p-4" key={blog.id}>
            <img
              src={BASE_URL+blog?.image}
              alt="Blog Thumbnail"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h5 className="text-xl font-bold mb-2">{blog.name}</h5>
            <p className="text-gray-600 mb-2">
              {blog.description}
            </p>
            <a
              href="/blog/1"
              className="text-blue-500 hover:underline inline-block"
            >
              Read More
            </a>
          </div>
           ))}
        </div>
      </div>
    
    </div>
  );
}

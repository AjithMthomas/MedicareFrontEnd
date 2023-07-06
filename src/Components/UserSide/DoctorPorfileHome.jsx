import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/config";
import doctorImg from "../../images/doctorAvatar.jpg";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import PaymentDetails from "../Payment/PaymentDetails";
import Background from "../../images/breadcumb.jpg"
import Bg from "../../images/4880206.jpg"

export default function DoctorProfileHome() {
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [showPayment,setShowPayment] = useState(false)
  const [bookedSlot,setBookedSlot] = useState([])

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
      const doc = doctor.user?.id;
      const response = await axios.get(`/doctor/getSlotsInHome/${doc}`);
      console.log(response.data, "sssssss");
      setSlots(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  // async function getBlogs() {
  //   try {
  //     const response = await axios.get(`/doctor/getDoctorsBlog/${id}`);
  //     console.log(response.data);
  //     setBlogs(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function getBlogs() {
    try {
      const response = await axios.get("/doctor/blogsList/");
      console.log(response.data);     
      const shuffledBlogs = response.data.sort(() => 0.5 - Math.random());
        const randomBlogs = shuffledBlogs.slice(0, 3);
        setBlogs(randomBlogs);
    } catch (e) {
      console.log(e);
    }
  }




  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };



  const handleChange = async (e) => {
   
    setDate( e.target.value)
    const  slots = await getSlots()
    const selected = slots?.filter((slot) => slot.date ===  e.target.value);
    setSelectedSlots(selected);
  };
  

  const toggleDate = () => {
    setShowDate(true);
  };
  


 const handleClick = (id) => {
  console.log()
  const buttonElement = document.getElementById(id);
  if (buttonElement) {
    buttonElement.classList.toggle('bg-blue-500');
    buttonElement.classList.toggle('bg-green-500');
  }
  console.log(selectedSlots,'selected')
  const bookedslot = selectedSlots?.filter((selected) => selected.id === id)
  console.log(bookedslot,'booked slot')
  
  setBookedSlot(bookedslot)
};

  
  
  useEffect(() => {
    getDoctor();
    getBlogs();
  }, []);


  return (
    <div className="bg-white rounded-lg shadow-md p-8 "style={{ backgroundImage: `url(${Bg})`}}>
     <div  className="h-20 flex justify-center items-center">
        <h2 className="text-3xl font-bold text-black">Doctor's Profile</h2>
      </div>
      <div className="w-full flex  place-content-center justify-items-center bg-gray-150 " >
      <div className="flex flex-col place-content-center justify-items-center mb-4 mt-5">
        {doctor?.user?.image ? (
          <div className="w-full flex place-content-center justify-items-center">
          <img
            src={BASE_URL + doctor?.user.image}
            alt="Profile Picture"
            className="w-80 h-72 rounded-full mr-4  "
          />
          </div>
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

      <div className="ms-20 mt-14">
        <p className="mb-2">
          Phone Number: {doctor.user && doctor.user.phone_number}
        </p>
        <p className="mb-2">Email: {doctor.user && doctor.user.email}</p>
        <p className="mb-2">Fees: Rs {doctor.fee}</p>
        <p className="mb-2">Experience: {doctor.experience}Years</p>
        {/* <button className="bg-yellow-500 text-black py-2 px-4 rounded-md ">
          <Link to="/videoCall">
            <span> Chat with Doctor</span>
          </Link>
        </button> */}
        {!showDate ? (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md ms-1 mt-2"
            onClick={toggleDate}
          >
            Book Appointment
          </button>
        ) : (
          <div className="mb-4">
            <h5 className="mt-1">Select a Date</h5>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleChange}
              className="mt-3 border-gray-300 border-2 rounded-md py-2 px-3"
            />
          </div>
        )}
          {showDate && selectedSlots.length === 0 && (
        <p className="font-serif text-xl text-blue-500">Select a Valid slot to book</p>
      )}
      </div>
   
     

      </div>
   

      {showDate && selectedSlots?.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6  ">
            <div className="flex place-content-end ">
            <AiOutlineCloseCircle className="text-end text-gray-500" onClick={()=>{setShowDate(false);setSelectedSlots([]);setDate('')}}/>
            </div>
           
            <h5 className="mt-1 font-serif text-xl">Available Slots:</h5>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedSlots.map((slot) => (
                <button
                  key={slot.id}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-2xl" id={slot.id}
                  onClick={()=>handleClick(slot.id)}
                >
                  {slot.start_time}-{slot.end_time}
                </button>
              ))}
            </div>
            <div className="w-full flex place-content-center">
            <button className="bg-yellow-500 text-black py-2 px-4 rounded-md border-black mt-4 " onClick={()=>setShowPayment(true)}>Book</button>
            </div>
          </div>
          
        </div>
      )}
    
      {showPayment&&
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <PaymentDetails doctor={doctor} bookedSlot={bookedSlot} setShowPayment={setShowPayment}/>
      </div>
   
      }
      <div className="mt-8 mb-48">
        <h4 className="font-bold mb-4 text-start text-3xl">Blogs:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.map((blog) => (
            <div className="bg-white rounded-md shadow-md p-4" key={blog.id}>
              <img
                src={ blog?.image}
                alt="Blog Thumbnail"
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h5 className="text-xl font-bold mb-2">{blog.name}</h5>
              <p className="text-gray-600 mb-2">{truncateText(blog?.description, 300)}</p>
              <Link to={`/singleBlogs/${blog.id}`}><a
                href="/blog/1"
                className="text-blue-500 hover:underline inline-block"
              >
                Read More
              </a></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

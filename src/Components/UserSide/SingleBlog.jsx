import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/config";
import PageLoader from "./PageLoader";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,Rating
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [doctorsBlog,setDocotsBlogs] = useState ([])
  const [doc_id,setDoctor_id]  = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBlog();
    getDoctorsBlogs()

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  async function getBlog() {
    try {
      const response = await axios.get(`/doctor/singleBlog/${id}`);
      setBlog(response.data);
      
    } catch (e) {
      console.log(e);
    }
  }

  async function getDoctorsBlogs() {
    
    try {
      const response = await axios.get(`/doctor/getDoctorsBlog/${doc_id}`);
      console.log(response.data);
      setDocotsBlogs(response.data);
    } catch (e) {
      console.log(e);
    }
  }
 


  

  return (
    <div className="div">
       {isLoading ? (
        <PageLoader />
      ) : (
    <div className="flex justify-center items-center mt-2 ">
      <Card className="w-10/12">
        <CardHeader shadow={false} floated={false}>
          <img
            src={BASE_URL + blog?.image}
            alt="image"
            className="w-full h-96 object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="blue" className="uppercase mb-4">
            <div className="flex justify-between">
            <div className="flex flex-row items-center">
              <Avatar
                src={BASE_URL + blog?.doctor?.user?.image}
                alt="avatar"
                className="rounded-full border border-blue-500 h-24 w-24"
              />
              <div className="ml-3">
                <p className="text-xl text-black font-sans">Dr. {blog?.doctor?.user?.username}</p>
                <Rating value={4} readonly className="text-yellow-400 font-serif mt-2" />
              </div>
            </div>

              <p className="text-black mt-2">
                {blog?.doctor?.specialization?.name}
              </p>
            </div>
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {blog?.name}
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            {blog?.description}
          </Typography>
        </CardBody>
      </Card>
    </div>
      )}
        <div className="mt-8 mb-48 mx-28">
        <Button fullWidth  onClick={()=>getDoctorsBlogs(setDoctor_id(blog.doctor.id))}>THIS DOCTORS BLOGS</Button>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctorsBlog?.map((blog) => (
           
            <div className="bg-white rounded-md shadow-md p-4" key={blog.id}>
              <img
                src={BASE_URL + blog?.image}
                alt="Blog Thumbnail"
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h5 className="text-xl font-bold mb-2">{blog?.name}</h5>
              <p className="text-gray-600 mb-2">{blog?.description}</p>
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

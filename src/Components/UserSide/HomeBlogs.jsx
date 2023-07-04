import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
 
export default function HomeBLogs() {

  const [blogs,setBlogs] = useState([])


  async function getBlogs() {
    try {
      const response = await axios.get("/doctor/blogsList/");
      console.log(response.data);     
      const shuffledBlogs = response.data.sort(() => 0.5 - Math.random());
        const randomBlogs = shuffledBlogs.slice(0, 4);
        setBlogs(randomBlogs);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
   getBlogs()
  },[])
  
  return (
    <div className="mt-4 mx-5" >
    <h1 className="text-start ml-8 mt-4 text-4xl text-bold font-serif">Blogs</h1>
    <div className="flex flex-wrap justify-center mt-4">
      {blogs?.map((blog) => (
       <div key={blog.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4">
          <Card
            shadow={false}
            className="relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center rounded-lg my-3"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
              style={{ backgroundImage: `url(${blog?.image})` }}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <Link to={`singleBlogs/${blog.id}`}><CardBody className="relative py-14 px-6 md:px-12">
              <Typography variant="h2" color="white" className="mb-6 font-medium leading-[1.5]">
                {blog?.name}
              </Typography>
              <Typography variant="h5" className="mb-4 text-white">
                Dr. {blog?.doctor?.user.username}
              </Typography>
              <Avatar
                src={blog?.doctor?.user?.image}
                alt="avatar"
                className="rounded-full border border-blue-500 h-20 w-20 mx-auto mb-4"
              />
            </CardBody></Link>
          </Card>
        </div>
      ))}
    </div>
  </div>
  
  );
}
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
  Avatar
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLoader from "./PageLoader";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBlogs() {
    try {
      const response = await axios.get("/doctor/blogsList/");
      console.log(response.data);
      setBlogs(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getBlogs();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, []);

  const truncateText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="div">
       {isLoading ? (
        <PageLoader />
      ) : (
    <div className="flex flex-wrap justify-center mx-12">
      {blogs?.map((blog) => (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={blog.id}>
          <Card className="w-full h-full flex flex-col">
            <CardHeader shadow={false} floated={false}>
              <img
                src={blog?.image}
                alt="image"
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardBody className="flex flex-col justify-between">
              <div>
                <Typography variant="h6" color="blue" className=" mb-4">
                  <div className="flex justify-between">
                    <span className="flex flex-row">
                      <Avatar src={blog?.doctor?.user?.image} alt="avatar" className="rounded-full border-black" />
                      <p className="text-xl mt-1 ms-3 text-black font-sans ">
                        {blog?.doctor?.user?.username}
                      </p>
                    </span>
                    <p className="text-black mt-2">{blog?.doctor?.specialization?.name}</p>
                  </div>
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2 font-serif">
                  {blog?.name}
                </Typography>
                <Typography color="gray" className="font-normal mb-8 font-serif">
                  {truncateText(blog?.description, 300)}
                </Typography>
              </div>
              <Link to={`/singleBlogs/${blog.id}`}><a href="#" className="inline-block">
                <div className="flex justify-between">
                 <Button variant="text" className="flex items-center gap-2 font-serif">
                    Learn More
                    <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                  </Button>
                  <Rating value={4} readonly className="text-yellow-400 font-serif" />
                </div>
              </a></Link>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
      )}
      </div>
  );
}
 
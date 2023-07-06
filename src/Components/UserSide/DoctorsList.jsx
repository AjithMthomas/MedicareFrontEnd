import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PageLoader from "./PageLoader";
import { Link } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import Notfound from "../../images/Not found.gif";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    axios
      .get("/doctor/docorsInUserSide/")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        (doctor.user &&
          doctor.user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doctor.specialization &&
          doctor.specialization.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDoctors(filtered);
  }, [doctors, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination Logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-full mx-32">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Search Doctors, Departments, Or any related ..."
                  onChange={handleSearch}
                  value={searchQuery}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {currentDoctors.length === 0 ? (
            <div className="flex justify-center items-center w-full mt-8">
              <img src={Notfound} alt="No results" className="w-1/4 mb-44" />
            </div>
          ) : (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className="w-72 m-4">
                <Card>
                  <CardHeader>
                    <img
                      src={doctor.user && doctor.user.image}
                      className="w-full h-44 object-cover"
                      alt="Doctor Image"
                    />
                  </CardHeader>
                  <CardBody>
                    <div className="flex items-center justify-between mb-2">
                      <Typography color="blueGray" className="text-sm opacity-75">
                        {doctor.specialization && doctor.specialization.name}
                      </Typography>
                      <Typography color="blueGray" className="text-sm opacity-75">
                        Fee: {doctor.fee}
                        <span>.rs</span>
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium text-xl"
                    >
                      Dr. {doctor.user && doctor.user.username}
                    </Typography>
                    <div className="mt-4">
                      <Rating value={4} readonly className="text-yellow-400" />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Link to={`/doctorProfileInHome/${doctor.id}`}>
                      <Button
                        ripple="light"
                        block
                        color="blueGray"
                        className="hover:bg-blueGray-100 p-3"
                      >
                        Book Appointment
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))
          )}

          {filteredDoctors.length > doctorsPerPage && (
            <div className="flex justify-center mt-5">
              <Button
                color="blueGray"
                className="mx-2"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous Page
              </Button>
              <Button
                color="blueGray"
                className="mx-2"
                disabled={currentPage === Math.ceil(filteredDoctors.length / doctorsPerPage)}
                onClick={() => paginate(currentPage + 1)}
              >
                Next Page
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

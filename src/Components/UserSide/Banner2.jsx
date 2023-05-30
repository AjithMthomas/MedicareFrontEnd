import React from "react";
import { Link } from "react-router-dom";
import doctor from "../../images/Doctor.jpg"
import baground from "../../images/baground.jpg"


function BannerSecond() {
  
  return (
    <div className="bg-cover bg-center flex  h-full w-full" >
    <div className="flex flex-1 h-full place-content-center place-items-start "  >
      <div className="w-2/4 h-2/4 mt-3">
      <img src={doctor} alt="" className="  h-full" />
      </div>
    </div>
    <div className="flex flex-1"  style={{backgroundImage: `url(${baground})`}}>
    <div className="p-20 lg:p-44">
            <h1 className=" text-4xl font-serif font-bold text-start">
           MEDICARE FOR PRIVATE PRACTICES
            </h1>
            <h2 className="mt-4 font-serif  text-3xl"> Are you a Doctor interested in</h2>
            <h2 className="mt-1 font-serif text-start text-3xl">reaching new patients?</h2>
              <Link to="/doctors">
                <span className="cursor-pointer  flex justify-center items-center mt-10 font-semibold text-md w-48 bg-[#194569] p-2  text-white hover:text-black rounded">
                  Become a doctor
                </span>
              </Link>
          </div>
    </div>
   
  </div>
  );
}

export default BannerSecond;
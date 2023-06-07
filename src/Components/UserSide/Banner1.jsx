import { Link } from "react-router-dom";
import home from "../../images/home.jpg"
import nurse from "../../images/nurse.jpg"


function BannerFirst() {
  
  return (
  <div className="bg-cover bg-center h-4/4vh flex" style={{backgroundImage: `url(${home})`}}>
    <div className="flex flex-1" >
    <div className="p-20 lg:p-44">
            <h1 className=" text-4xl font-serif font-bold text-start">
              LET'S FIND YOUR DOCTOR
            </h1>
          
              <Link to="/doctorsListhome/">
                <span className="cursor-pointer  flex justify-center items-center mt-10 font-semibold text-md w-48 bg-[#194569] p-2  text-white hover:text-black rounded">
                  Appointment 
                </span>
              </Link>
          </div>
    </div>
    <div className="flex flex-1">

    </div>
  </div>
  );
}

export default BannerFirst;

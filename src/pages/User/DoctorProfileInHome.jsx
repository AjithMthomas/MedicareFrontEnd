import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import DoctorProfileHome from "../../Components/UserSide/DoctorPorfileHome"

const DoctorProfikeInHome = () => {
    
  return (
    <div>
      <NavbarComponent/>
      <DoctorProfileHome/>
      <Footer/>
    </div>
    
  );
};

export default DoctorProfikeInHome;

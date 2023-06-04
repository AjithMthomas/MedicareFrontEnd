import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import DoctorList from "../../Components/UserSide/DoctorsList";

const DoctorLists = () => {
    
  return (
    <div>
      <NavbarComponent/>
      <DoctorList/>
      <Footer/>
    </div>
    
  );
};

export default DoctorLists;

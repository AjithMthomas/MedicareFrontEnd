import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import DoctorApprovalForm  from "../../Components/UserSide/DoctorApprovalForm";


const DoctorApproval = () => {
    
  return (
    <div>
      <NavbarComponent/>
      <DoctorApprovalForm/>
      <Footer/>
    </div>
    
  );
};

export default DoctorApproval;
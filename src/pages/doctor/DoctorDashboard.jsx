import React from "react";
import Sidebar from "../../Components/Doctor/Sidebar";
import { Outlet } from "react-router-dom";

const DoctorDashboard = () => {
    
  return (
    <div className="flex">
    <div className="w-3/12">
       <Sidebar/>
    </div>
     <div className="w-9/12">
       <Outlet/>
     </div>
</div>
    
  );
};

export default DoctorDashboard;

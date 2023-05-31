import React from "react";
import Sidebar from "../../Components/Doctor/Sidebar";
import Dashboard from "../../Components/Doctor/Dashbord";

const DoctorDashboard = () => {
    
  return (
    <div className="flex">
      <div className="w-2/6">
      <Sidebar/>
      </div>
      <div className="w-4/6">
      <Dashboard/>
      </div>
    </div>
    
  );
};

export default DoctorDashboard;

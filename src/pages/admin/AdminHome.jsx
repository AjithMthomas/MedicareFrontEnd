import React from "react";
import AdminSidebar from "../../Components/Admin/Asidebar";
import { Outlet } from "react-router-dom";

export default function AdminHome(){
    return(
        <div className="flex">
            <div className="w-3/12">
               <AdminSidebar/>
            </div>
             <div className="w-9/12">
               <Outlet/>
             </div>
        </div>
    )
}
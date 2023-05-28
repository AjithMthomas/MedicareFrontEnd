import React from "react";
import Navbars from "../Components/UserSide/Navbar";
import Footer from "../Components/UserSide/Footer";

const HomePage = () => {
  return (
    <div className="w-full">
      
      <div className=" w-full h-screen bg-center bg-cover bg-[url('images/home.jpg')]">
      <Navbars/>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

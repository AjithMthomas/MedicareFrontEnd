import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import UserProfile from "../../Components/UserSide/UserProfile";


const HomePage = () => {
    
  return (
    <div>
      <NavbarComponent/>
      <UserProfile/>
      <Footer/>
    </div>
    
  );
};

export default HomePage;

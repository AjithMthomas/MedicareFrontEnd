import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import BannerFirst from "../../Components/UserSide/Banner1";
import BannerSecond from "../../Components/UserSide/Banner2";
import BlogComponent from "../../Components/UserSide/Blogs";

const HomePage = () => {
    
  return (
    <div>
      <NavbarComponent/>
      <BannerFirst/>
      <BlogComponent/>
      <BannerSecond/>
      <Footer/>
    </div>
    
  );
};

export default HomePage;

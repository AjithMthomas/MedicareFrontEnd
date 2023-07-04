import React from "react";
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import BannerFirst from "../../Components/UserSide/Banner1";
import BannerSecond from "../../Components/UserSide/Banner2";
import BlogComponent from "../../Components/UserSide/HomeBlogs";
import PageLoader from "../../Components/UserSide/PageLoader";
import { useEffect,useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
    
  return (
    <div className="div">
    {isLoading ? (
     <PageLoader />
   ) : (
    <div>
      <NavbarComponent/>
      <BannerFirst/>
      <BlogComponent/>
      <BannerSecond/>
      <Footer/>
    </div>
   )}
    </div>
    
  );
};

export default HomePage;

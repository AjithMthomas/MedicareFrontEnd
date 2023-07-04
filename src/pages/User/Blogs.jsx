import React from 'react'
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import Blog from '../../Components/UserSide/Blog';

function Blogs() {
  return (
     <div>
    <NavbarComponent/>
    <Blog/>
    <Footer/>
    </div>
  )
}

export default Blogs
import React from 'react'
import NavbarComponent from "../../Components/UserSide/Navbar";
import Footer from "../../Components/UserSide/Footer";
import SingleBlog from "../../Components/UserSide/SingleBlog"

function Blogs() {
  return (
     <div>
    <NavbarComponent/>
    <SingleBlog/>
    <Footer/>
    </div>
  )
}

export default Blogs
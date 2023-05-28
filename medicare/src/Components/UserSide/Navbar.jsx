/* eslint-disable flowtype/require-valid-file-annotation */
import React from "react";
import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/slice/userSlice";
import { setLogout as Logout } from "../../store/slice/doctorSlice";

function NavbarComponent() {
  const { name } = useSelector((state) => state.clientLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { client } = useSelector((state) => state.clientLogin);
  const { doctor } = useSelector((state) => state.doctorLogin);

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    dispatch(setLogout());
    navigate("/");
  };
  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleNavigateDoctor =()=>{
    navigate("/doctor/dashboard");

  } 
  const handleLogoutDoctor =()=>{
    localStorage.removeItem("doctorToken");
    dispatch(Logout());

    navigate("/");

  }
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand>
        <img src={logo} className="mr-3 ml-5 h-6 sm:h-9" alt="Flowbite Logo" />
      </Navbar.Brand>
      {!client && !doctor ? (
        <div className="flex md:order-2">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Navbar.Toggle />
        </div>
      ) : (
        ""
      )}
      {client && (
        <div className="flex md:order-2 mr-5">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img="" rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm uppercase">{name}</span>
              {/* <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span> */}
            </Dropdown.Header>
            <Dropdown.Item onClick={handleNavigate}>Dashboard</Dropdown.Item>
            {/* <Dropdown.Item>
              Settings
            </Dropdown.Item> */}

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}
      {doctor && (
        <div className="flex md:order-2 mr-5">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img="" rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm uppercase">{name}</span>
              {/* <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span> */}
            </Dropdown.Header>
            <Dropdown.Item onClick={handleNavigateDoctor}>Dashboard</Dropdown.Item>
            {/* <Dropdown.Item>
              Settings
            </Dropdown.Item> */}

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogoutDoctor}>logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )

      }
      {!doctor && (
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/doctors">Doctors</Navbar.Link>
          <Navbar.Link href="/departments">Departments</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default NavbarComponent;
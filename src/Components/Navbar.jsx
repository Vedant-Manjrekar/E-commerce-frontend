import React from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { SwipeableDrawer, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../assets/cart-favicon.png";

console.log(JSON.parse(localStorage.getItem("user")));

const logoutStyle = {
  display: JSON.parse(localStorage.getItem("user")) ? "flex" : "none",
};

function Navbar() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(null);
  const app_main = document.getElementById("root").firstChild;
  const navbar = document.getElementById("navbar");
  const root = document.getElementById("root");

  useEffect(() => {
    if (toggle == true) {
      app_main.style.filter = "brightness(.4)";
      root.style.overflow = "hidden";
      root.style.maxHeight = "100vh";
      navbar.style.filter = "brightness(.5)";
    } else if (toggle == false || app_main != null) {
      app_main.style.filter = "none";
      navbar.style.filter = "none";
      root.style.overflow = "scroll";
      root.style.maxHeight = "initial";
    }
  }, [toggle, app_main]);

  const drawerStyle = {
    right: toggle ? "0" : "-60%",
  };

  function scroll() {
    root.style.overflow = "scroll";
  }

  function logout() {
    const decision = confirm("Do you want to logout?");

    if (decision) {
      localStorage.removeItem("user");
      let event = new Event("storage");
      window.dispatchEvent(event);
      location.reload();

      navigate("/");
    } else {
      return;
    }
  }

  return (
    <>
      <div
        id="navbar"
        className="navbar w-stretch grid items-center grid-cols-3 bg-gradient-to-r from-pink-400 to-rose-900"
      >
        <Link to="/">
          <div className="logo px-7 text-white">
            <img src={logo} className="w-11 object-contain" alt="logo" />
          </div>
        </Link>
        <div className="logo row-auto p-2"></div>
        <div className="account p-2 right-5 ">
          <Button onClick={() => setToggle(true)} className="barbox">
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
          </Button>
        </div>
      </div>
      <div className="drawer" style={drawerStyle}>
        <p className="cut" onClick={() => setToggle(false)}>
          <ImCross />
        </p>
        <Link className="w-full flex items-center justify-center link" to="/">
          Home
        </Link>
        <Link
          className="w-full links flex items-center justify-center link"
          onClick={scroll}
          to="/cart"
          style={logoutStyle}
        >
          Cart
        </Link>
        <Link
          className="w-full links flex items-center justify-center link"
          to="/order"
          style={logoutStyle}
          onClick={scroll}
        >
          Orders
        </Link>
        <Link
          className="w-full links flex items-center justify-center link"
          to="/signup"
          onClick={scroll}
        >
          SignUp
        </Link>
        <Link
          className="w-full links flex items-center justify-center link"
          to="/loginPage"
          onClick={scroll}
        >
          Login
        </Link>
        <p
          onClick={logout}
          className="w-full links flex items-center justify-center link"
          style={logoutStyle}
        >
          Logout
        </p>
      </div>
    </>
  );
}

export default Navbar;

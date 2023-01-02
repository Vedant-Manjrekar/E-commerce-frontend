import React, { useContext } from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import Account from "./Account";
import {
  useAccountVisibility,
  useToggleAccountVisibility,
} from "../context/context";

// determines whether to show logout, cart, orders etc or not.
const logoutStyle = {
  display: JSON.parse(localStorage.getItem("user")) ? "flex" : "none",
};

function Navbar() {
  // custom hooks
  const toggleAccountVisibility = useToggleAccountVisibility();
  const accountVisibility = useAccountVisibility();

  // drawer's state.
  const [toggle, setToggle] = useState(null);

  const navigate = useNavigate();

  // Dom manipulation.
  const app_main = document.getElementById("root").firstChild;
  const navbar = document.getElementById("navbar");
  const root = document.getElementById("root");

  // style change for when drawer opens or closes.
  useEffect(() => {
    if (toggle == true) {
      app_main.style.filter = "brightness(.4)";
      root.style.overflow = "hidden";
      root.style.maxHeight = "100vh";
      navbar.style.filter = "brightness(.5)";
    } else if (toggle == false || app_main != null) {
      app_main.style.filter = "none";
      root.style.overflow = "scroll";
      root.style.maxHeight = "initial";
    }
  }, [toggle, app_main]);

  const drawerStyle = {
    right: toggle ? "0" : "-60%",
  };

  const account_style = {
    display: accountVisibility ? "flex" : "none",
  };

  function scroll() {
    root.style.overflow = "scroll";
  }

  // function to logout.
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
      {/* main navbar */}
      <div
        id="navbar"
        className="navbar w-stretch grid items-center grid-cols-3 bg-gradient-to-r from-pink-400 to-rose-900"
      >
        <div className="account">
          {/* drawer button */}
          <div onClick={() => setToggle(true)} className="barbox">
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
          </div>
        </div>
        <div className="logo row-auto p-2"></div>

        {/* User account */}
        <div
          className="logo px-7 text-white"
          onClick={() => toggleAccountVisibility((prev) => !prev)}
        >
          {/* account info */}
          <div className="account_info" style={account_style}>
            <Account />
          </div>

          {/* account button */}
          <FaUserAlt
            size="23px"
            style={{ marginRight: ".5rem" }}
            cursor="pointer"
          />
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer" style={drawerStyle}>
        {/* Cut for drawer */}
        <p className="cut" onClick={() => setToggle(false)}>
          <ImCross />
        </p>

        {/* Home */}
        <Link className="w-full flex items-center justify-center link" to="/">
          Home
        </Link>

        {/* Cart */}
        <Link
          className="w-full links flex items-center justify-center link"
          onClick={scroll}
          to="/cart"
          style={logoutStyle}
        >
          Cart
        </Link>

        {/* Orders */}
        <Link
          className="w-full links flex items-center justify-center link"
          to="/order"
          style={logoutStyle}
          onClick={scroll}
        >
          Orders
        </Link>

        {/* SignUp */}
        <Link
          className="w-full links flex items-center justify-center link"
          to="/signup"
          onClick={scroll}
        >
          SignUp
        </Link>

        {/* login */}
        <Link
          className="w-full links flex items-center justify-center link"
          to="/loginPage"
          onClick={scroll}
        >
          Login
        </Link>

        {/* Logout */}
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

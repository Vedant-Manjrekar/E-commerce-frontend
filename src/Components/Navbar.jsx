import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SwipeableDrawer, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

console.log(JSON.parse(localStorage.getItem("user")));

const logoutStyle = {
  display: JSON.parse(localStorage.getItem("user")) ? "flex" : "none",
};

function Navbar() {
  const navigate = useNavigate();

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

  const anchor = "right";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      textAlign="center"
      display={"grid"}
      height="stretch"
      justifyContent="space-evenly"
      padding={"2rem"}
    >
      {/* <Link className="w-full flex items-center justify-center" to="/">
        Home
      </Link> */}
      <Link
        className="w-full links flex items-center justify-center"
        to="/cart"
        style={logoutStyle}
      >
        Cart
      </Link>
      <Link
        className="w-full links flex items-center justify-center"
        to="/order"
        style={logoutStyle}
      >
        Orders
      </Link>
      <Link
        className="w-full links flex items-center justify-center"
        to="/signup"
      >
        SignUp
      </Link>
      <Link
        className="w-full links flex items-center justify-center"
        to="/loginPage"
      >
        Login
      </Link>
      <p
        onClick={logout}
        className="w-full links flex items-center justify-center"
        style={logoutStyle}
      >
        Logout
      </p>
    </Box>
  );

  return (
    <div className="navbar w-stretch grid items-center grid-cols-3 bg-gradient-to-r from-pink-400 to-rose-900">
      <Link to="/">
        <div className="logo px-7 text-white">Logo</div>
      </Link>
      <div className="logo row-auto p-2"></div>
      <div className="account p-2 right-5 absolute">
        <Button onClick={toggleDrawer(anchor, true)} className="barbox">
          <div className="bars"></div>
          <div className="bars"></div>
          <div className="bars"></div>
        </Button>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </div>
    </div>
  );
}

export default Navbar;

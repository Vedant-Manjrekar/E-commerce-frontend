import axios from "../axios/axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { LOGGED_USER } from "../assets/constants/constants";

function Login() {
  const navigate = useNavigate();

  // refs for fetching login fields
  const email = useRef();
  const password = useRef();

  // submits user login when pressed 'Enter'.
  document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      loginUser();
    }
  });

  // function to log user in.
  function loginUser(event) {
    if (email.current.value && password.current.value) {
      axios
        .post("/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((response) => {
          localStorage.removeItem(LOGGED_USER);

          window.localStorage.setItem(
            LOGGED_USER,
            JSON.stringify(response.data)
          );

          let event = new Event("storage");
          dispatchEvent(event);

          navigate("/");

          location.reload();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Please enter login details.");
    }
  }

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* main page */}
      <div className="login">
        {/* email */}
        <input
          className="inps border border-black"
          placeholder="Enter email"
          type="email"
          ref={email}
          id="email"
        />

        {/* password */}
        <input
          className="inps border border-black"
          type="password"
          placeholder="Enter password"
          ref={password}
          id="pass"
        />

        {/* Login Button  */}
        <button
          className="submit border border-black"
          type="submit"
          value="Login"
          onClick={loginUser}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;

import axios from "../axios/axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  document.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      loginUser();
    }
  });

  function loginUser(event) {
    if (email.current.value && password.current.value) {
      axios
        .post("/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("user");

          window.localStorage.setItem("user", JSON.stringify(response.data));

          let event = new Event("storage");
          dispatchEvent(event);

          navigate("/");

          location.reload();
        })
        .catch((error) => {
          event.preventDefault();
          alert(error.response.data);
        });
    } else {
      alert("Please enter login details.");
    }
  }

  return (
    <>
      <Navbar />
      <div className="login">
        <input
          className="inps border border-black"
          placeholder="Enter email"
          type="email"
          ref={email}
          id="email"
        />
        <input
          className="inps border border-black"
          type="password"
          placeholder="Enter password"
          ref={password}
          id="pass"
        />
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

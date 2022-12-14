import axios from "../axios/axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  function loginUser() {
    axios
      .post("/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((response) => {
        console.log(response.data);

        window.localStorage.setItem("user", JSON.stringify(response.data));

        let event = new Event("storage");
        dispatchEvent(event);

        navigate("/");

        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="login grid">
        <input
          className="border border-black"
          type="text"
          ref={email}
          id="email"
        />
        <input
          className="border border-black"
          type="password"
          ref={password}
          id="pass"
        />
        <input
          className="border border-black"
          type="submit"
          value="Login"
          onClick={loginUser}
        />
      </div>
    </>
  );
}

export default Login;

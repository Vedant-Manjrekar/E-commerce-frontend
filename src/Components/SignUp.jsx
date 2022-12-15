import React from "react";
import { useRef } from "react";
import axios from "../axios/axios";
import bcrypt from "bcryptjs";
import Navbar from "../Components/Navbar";

function SignUp() {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);

  function signUpUser(event) {
    event.preventDefault();

    const emailVal = email.current.value;

    if (emailVal.includes("@") === false) {
      alert("Invalid Email.");
      return;
    }

    console.log(emailVal);

    axios
      .post("/signup", {
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        password: password.current.value,
        address: {},
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar />
      <div className="signup flex items-center justify-center w-screen">
        <form className="grid p-5 grid-cols-2 justify-center form">
          <input
            required
            type="text"
            className="border inp1 border-black p-1 inps"
            ref={name}
            placeholder="Full name"
          />
          <input
            required
            type="email"
            className="border inp2 border-black p-1 inps"
            ref={email}
            placeholder="Email"
          />
          <input
            required
            type="password"
            className="border inp3 border-black p-1 inps"
            ref={password}
            placeholder="Password"
          />
          <input
            required
            type="number"
            className="border inp4 border-black p-1 inps"
            ref={phone}
            placeholder="Phone"
          />
          <input
            required
            onClick={signUpUser}
            type="submit"
            value="Submit"
            className="bg-green-300 m-auto inp5 inps"
          />
        </form>
      </div>
    </>
  );
}

export default SignUp;

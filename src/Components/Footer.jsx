import React from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";

function Footer() {
  return (
    <div className="footer w-screen p-4 bg-rose-900 text-white">
      <p className="w-screen items-center justify-center flex">
        Made with <BsFillSuitHeartFill className="mx-2" /> by Vedant M.
      </p>
    </div>
  );
}

export default Footer;

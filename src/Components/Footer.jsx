import React from "react";
import { BsFillSuitHeartFill } from "react-icons/bs";

function Footer() {
  return (
    <div className="footer p-4 bg-rose-900 text-white">
      <p className=" items-center justify-center flex">
        Made with <BsFillSuitHeartFill className="mx-2" /> by Vedant M.
      </p>
    </div>
  );
}

export default Footer;

import React from "react";

function Account() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {!userData ? (
        <div className="acc">Please Login/SignUp</div>
      ) : (
        <div className="acc">
          {/* Name */}
          <section className="section">
            <p className="acc_title">Name:</p>
            &nbsp;
            <p className="acc_data">{userData.name}</p>
          </section>
          {/* Email */}
          <section className="section">
            <p className="acc_title">Email:</p>
            &nbsp;
            <p className="acc_data">{userData.email}</p>
          </section>
          {/* Phone */}
          <section className="section">
            <p className="acc_title">Phone:</p>
            &nbsp;
            <p className="acc_data">{userData.phone}</p>
          </section>
          {/* Address */}

          {userData.address ? (
            <p className="section1">
              <p className="acc_title">Address:</p>
              <p className="address">
                {`
                ${userData.address?.house_no}, ${userData.address?.street}, ${userData.address?.landmark}, ${userData.address?.pincode},
                `}
              </p>
            </p>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Account;

import React from "react";
import "../App.css";
import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";

function HomePage() {
  const [electronics, setElectronics] = useState([]);
  const [mensClothing, setMensClothing] = useState([]);
  const [womensClothing, setWomensCLothing] = useState([]);
  const [jewellery, setJewellery] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [user, setUser] = useState(null);

  // console.log(loginUser);

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  function fetchCategory(categoryy) {
    fetch(`https://fakestoreapi.com/products/category/${categoryy}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (categoryy === "electronics") {
          setElectronics(data);
        } else if (categoryy === "men's clothing") {
          setMensClothing(data);
        } else if (categoryy === "women's clothing") {
          setWomensCLothing(data);
        } else if (categoryy === "jewelery") {
          setJewellery(data);
        }
      });
  }

  useEffect(() => {
    fetchCategory("electronics");
    fetchCategory("men's clothing");
    fetchCategory("women's clothing");
    fetchCategory("jewelery");

    if (JSON.parse(localStorage.getItem("user")) == null) {
      setUser(false);
    } else if (JSON.parse(localStorage.getItem("user")) == "User not found") {
      setUser(false);
    } else {
      setUser(true);
    }
  }, []);

  console.log(user);

  console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <Navbar />
      <div className="App bg-white" id="app_main">
        {user ? (
          <p className="welcome h-max w-screen text-center py-6">
            Welcome {loginUser?.name}{" "}
          </p>
        ) : (
          // <p className="welcome h-max w-screen text-center py-6">
          //   Please <Link to="/login">Login</Link> /{" "}
          //   <Link to="/signup">Signup</Link> for a better purchasing experience.
          // </p>
          <p></p>
        )}
        <Banner />
        <Categories prod={mensClothing} name="Mens Wear" />
        <Categories prod={womensClothing} name="Female Fashion" />
        <Categories prod={electronics} name="Electronics" />
        <Categories prod={jewellery} name="Jewellery" />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

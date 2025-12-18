import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLogedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLogedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout Successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  //   const fetchProducts = async () => {
  //     try {
  //       const url = "http://localhost:8080/products";
  //       const headers = {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       };
  //       const response = await fetch(url, headers);
  //       const result = await response.json();
  //       console.log(result);
  //     } catch (error) {
  //       handleError(error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <ToastContainer />
    </div>
  );
}

export default Home;

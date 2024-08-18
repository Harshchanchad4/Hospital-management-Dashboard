import React, { useContext, useState } from 'react'
import { Context } from "../main"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    console.log("DATA  : " , email , password);
    e.preventDefault();
    try {

      const response = await axios.post(BASE_URL + "/user/login",
        { email, password, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type ": "application/json" }
        }
      );

      console.log("RESPONSE ", response);
      toast.success(response.data.message);
      setIsAuthenticated(true);

      navigateTo("/");


    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }


  return (
    <>
      <div className="container form-component flex justify-center items-center flex-col">
        <img src="/medicare.png" alt="logo" className='logo' />

        <h1 className='form-title'>Welcome To Medicare</h1>
        <p>only Admins are allowed to Access These Resources</p>


        <form onSubmit={handleLogin} className="w-[50%]">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
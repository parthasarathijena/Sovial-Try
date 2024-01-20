import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Cookies from 'js-cookie';

function App() {
  const user = Cookies.get('user')
  console.log(user)
  return (
    <>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login/> } />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

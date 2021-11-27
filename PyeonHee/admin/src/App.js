import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import HeaderInLogin from './pages/HeaderInLogin';
import HeaderInLogount from "./pages/HeaderInLogout";
import Login from './pages/Login';
import Notification from './pages/Notification';
import ServiceCenter from './pages/ServiceCenter';

import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('userID') === null){
      console.log('isLogin ?? :: ', isLogin)
    } else {
      setIsLogin(true);
      console.log('isLogin ?? :: ', isLogin)
    }
  })
 
  if(isLogin === false){
  return (
    <BrowserRouter>
    <div className="App">
      <HeaderInLogount />
      <div className="AppBody">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
  }else{
    return (
      <BrowserRouter>
      <div className="App">
        <HeaderInLogin />
        <div className="AppBody">
          <Routes>
            <Route path="/" element={<Notification />} />
            <Route path="/service" element={<ServiceCenter />} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

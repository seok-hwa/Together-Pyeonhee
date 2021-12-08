import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import HeaderInLogin from './pages/HeaderInLogin';
import HeaderInLogount from "./pages/HeaderInLogout";
import Login from './pages/Login';
import Notification from './pages/Notification';
import ServiceCenter from './pages/ServiceCenter';
import Main from "./pages/Main";
import NotificationWrite from "./pages/NotificationWrite";
import NotificationBoard from "./pages/NotificationBoard";
import QueryBoard from "./pages/QueryBoard";
import NotificationUpdate from "./pages/NotificationUpdate";
import QueryUpdate from "./pages/QueryUpdate";
import FinancialItemList from "./pages/FinancialItemList";
import CounselorList from "./pages/CounselorList";

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
        <Switch>
          <Route exact path="/" component={Login}/>
        </Switch>
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
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/notification/:pageNumber" component={Notification} />
            <Route path="/service/:pageNumber" component={ServiceCenter} />
            <Route path="/counselorList/:pageNumber" component={CounselorList} />
            <Route path="/financialItemList/:pageNumber" component={FinancialItemList} />
            <Route path="/notificationWrite" component={NotificationWrite} />
            <Route path="/notificationBoard/:boardID" component={NotificationBoard} />
            <Route path="/queryBoard/:boardID" component={QueryBoard} />
            <Route path="/queryUpdate/:boardID" component={QueryUpdate} />
            <Route path="/notificationUpdate/:boardID" component={NotificationUpdate} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

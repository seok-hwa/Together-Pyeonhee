import React, { useState, useEffect } from "react"; 
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import FinancialFundList from "./pages/FinancialFundList";
import FinancialLoanList from "./pages/FinancialLoanList";
import FinancialPensionList from "./pages/FinancialPensionList";
import FinancialSavingList from "./pages/FinancialSavingList";
import CounselorListFinancial from "./pages/CounselorListFinancial";
import CounselorListAsset from "./pages/CounselorListAsset";
import FinancialItemWrite from "./pages/FinancialItemWrite";
import CounselorWrite from "./pages/CounselorWrite";
import FundBoard from "./pages/FundBoard";
import SavingBoard from "./pages/SavingBoard";
import PensionBoard from "./pages/PensionBoard";
import LoanBoard from "./pages/LoanBoard";
import CounselorFinancialBoard from "./pages/CounselorFinancialBoard";
import CounselorAssetBoard from "./pages/CounselorAssetBoard";

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
            <Route path="/counselorListFinancial/:pageNumber" component={CounselorListFinancial} />
            <Route path="/counselorListAsset/:pageNumber" component={CounselorListAsset} />
            <Route path="/financialFundList/:pageNumber" component={FinancialFundList} />
            <Route path="/financialPensionList/:pageNumber" component={FinancialPensionList} />
            <Route path="/financialSavingList/:pageNumber" component={FinancialSavingList} />
            <Route path="/financialLoanList/:pageNumber" component={FinancialLoanList} />
            <Route path="/notificationWrite" component={NotificationWrite} />
            <Route path="/financialItemWrite" component={FinancialItemWrite} />
            <Route path="/counselorWrite" component={CounselorWrite} />
            <Route path="/notificationBoard/:boardID" component={NotificationBoard} />
            <Route path="/queryBoard/:boardID" component={QueryBoard} />
            <Route path="/queryUpdate/:boardID" component={QueryUpdate} />
            <Route path="/notificationUpdate/:boardID" component={NotificationUpdate} />
            <Route path="/fundBoard/:boardID" component={FundBoard} />
            <Route path="/savingBoard/:boardID" component={SavingBoard} />
            <Route path="/pensionBoard/:boardID" component={PensionBoard} />
            <Route path="/loanBoard/:boardID" component={LoanBoard} />
            <Route path="/counselorFinancialBoard/:boardID" component={CounselorFinancialBoard} />
            <Route path="/counselorAssetBoard/:boardID" component={CounselorAssetBoard} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

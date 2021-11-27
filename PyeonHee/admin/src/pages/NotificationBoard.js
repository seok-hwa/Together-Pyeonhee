import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationBoard({ match }) {
return (
  <div className="NotificationDiv">
    <p className="NotificationTitleText">공지사항 작성</p>
    <div className="NotificationBodyDiv">

    </div>
  </div>
  );
}

export default NotificationBoard;
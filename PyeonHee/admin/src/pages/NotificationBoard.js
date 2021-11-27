import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationBoard({ match }) {
return (
    <div className="LoginDiv">
        <p>공지게시판{match.params.boardID}</p>
    </div>
  );
}

export default NotificationBoard;
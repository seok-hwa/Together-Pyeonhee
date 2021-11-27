import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function QueryBoard({ match }) {
  return (
    <div className="LoginDiv">
        <p>문의게시판{match.params.boardID}</p>
    </div>
  );
}

export default QueryBoard;
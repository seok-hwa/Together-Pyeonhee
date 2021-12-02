import React from "react";
import {TableRow, TableCell } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';



function NotificationInMain(props) {
  /*
  const toBoard=()=>{
    history.push({
      pathname: "/notificationBoard",
      props: {
        boardID: props.id,
      }
    })
  }*/

  return (
      <TableRow>
          <TableCell>{props.category}</TableCell>
          <TableCell>
          <a href={`/notificationBoard/${props.id}`}>{props.title}</a>
          </TableCell>
          <TableCell>{props.date.substring(0,10)}</TableCell>
      </TableRow>
    );
  }
  
  export default NotificationInMain;
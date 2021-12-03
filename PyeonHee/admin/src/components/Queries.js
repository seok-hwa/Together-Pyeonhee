import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function Queries(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/queryBoard/${props.id}`}>{props.title}</a></TableCell>
          <TableCell>{props.userID}</TableCell>
          <TableCell>{props.date.substring(0,10)}</TableCell>
          {
            props.answer === 1 ?
            <TableCell>O</TableCell>:
            <TableCell>X</TableCell>
          }
      </TableRow>
    );
  }
  
  export default Queries;
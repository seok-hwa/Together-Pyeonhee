import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function QueryInMain(props) {
    return (
      <TableRow>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/queryBoard/${props.id}`}>{props.title}</a></TableCell>
          <TableCell>{props.userID}</TableCell>
          <TableCell>{props.date}</TableCell>
      </TableRow>
    );
  }
  
  export default QueryInMain;
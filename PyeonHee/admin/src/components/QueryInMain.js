import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function QueryInMain(props) {
    return (
      <TableRow>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/queryBoard/${props.id}`} className="box">{props.title}</a></TableCell>
          <TableCell>{props.userID}</TableCell>
          <TableCell>{props.date.substring(0,10)}</TableCell>
      </TableRow>
    );
  }
  
  export default QueryInMain;
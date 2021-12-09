import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function FundItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/fundBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default FundItems;
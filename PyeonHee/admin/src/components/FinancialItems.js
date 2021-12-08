import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function FinancialItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/queryBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.bankName}</TableCell>
      </TableRow>
    );
  }
  
  export default FinancialItems;
import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function LoanItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>대출</TableCell>
          <TableCell><a href={`/loanBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default LoanItems;
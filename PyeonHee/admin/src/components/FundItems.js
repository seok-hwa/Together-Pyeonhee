import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function FundItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>펀드</TableCell>
          <TableCell><a href={`/fundBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default FundItems;
import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function CounselorsFinancial(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>{props.category}</TableCell>
          <TableCell><a href={`/counselorFinancialBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default CounselorsFinancial;
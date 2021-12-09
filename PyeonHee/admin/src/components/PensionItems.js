import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function PensionItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>연금</TableCell>
          <TableCell><a href={`/pensionBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default PensionItems;
import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function SavingItems(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>적금</TableCell>
          <TableCell><a href={`/savingBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default SavingItems;
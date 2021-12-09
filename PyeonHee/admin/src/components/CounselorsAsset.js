import React from "react";
import {TableRow, TableCell } from "@material-ui/core";

function CounselorsAsset(props) {
    return (
      <TableRow>
          <TableCell>{props.id}</TableCell>
          <TableCell>자산관리</TableCell>
          <TableCell><a href={`/counselorAssetBoard/${props.id}`}>{props.name}</a></TableCell>
          <TableCell>{props.company_name}</TableCell>
      </TableRow>
    );
  }
  
  export default CounselorsAsset;
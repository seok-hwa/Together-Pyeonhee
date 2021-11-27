import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },

})
function ServiceCenter(props) {
  const {classes} = props;
  return (
    <div className="ServiceDiv">
      <p className="ServiceTitleText">고객센터</p>
      <div className="ServiceBodyDiv">
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>분류</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성자ID</TableCell>
                <TableCell>날짜</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(ServiceCenter);
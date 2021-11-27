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
function Notification(props) {
  const {classes} = props;

  return (
    <div className="NotificationDiv">
      <p className="NotificationTitleText">공지사항</p>
      <div className="NotificationWriteButtonDiv">
          <button className="NotificationWriteButton" type='button'>공지글 게시</button>
      </div>
      <div className="NotificationBodyDiv">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>분류</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>날짜</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(Notification);
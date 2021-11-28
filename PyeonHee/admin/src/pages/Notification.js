import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Notifications from "../components/Notifications";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  tableRow: {
    fontWeight: 'bold'
  }
})
function Notification(props) {
  const {classes} = props;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('들어왔다.');
    axios({
      method:"GET",
      url: '/adminGetNotificationList',
    })
    .then((res)=>{
        console.log(res.data);
        setNotifications(res.data);
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
  },[])

  const writeNotification = () => {
      document.location.href = '/notificationWrite';
  }

  return (
    <div className="NotificationDiv">
      <p className="NotificationTitleText">공지사항</p>
      <div className="NotificationWriteButtonDiv">
          <button className="NotificationWriteButton" type='button' onClick={writeNotification}>공지글 게시</button>
      </div>
      <div className="NotificationBodyDiv">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>번호</TableCell>
                <TableCell className={classes.tableRow}>분류</TableCell>
                <TableCell className={classes.tableRow}>제목</TableCell>
                <TableCell className={classes.tableRow}>날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map(c => {return (<Notifications key={c.id} id={c.id} category={c.category} title={c.title} date={c.date}/>)})}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(Notification);
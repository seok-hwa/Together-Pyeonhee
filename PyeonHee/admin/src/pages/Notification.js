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
const notifications =[
  {
    id: 2,
    category: '티어',
    title: '티어 정책입니다.',
    date: '2021-11-28'
  },
  {
    id: 1,
    category: '포인트',
    title: '포인트 정책입니다.',
    date: '2021-11-27'
  },
]
function Notification(props) {
  const {classes} = props;
  //const [notifications, setNotifications] = useState([]);

  /*
  useEffect(() => {
    axios({
      method:"GET",
      url: '/adminGetNotificationList',
    })
    .then((res)=>{
        setNotification(res);
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
  },[])*/

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
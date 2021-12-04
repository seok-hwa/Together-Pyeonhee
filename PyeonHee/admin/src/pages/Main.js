import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {withStyles} from '@material-ui/core/styles';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import NotificationInMain from '../components/NotificationInMain';
import QueryInMain from "../components/QueryInMain";

const styles = theme => ({
  root: {
    width: '45%',
    overflowX: "auto",
    margin: 10,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    fontWeight: 'bold'
  }
})
function Main(props) {
  const {classes} = props;
  const [notifications, setNotifications] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method:"GET",
      url: '/notificationInMain',
    })
    .then((res)=>{
      console.log('공지사항: ',res.data);
      setNotifications(res.data);
    })
    .then(()=>{
      axios({
        method:"GET",
        url: '/queryInMain',
      })
      .then((res)=>{
        console.log('고객센터: ',res.data);
        setQueries(res.data);
      })
      .then(()=>{
        setLoading(true);
      })
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

  if(loading === true){
    return (
      <div className="NotificationDiv">
        <p className="NotificationTitleText">메인페이지</p>
        <div className="MainBodyDiv">
          <Paper className={classes.root}>
          <p>공지사항 최신글 10개</p>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableRow}>분류</TableCell>
                  <TableCell className={classes.tableRow}>제목</TableCell>
                  <TableCell className={classes.tableRow}>날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map(c => {return (<NotificationInMain key={c.notice_number} id={c.notice_number} category={c.category} title={c.title} date={c.notice_date}/>)})}
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.root}>
          <p>고객센터 최신글 10개</p>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableRow}>분류</TableCell>
                  <TableCell className={classes.tableRow}>제목</TableCell>
                  <TableCell className={classes.tableRow}>작성자ID</TableCell>
                  <TableCell className={classes.tableRow}>날짜</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queries.map(c => {return (<QueryInMain key={c.board_number} id={c.board_number} category={c.category} title={c.title} date={c.board_date} userID={c.user_id}/>)})}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }else{
    return (
      <div className="NotificationDiv">
        <p className="NotificationTitleText">메인페이지</p>
        <div className="MainBodyDiv">
          <Paper className={classes.root}>
          <p>공지사항 최신글 10개</p>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableRow}>분류</TableCell>
                  <TableCell className={classes.tableRow}>제목</TableCell>
                  <TableCell className={classes.tableRow}>날짜</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
          <Paper className={classes.root}>
          <p>고객센터 최신글 10개</p>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableRow}>분류</TableCell>
                  <TableCell className={classes.tableRow}>제목</TableCell>
                  <TableCell className={classes.tableRow}>작성자ID</TableCell>
                  <TableCell className={classes.tableRow}>날짜</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
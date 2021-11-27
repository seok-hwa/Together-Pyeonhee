import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Queries from "../components/Queries";
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
const queries =[
  {
    id: 2,
    category: '티어',
    title: '플레에서 안 올라요',
    userID: 'sdfsdf1',
    date: '2021-11-28'
  },
  {
    id: 1,
    category: '포인트',
    title: '포인트 오류인 것 같습니다.',
    userID: 'swewe123',
    date: '2021-11-27'
  },
]
function ServiceCenter(props) {
  const {classes} = props;
  //const [queries, setQueries] = useState([]);

  /*
  useEffect(() => {
    axios({
      method:"GET",
      url: '/adminGetQueryList',
    })
    .then((res)=>{
        console.log(res.data);
        setQueries(res.data);
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
  },[])*/

  return (
    <div className="ServiceDiv">
      <p className="ServiceTitleText">고객센터</p>
      <div className="ServiceBodyDiv">
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>번호</TableCell>
                <TableCell className={classes.tableRow}>분류</TableCell>
                <TableCell className={classes.tableRow}>제목</TableCell>
                <TableCell className={classes.tableRow}>작성자ID</TableCell>
                <TableCell className={classes.tableRow}>날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map(c => {return (<Queries key={c.id} id={c.id} category={c.category} title={c.title} userID={c.userID} date={c.date}/>)})}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default withStyles(styles)(ServiceCenter);
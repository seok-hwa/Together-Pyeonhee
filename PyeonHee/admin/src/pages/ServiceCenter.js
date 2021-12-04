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
/*
const queries =[
  {
    id: 2,
    category: '티어',
    title: '플레에서 안 올라요',
    userID: 'sdfsdf1',
    date: '2021-11-28',
    answer: false,
  },
  {
    id: 1,
    category: '포인트',
    title: '포인트 오류인 것 같습니다.',
    userID: 'swewe123',
    date: '2021-11-27',
    answer: true,
  },
]*/
function ServiceCenter(props) {
  const {classes} = props;
  const [queries, setQueries] = useState([]);
  const [totalPage, setTotalPage] = useState(17);
  const [currentStartPage, setCurrentStartPage] = useState(1);
  const [currentEndPage, setCurrentEndPage] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    axios({
      method:"GET",
      url: '/serviceCenterTotalPage',
    })
    .then((res)=>{
      console.log(res.data);
      let tempTotalPage = res.data.totalPage;

      let currentPage = props.match.params.pageNumber;

      let startPage = (parseInt((currentPage-1)/10) * 10)+1;
      let EndPage;

      if(tempTotalPage - (startPage + 9) > 0){
        EndPage = startPage + 9;
      }else{
        EndPage = tempTotalPage;
      }

      console.log('현재 페이지: ', currentPage);
      console.log('시작 페이지: ', startPage);    
      console.log('종료 페이지: ', EndPage);
      console.log('총 페이지: ',tempTotalPage)
      
      let pageNumber = [];
      for (let i = startPage; i <= EndPage; i++) {
        pageNumber.push(i);
      }

      setTotalPage(tempTotalPage);
      setCurrentStartPage(startPage);
      setCurrentEndPage(EndPage);
      setPageNumbers(pageNumber);
    })
    .then(()=>{
      axios({
        method:"POST",
        url: `/adminGetQueryList`,
        data:{
            pageNumber: props.match.params.pageNumber,
        }
      })
      .then((res)=>{
        console.log(res.data);
        setQueries(res.data);
      })
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

  function paginateNext(number){
    document.location.href = `/service/${number}`;
  }
  function paginatePrev(number){
    document.location.href = `/service/${number}`;
  }
  function paginate(number){
    document.location.href = `/service/${number}`;
  }

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
                <TableCell className={classes.tableRow}>답변</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map(c => {return (<Queries key={c.board_number} id={c.board_number} category={c.category} title={c.title} userID={c.user_id} date={c.board_date} answer={c.comment_check}/>)})}
            </TableBody>
          </Table>
        </Paper>
        <div className="PageDiv">
          {
            parseInt(currentStartPage) === 1 ?
            <a className="Page-link">이전</a> :
            <a className="Page-link" onClick={() => paginatePrev(parseInt(currentStartPage)-1)}>이전</a>
          }
          {
              pageNumbers.map(number => (
                number === parseInt(props.match.params.pageNumber) ?
                <a key={number} className="Page-link-highlight" onClick={() => paginate(number)}>
                  {number}
                </a>:
                <a key={number} className="Page-link" onClick={() => paginate(number)}>
                  {number}
                </a>
            ))
          }
          {
            totalPage === currentEndPage || currentEndPage === 0 ?
            <a className="Page-link">다음</a> :
            <a className="Page-link" onClick={() => paginateNext(parseInt(props.match.params.pageNumber)+1)}>다음</a>
          }
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(ServiceCenter);
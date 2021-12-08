import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Counselors from "../components/Counselors";

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

function CounselorList(props) {
  const {classes} = props;
  const [counselors, setCounselors] = useState([]);
  const [totalPage, setTotalPage] = useState(17);
  const [currentStartPage, setCurrentStartPage] = useState(1);
  const [currentEndPage, setCurrentEndPage] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      method:"GET",
      url: '/counselorListTotalPage',
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
        url: `/adminGetCounselorList`,
        data:{
            pageNumber: props.match.params.pageNumber,
        }
      })
      .then((res)=>{
        console.log(res.data);
        setCounselors(res.data);
      })
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

  const writeNotification = () => {
      document.location.href = '/counselorWrite';
  }

  function paginateNext(number){
    document.location.href = `/counselorList/${number}`;
  }
  function paginatePrev(number){
    document.location.href = `/counselorList/${number}`;
  }
  function paginate(number){
    document.location.href = `/counselorList/${number}`;
  }
  return (
    <div className="NotificationDiv">
      <p className="NotificationTitleText">금융상담</p>
      <div className="NotificationWriteButtonDiv">
          <button className="NotificationWriteButton" type='button' onClick={writeNotification}>상담사 등록</button>
      </div>
      <div className="NotificationBodyDiv">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>번호</TableCell>
                <TableCell className={classes.tableRow}>분류</TableCell>
                <TableCell className={classes.tableRow}>이름</TableCell>
                <TableCell className={classes.tableRow}>소속은행</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {counselors.map(c => {return (<Counselors key={c.counselor_number} id={c.counselor_number} category={c.category} name={c.counselor_name} company_name={c.company_name}/>)})}
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

export default withStyles(styles)(CounselorList);
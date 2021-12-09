import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import FundItems from "../components/FundItems";

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

function FinancialFundList(props) {
  const {classes} = props;
  const [financialItems, setFinancialItems] = useState([]);
  const [totalPage, setTotalPage] = useState(17);
  const [currentStartPage, setCurrentStartPage] = useState(1);
  const [currentEndPage, setCurrentEndPage] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputCate = (e) => {
    if(e.target.value === '펀드'){
      document.location.href = `/financialFundList/1`;
    }else if(e.target.value === '적금'){
      document.location.href = `/financialSavingList/1`;
    }
    else if(e.target.value === '대출'){
      document.location.href = `/financialLoanList/1`;
    }
    else if(e.target.value === '연금'){
      document.location.href = `/financialPensionList/1`;
    }
  }

  useEffect(() => {
    axios({
      method:"GET",
      url: '/financialFundListTotalPage',
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
        url: `/adminGetFinancialFundList`,
        data:{
            pageNumber: props.match.params.pageNumber,
        }
      })
      .then((res)=>{
        console.log(res.data);
        setFinancialItems(res.data);
      })
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

  const writeNotification = () => {
      document.location.href = '/financialItemWrite';
  }

  function paginateNext(number){
    document.location.href = `/financialFundList/${number}`;
  }
  function paginatePrev(number){
    document.location.href = `/financialFundList/${number}`;
  }
  function paginate(number){
    document.location.href = `/financialFundList/${number}`;
  }
  return (
    <div className="NotificationDiv">
      <p className="NotificationTitleText">펀드</p>
      <div className="NotificationWriteButtonDiv">
          <button className="NotificationWriteButton" type='button' onClick={writeNotification}>상품 등록</button>
      </div>
      <div className="FinancialListSelectDiv">
      <select 
      className="BoardCateInput" 
      name="cate_input"
      onChange={handleInputCate}
      >
        <option value="펀드" selected>펀드</option>
        <option value="적금">적금</option>
        <option value="대출">대출</option>
        <option value="연금">연금</option>
      </select>
      </div>
      <div className="NotificationBodyDiv">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableRow}>번호</TableCell>
                <TableCell className={classes.tableRow}>상품분류</TableCell>
                <TableCell className={classes.tableRow}>상품명</TableCell>
                <TableCell className={classes.tableRow}>회사명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financialItems.map(c => {return (<FundItems key={c.fund_number} id={c.fund_number} category={c.bank_name} name={c.product_name} company_name={c.bank_name}/>)})}
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

export default withStyles(styles)(FinancialFundList);
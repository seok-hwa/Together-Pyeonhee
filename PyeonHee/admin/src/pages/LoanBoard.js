import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function LoanBoard(props) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');

  //대출
  const [interestType, setInterestType] = useState('');
  const [repayType, setRepayType] = useState('');

  const [interest, setInterest] = useState('');  //연금 공통, 대출 공통

  const [link, setLink] = useState('');
/*
  useEffect(() => {
    axios({
      method:"POST",
      url: `/loanBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);

        setProductName(res.data[0].productName);
        setProductCate(res.data[0].productCate);
        setInterestType(res.data[0].interestType);
        setInterest(res.data[0].interest);
        setRepayType(res.data[0].repayType);
        setLink(res.data[0].link);

    }).catch(error=>{
        console.log(error);
    });
  },[])*/

    return (
    <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">상품 확인</p>
        <div className="NotificationWriteDiv">
        <div className="FinancialWriteBodyDiv">
            <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
            <p className="BoardTitle">하하하</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상품링크:&nbsp;</p>
            <p className="LinkText">하하하</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상품 분류: </p>
                <p>적금</p>
            </div>
            <div className="FinancialFundDiv">
            <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                      <p>금리 방식:&nbsp;</p>
                      <p>변동금리</p>
                    </div>
                    <div className="FinancialRow">
                      <p>상환 방식:&nbsp;</p>
                      <p>원금균등상환</p>
                    </div>
                    <div className="FinancialRow">
                        <p>금리:&nbsp;</p>
                        <p>12</p>
                        <p>%</p>
                      </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default LoanBoard;
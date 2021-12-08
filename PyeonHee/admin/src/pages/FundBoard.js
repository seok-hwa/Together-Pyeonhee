import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function FundBoard(props) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');

  //펀드
  const [profit3, setProfit3] = useState('');
  const [profit6, setProfit6] = useState('');
  const [profit12, setProfit12] = useState('');
  const [fundSize, setFundSize] = useState('');

  const [link, setLink] = useState('');

  /*
  useEffect(() => {
    axios({
      method:"POST",
      url: `/fundBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);

        setProductName(res.data[0].productName);
        setProductCate(res.data[0].productCate);
        setProfit3(res.data[0].profit3);
        setProfit6(res.data[0].profit6);
        setProfit12(res.data[0].profit12);
        setFundSize(res.data[0].fundSize);
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
                <p>펀드</p>
            </div>
            <div className="FinancialFundDiv">
                <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                    <p>3개월 수익률:&nbsp;</p>
                    <p>12</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>6개월 수익률:&nbsp;</p>
                    <p>12</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>1년 수익률:&nbsp;</p>
                    <p>12</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>펀드 규모:&nbsp;</p>
                    <p>12</p>
                    <p>억</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    );
}

export default FundBoard;
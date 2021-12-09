import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function PensionBoard({match}) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');
  const [productBankName, setProductBankName] = useState('');

  //연금
  const [disconnected, setDisconnected] = useState('');
  const [pensionType, setPensionType] = useState('');
  const [interest, setInterest] = useState('');  //연금 공통, 대출 공통

  const [link, setLink] = useState('');

  const deleteBoard =()=>{
    axios({
        method:"POST",
        url: `/pensionDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/financialPensionList/1';
        }else{
            alert('삭제 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

/*
  useEffect(() => {
    axios({
      method:"POST",
      url: `/pensionBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);

        setProductName(res.data[0].productName);
        setProductBankName(res.data[0].productBankName);
        setProductCate(res.data[0].productCate);
        setDisconnected(res.data[0].disconnected);
        setInterest(res.data[0].interest);
        setPensionType(res.data[0].pensionType);
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
            <p className="FinancialBoardTitle">하하하</p>
            </div>
            <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <p className="FinancialBankNameTitle">국민은행</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상품링크:&nbsp;</p>
            <p className="LinkTextInBoard">www.naver.com</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상품 분류:&nbsp;</p>
                <p className="FinancialCateInBoard">연금</p>
            </div>
            <div className="FinancialFundDiv">
                <div className="FinancialFundWriteDiv">
                      <div className="FinancialRow">
                        <p>유형:&nbsp;</p>
                        <p>안정형</p>
                      </div>
                      <div className="FinancialRow">
                        <p>중도해지 가능여부:&nbsp;</p>
                        <p>가능</p>
                      </div>
                      <div className="FinancialRow">
                          <p>수익률:&nbsp;</p>
                          <p>12</p>
                          <p>%</p>
                      </div>
                  </div>
            </div>
            <div className="NotificationBoardButtonDiv">
            <button className="NotificationDeleteButton" type='button' onClick={deleteBoard}>삭제</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default PensionBoard;
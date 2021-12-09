import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function FundBoard({ match }) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');
  const [productBankName, setProductBankName] = useState('');

  //펀드
  const [profit3, setProfit3] = useState('');
  const [profit6, setProfit6] = useState('');
  const [profit12, setProfit12] = useState('');
  const [fundSize, setFundSize] = useState('');
  const [mbti, setMbti] = useState('');
  const [link, setLink] = useState('');

  const deleteBoard =()=>{
    axios({
        method:"POST",
        url: `/fundDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/financialFundList/1';
        }else{
            alert('삭제 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  useEffect(() => {
    axios({
      method:"POST",
      url: `/fundBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data.result[0]);

        setProductName(res.data.result[0].product_name);
        setProductBankName(res.data.result[0].bank_name);
        setProductCate(res.data.result[0].productCate);
        setProfit3(res.data.result[0].interest_3);
        setProfit6(res.data.result[0].interest_6);
        setProfit12(res.data.result[0].interest_12);
        setFundSize(res.data.result[0].fund_sum);
        setMbti(res.data.result[0].mbti);
        setLink(res.data.result[0].link);

    }).catch(error=>{
        console.log(error);
    });
  },[])

    return (
    <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">상품 확인</p>
        <div className="NotificationWriteDiv">
        <div className="FinancialWriteBodyDiv">
            <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
            <p className="FinancialBoardTitle">{productName}</p>
            </div>
            <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <p className="FinancialBankNameTitle">{productBankName}</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상품링크:&nbsp;</p>
            <p className="LinkTextInBoard">{link}</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상품 분류:&nbsp;</p>
                <p className="FinancialCateInBoard">펀드</p>
            </div>
            <div className="FinancialFundDiv">
                <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                    <p>이 상품과 맞는 소비성향:&nbsp;</p>
                    <p>{mbti}</p>
                    </div>
                    <div className="FinancialRow">
                    <p>3개월 수익률:&nbsp;</p>
                    <p>{profit3}</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>6개월 수익률:&nbsp;</p>
                    <p>{profit6}</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>1년 수익률:&nbsp;</p>
                    <p>{profit12}</p>
                    <p>%</p>
                    </div>
                    <div className="FinancialRow">
                    <p>펀드 규모:&nbsp;</p>
                    <p>{fundSize}</p>
                    <p>억</p>
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

export default FundBoard;
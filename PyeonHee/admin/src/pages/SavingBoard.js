import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function SavingBoard({match}) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');
  const [productBankName, setProductBankName] = useState('');

  //적금
  const [type, setType] = useState(''); 
  const [interest, setInterest] = useState('');  //연금 공통, 대출 공통
  const [maxInterest, setMaxInterest] = useState('');

  const [link, setLink] = useState('');
  const [mbti, setMbti] = useState('');

  const deleteBoard =()=>{
    axios({
        method:"POST",
        url: `/savingDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/financialSavingList/1';
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
      url: `/savingBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);

        setProductName(res.data[0].productName);
        setProductBankName(res.data[0].productBankName);
        setProductCate(res.data[0].productCate);
        setType(res.data[0].type);
        setInterest(res.data[0].interest);
        setMaxInterest(res.data[0].maxInterest);
        setLink(res.data[0].link);
        setMbti(res.data[0].mbti);

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
                <p className="FinancialCateInBoard">적금</p>
            </div>
            <div className="FinancialFundDiv">
            <div className="FinancialFundWriteDiv">
                      <div className="FinancialRow">
                        <p>이 상품과 맞는 소비성향:&nbsp;</p>
                        <p>{mbti}</p>
                      </div>
                      <div className="FinancialRow">
                        <p>방식:&nbsp;</p>
                        <p>{type}</p>
                      </div>
                      <div className="FinancialRow">
                        <p>이자율:&nbsp;</p>
                        <p>{interest}</p>
                        <p>%</p>
                      </div>
                      <div className="FinancialRow">
                        <p>최고 우대금리:&nbsp;</p>
                        <p>{maxInterest}</p>
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

export default SavingBoard;
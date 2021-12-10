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
  const [mbti, setMbti] = useState('');

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

  useEffect(() => {
    axios({
      method:"POST",
      url: `/pensionBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data.result[0]);

        setProductName(res.data.result[0].product_name);
        setProductBankName(res.data.result[0].bank_name);
        setProductCate(res.data.result[0].productCate);
        setDisconnected(res.data.result[0].disconnected);
        setInterest(res.data.result[0].interest);
        setPensionType(res.data.result[0].product_type);
        setLink(res.data.result[0].link);
        setMbti(res.data.result[0].mbti);

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
                <p className="FinancialCateInBoard">연금</p>
            </div>
            <div className="FinancialFundDiv">
                <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                        <p>이 상품과 맞는 소비성향:&nbsp;</p>
                        <p>{mbti}</p>
                    </div>
                      <div className="FinancialRow">
                        <p>유형:&nbsp;</p>
                        <p>{pensionType}</p>
                      </div>
                      <div className="FinancialRow">
                        <p>중도해지 가능여부:&nbsp;</p>
                        <p>{disconnected}</p>
                      </div>
                      <div className="FinancialRow">
                          <p>수익률:&nbsp;</p>
                          <p>{interest}</p>
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
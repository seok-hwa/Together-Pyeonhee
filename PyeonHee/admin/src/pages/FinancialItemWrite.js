import React, { useState } from "react";
import axios from 'axios';
import '../App.css';

function FinancialItemWrite(props) {
  const [productName, setProductName] = useState('');
  const [productBankName, setProductBankName] = useState('');
  const [productCate, setProductCate] = useState('펀드');

  //펀드
  const [profit3, setProfit3] = useState('');
  const [profit6, setProfit6] = useState('');
  const [profit12, setProfit12] = useState('');
  const [fundSize, setFundSize] = useState('');

  //적금
  const [type, setType] = useState(''); 
  const [interest, setInterest] = useState('');  //연금 공통, 대출 공통
  const [maxInterest, setMaxInterest] = useState('');

  //연금
  const [disconnected, setDisconnected] = useState('');
  const [pensionType, setPensionType] = useState('');

  //대출
  const [interestType, setInterestType] = useState('');
  const [repayType, setRepayType] = useState('');

  //공통
  const [link, setLink] = useState('');

  //펀드, 적금, 연금 공통
  const [mbti, setMbti] = useState('P');

  const adminID = sessionStorage.getItem('userID');

  const handleInputName = (e) => {
    setProductName(e.target.value)
  }
  const handleInputBankName = (e) => {
    setProductBankName(e.target.value)
  }
  const handleInputCate = (e) => {
    setProductCate(e.target.value)
  }
  const handleInputLink = (e) => {
    setLink(e.target.value)
  }
  const handleProfit3Input = (e) => {
    setProfit3(e.target.value)
  }
  const handleProfit6Input = (e) => {
    setProfit6(e.target.value)
  }
  const handleProfit12Input = (e) => {
    setProfit12(e.target.value)
  }
  const handleFundSizeInput = (e) => {
    setFundSize(e.target.value)
  }
  const handleSavingTypeInput = (e) => {
    setType(e.target.value)
  }
  const handleInterestInput = (e) => {
    setInterest(e.target.value)
  }
  const handleMaxInterestInput = (e) => {
    setMaxInterest(e.target.value)
  }
  const handleInterestTypeInput = (e) => {
    setInterestType(e.target.value)
  }
  const handleRepayTypeInput = (e) => {
    setRepayType(e.target.value)
  }
  const handlePensionTypeInput = (e) => {
    setPensionType(e.target.value)
  }
  const handleDisconnectedInput = (e) => {
    setDisconnected(e.target.value)
  }
  const handleMbtiInput = (e) => {
    setMbti(e.target.value)
  }


  const submitFund=()=>{
    if(productName ===''){
      alert('상품명을 입력하세요.');
      return;
    }
    if(productBankName ===''){
      alert('상품 회사명을 입력하세요.');
      return;
    }
    if(link === ''){
      alert('상품 링크를 입력하세요.');
      return;
    }
    if(profit3 === ''){
      alert('3개월 수익률을 입력하세요.');
      return;
    }
    if(profit6 === ''){
      alert('6개월 수익률을 입력하세요.');
      return;
    }
    if(profit12 === ''){
      alert('1년 수익률을 입력하세요.');
      return;
    }
    if(fundSize === ''){
      alert('펀드 규모를 입력하세요.');
      return;
    }

    axios({
        method:"POST",
        url: `/insertFund`,
        data:{
          productName: productName,
          productBankName: productBankName,
          productCate: productCate,
          link: link,
          profit3: parseFloat(profit3),
          profit6: parseFloat(profit6),
          profit12: parseFloat(profit12),
          fundSize: parseInt(fundSize),
          mbti: mbti,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/financialFundList/1';
        }else{
            alert('등록 실패 입력 사항을 다시 확인해주세요.');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  const submitSaving=()=>{
    if(productName ===''){
      alert('상품명을 입력하세요.');
      return;
    }
    if(productBankName ===''){
      alert('상품 회사명을 입력하세요.');
      return;
    }
    if(link === ''){
      alert('상품 링크를 입력하세요.');
      return;
    }
    if(interest === ''){
      alert('이자율을 입력하세요.');
      return;
    }
    if(maxInterest === ''){
      alert('최고 우대금리를 입력하세요.');
      return;
    }
    axios({
      method:"POST",
      url: `/insertSaving`,
      data:{
        productName: productName,
        productBankName: productBankName,
        productCate: productCate,
        link: link,
        interest: parseFloat(interest),
        maxInterest: parseFloat(maxInterest),
        type: type,
        mbti: mbti,
      }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/financialSavingList/1';
        }else{
            alert('등록 실패 입력 사항을 다시 확인해주세요.');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  const submitLoan=()=>{
    if(productName ===''){
      alert('상품명을 입력하세요.');
      return;
    }
    if(productBankName ===''){
      alert('상품 회사명을 입력하세요.');
      return;
    }
    if(link === ''){
      alert('상품 링크를 입력하세요.');
      return;
    }
    if(interest === ''){
      alert('금리를 입력하세요.');
      return;
    }
    axios({
      method:"POST",
      url: `/insertLoan`,
      data:{
        productName: productName,
        productBankName: productBankName,
        productCate: productCate,
        link: link,
        interest: parseFloat(interest),
        interestType: interestType,
        repayType: repayType,
      }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/financialLoanList/1';
        }else{
            alert('등록 실패 입력 사항을 다시 확인해주세요.');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  const submitPension=()=>{
    if(productName ===''){
      alert('상품명을 입력하세요.');
      return;
    }
    if(productBankName ===''){
      alert('상품 회사명을 입력하세요.');
      return;
    }
    if(link === ''){
      alert('상품 링크를 입력하세요.');
      return;
    }
    if(interest === ''){
      alert('수익률을 입력하세요.');
      return;
    }
    axios({
      method:"POST",
      url: `/insertPension`,
      data:{
        productName: productName,
        productBankName: productBankName,
        productCate: productCate,
        link: link,
        interest: parseFloat(interest),
        pensionType: pensionType,
        disconnected: disconnected,
        mbti: mbti,
      }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/financialPensionList/1';
        }else{
            alert('등록 실패 입력 사항을 다시 확인해주세요.');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  if(productCate === '펀드'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상품 등록</p>
          <div className="NotificationWriteDiv">
            <div className="FinancialWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='상품명'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <input 
                className="FinancialInput"
                placeholder='상품 회사명'
                type='text'
                name='banktitle_input'
                value={productBankName}
                onChange={handleInputBankName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상품링크:&nbsp;</p>
                <input 
                className="LinkInput"
                placeholder='상품링크'
                type='text'
                name='link_input'
                value={link}
                onChange={handleInputLink}
                maxLength ={200}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상품 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={productCate}
                  >
                    <option value="펀드" selected>펀드</option>
                    <option value="적금">적금</option>
                    <option value="대출">대출</option>
                    <option value="연금">연금</option>
                  </select>
              </div>
                <div className="FinancialFundDiv">
                    <div className="FinancialFundWriteDiv">
                      <div className="FinancialRow">
                        <p>이 상품과 맞는 소비 성향&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="mbti_input"
                        onChange={handleMbtiInput}
                        value={mbti}
                        >
                          <option value="P" selected>P</option>
                          <option value="I">I</option>
                          <option value="H">H</option>
                          <option value="C">C</option>
                          <option value="O">O</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="E">E</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                        <p>3개월 수익률:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='profit3_input'
                        onChange={handleProfit3Input}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                      <div className="FinancialRow">
                        <p>6개월 수익률:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='profit6_input'
                        onChange={handleProfit6Input}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                      <div className="FinancialRow">
                        <p>1년 수익률:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='profit12_input'
                        onChange={handleProfit12Input}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                      <div className="FinancialRow">
                        <p>펀드 규모:&nbsp;</p>
                        <input 
                        className="FinancialFundSizeInput"
                        placeholder='정수'
                        type='text'
                        name='fundSize_input'
                        onChange={handleFundSizeInput}
                        maxLength ={6}
                        ></input>
                        <p>억</p>
                      </div>
                  </div>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitFund}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
  }else if(productCate === '적금'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상품 등록</p>
          <div className="NotificationWriteDiv">
            <div className="FinancialWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='상품명'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <input 
                className="FinancialInput"
                placeholder='상품 회사명'
                type='text'
                name='banktitle_input'
                value={productBankName}
                onChange={handleInputBankName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상품링크:&nbsp;</p>
                <input 
                className="LinkInput"
                placeholder='상품링크'
                type='text'
                name='link_input'
                value={link}
                onChange={handleInputLink}
                maxLength ={200}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상품 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={productCate}
                  >
                    <option value="펀드" selected>펀드</option>
                    <option value="적금">적금</option>
                    <option value="대출">대출</option>
                    <option value="연금">연금</option>
                  </select>
              </div>
                <div className="FinancialFundDiv">
                    <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                        <p>이 상품과 맞는 소비 성향&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="mbti_input"
                        onChange={handleMbtiInput}
                        value={mbti}
                        >
                          <option value="P" selected>P</option>
                          <option value="I">I</option>
                          <option value="H">H</option>
                          <option value="C">C</option>
                          <option value="O">O</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="E">E</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                        <p>방식&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="type_input"
                        onChange={handleSavingTypeInput}
                        value={type}
                        >
                          <option value="정액적립식" selected>정액적립식</option>
                          <option value="자유적립식">자유적립식</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                        <p>이자율:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='interest_Saving_input'
                        onChange={handleInterestInput}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                      <div className="FinancialRow">
                        <p>최고 우대금리:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='maxInterest_Saving_input'
                        onChange={handleMaxInterestInput}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                    </div>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitSaving}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
  }else if(productCate === '대출'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상품 등록</p>
          <div className="NotificationWriteDiv">
            <div className="FinancialWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='상품명'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <input 
                className="FinancialInput"
                placeholder='상품 회사명'
                type='text'
                name='banktitle_input'
                value={productBankName}
                onChange={handleInputBankName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상품링크:&nbsp;</p>
                <input 
                className="LinkInput"
                placeholder='상품링크'
                type='text'
                name='link_input'
                value={link}
                onChange={handleInputLink}
                maxLength ={200}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상품 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={productCate}
                  >
                    <option value="펀드" selected>펀드</option>
                    <option value="적금">적금</option>
                    <option value="대출">대출</option>
                    <option value="연금">연금</option>
                  </select>
              </div>
              <div className="FinancialFundDiv">
                    <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                      <p>금리 방식&nbsp;</p>
                      <select 
                      className="SavingTypeInput" 
                      name="interestType_input"
                      onChange={handleInterestTypeInput}
                      value={interestType}
                      >
                        <option value="변동금리" selected>변동금리</option>
                        <option value="고정금리">고정금리</option>
                        <option value="대출금리">대출금리</option>
                      </select>
                    </div>
                    <div className="FinancialRow">
                      <p>상환 방식&nbsp;</p>
                      <select 
                      className="SavingTypeInput" 
                      name="repayType_input"
                      onChange={handleRepayTypeInput}
                      value={repayType}
                      >
                        <option value="원리금분할상환" selected>원리금분할상환</option>
                        <option value="원금균등상환">원금균등상환</option>
                        <option value="만기일시상환">만기일시상환</option>
                        <option value="">없음</option>
                      </select>
                    </div>
                    <div className="FinancialRow">
                        <p>금리:&nbsp;</p>
                        <input 
                        className="FinancialFundProfitInput"
                        placeholder='실수'
                        type='text'
                        name='interest_Loan_input'
                        onChange={handleInterestInput}
                        maxLength ={6}
                        ></input>
                        <p>%</p>
                      </div>
                </div>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitLoan}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
  }else if(productCate === '연금'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상품 등록</p>
          <div className="NotificationWriteDiv">
            <div className="FinancialWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='상품명'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <input 
                className="FinancialInput"
                placeholder='상품 회사명'
                type='text'
                name='banktitle_input'
                value={productBankName}
                onChange={handleInputBankName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상품링크:&nbsp;</p>
                <input 
                className="LinkInput"
                placeholder='상품링크'
                type='text'
                name='link_input'
                value={link}
                onChange={handleInputLink}
                maxLength ={200}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상품 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={productCate}
                  >
                    <option value="펀드" selected>펀드</option>
                    <option value="적금">적금</option>
                    <option value="대출">대출</option>
                    <option value="연금">연금</option>
                  </select>
              </div>
              <div className="FinancialFundDiv">
                    <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                        <p>이 상품과 맞는 소비 성향&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="mbti_input"
                        onChange={handleMbtiInput}
                        value={mbti}
                        >
                          <option value="P" selected>P</option>
                          <option value="I">I</option>
                          <option value="H">H</option>
                          <option value="C">C</option>
                          <option value="O">O</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="E">E</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                        <p>유형&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="pensionType_input"
                        onChange={handlePensionTypeInput}
                        value={pensionType}
                        >
                          <option value="안정형" selected>안정형</option>
                          <option value="채권형">채권형</option>
                          <option value="금리연동형">금리연동형</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                        <p>중도해지 가능여부&nbsp;</p>
                        <select 
                        className="SavingTypeInput" 
                        name="disconnected_input"
                        onChange={handleDisconnectedInput}
                        value={disconnected}
                        >
                          <option value="가능" selected>가능</option>
                          <option value="불가능">불가능</option>
                        </select>
                      </div>
                      <div className="FinancialRow">
                          <p>수익률:&nbsp;</p>
                          <input 
                          className="FinancialFundProfitInput"
                          placeholder='실수'
                          type='text'
                          name='interest_Pension_input'
                          onChange={handleInterestInput}
                          maxLength ={6}
                          ></input>
                          <p>%</p>
                      </div>
                  </div>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitPension}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default FinancialItemWrite;
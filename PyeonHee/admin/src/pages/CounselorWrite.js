import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function CounselorWrite(props) {
  const [name, setName] = useState('');
  const [counselorCate, setCounselorCate] = useState('금융상품');
  const [company, setCompany] = useState('');

  //금융상품
  const [field, setField] = useState('');

  const adminID = sessionStorage.getItem('userID');

  const handleInputName = (e) => {
    setName(e.target.value)
  }
  const handleInputCate = (e) => {
    setCounselorCate(e.target.value)
  }
  const handleInputCompany = (e) => {
    setCompany(e.target.value)
  }
  const handleInputField = (e) => {
    setField(e.target.value)
  }


  const submitFinancialItem=()=>{
    if(name ===''){
      alert('이름을 입력하세요.');
      return;
    }
    if(company === ''){
      alert('소속회사를 입력하세요.');
      return;
    }
    axios({
        method:"POST",
        url: `/inputCounselorInFinancial`,
        data:{
          name: name,
          company: company,
          counselorCate: counselorCate,
          field: field,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/';
        }else{
            alert('등록 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  const submitAsset=()=>{
    if(name ===''){
      alert('이름을 입력하세요.');
      return;
    }
    if(company === ''){
      alert('소속회사를 입력하세요.');
      return;
    }
    axios({
      method:"POST",
      url: `/inputCounselorInAsset`,
      data:{
        name: name,
        company: company,
        counselorCate: counselorCate,
      }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/';
        }else{
            alert('등록 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }
if(counselorCate === '금융상품'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상담사 등록</p>
          <div className="NotificationWriteDiv">
            <div className="CounselorWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상담사 이름:&nbsp;</p>
                <input 
                className="CounselorTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={name}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상담사 소속회사:&nbsp;</p>
                <input 
                className="counselorCompanyInput"
                placeholder='상담사 소속회사'
                type='text'
                name='company_input'
                value={company}
                onChange={handleInputCompany}
                maxLength ={30}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상담 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={counselorCate}
                  >
                    <option value="금융상품" selected>금융상품</option>
                    <option value="자산관리">자산관리</option>
                  </select>
              </div>
              <div className="CounselorContentDiv">
                <div className="FinancialRow">
                  <p>상담분야&nbsp;</p>
                  <select 
                  className="SavingTypeInput" 
                  name="disconnected_input"
                  onChange={handleInputField}
                  value={field}
                  >
                    <option value="펀드" selected>펀드</option>
                    <option value="적금">적금</option>
                    <option value="연금">연금</option>
                    <option value="대출">대출</option>
                  </select>
                </div>
              </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitFinancialItem}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
}else if(counselorCate === '자산관리'){
    return (
         <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상담사 등록</p>
          <div className="NotificationWriteDiv">
            <div className="CounselorWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상담사 이름:&nbsp;</p>
                <input 
                className="CounselorTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={name}
                onChange={handleInputName}
                maxLength ={50}
                ></input>
              </div>
              <div className="LinkDiv">
                <p className="LinkFont">상담사 소속회사:&nbsp;</p>
                <input 
                className="counselorCompanyInput"
                placeholder='상담사 소속회사'
                type='text'
                name='company_input'
                value={company}
                onChange={handleInputCompany}
                maxLength ={30}
                ></input>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">상담 분류</p>
                  <select 
                  className="BoardCateInput" 
                  name="cate_input"
                  onChange={handleInputCate}
                  value={counselorCate}
                  >
                    <option value="금융상품" selected>금융상품</option>
                    <option value="자산관리">자산관리</option>
                  </select>
              </div>
              <div className="CounselorContentDiv">
              </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button' onClick={submitAsset}>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
}

}

export default CounselorWrite;
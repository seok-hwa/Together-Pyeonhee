import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function FinancialItemWrite(props) {
  const [productName, setProductName] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [productCate, setProductCate] = useState('펀드');

  const adminID = sessionStorage.getItem('userID');

  const handleInputName = (e) => {
    setProductName(e.target.value)
  }
  const handleInputContent = (e) => {
    setBoardContent(e.target.value)
  }
  const handleInputCate = (e) => {
    setProductCate(e.target.value)
  }
/*
  const submit=()=>{
    if(boardTitle ===''){
      alert('제목을 입력하세요.');
      return;
    }
    if(boardContent === ''){
      alert('내용을 입력하세요.');
    }
    console.log('제목:',boardTitle, '내용:',boardContent, '분류:', boardCate);
    
    axios({
        method:"POST",
        url: `/notificationWrite`,
        data:{
          boardTitle: boardTitle,
          boardContent: boardContent,
          boardCate: boardCate,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('등록 성공');
            document.location.href = '/notification';
        }else{
            alert('등록 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }*/

  if(productCate === '펀드'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상품 등록</p>
          <div className="NotificationWriteDiv">
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
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
                  <div className="NotificationBoardOuterContentDiv">
                    <p>펀드</p>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button'>등록</button>
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
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
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
                  <div className="NotificationBoardOuterContentDiv">
                    <p>적금</p>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button'>등록</button>
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
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
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
                  <div className="NotificationBoardOuterContentDiv">
                    <p>대출</p>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button'>등록</button>
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
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={productName}
                onChange={handleInputName}
                maxLength ={50}
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
                  <div className="NotificationBoardOuterContentDiv">
                    <p>연금</p>
                </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button'>등록</button>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default FinancialItemWrite;
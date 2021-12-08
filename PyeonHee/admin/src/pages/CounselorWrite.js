import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function CounselorWrite(props) {
  const [name, setName] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [counselorCate, setCounselorCate] = useState('금융상품');

  const adminID = sessionStorage.getItem('userID');

  const handleInputName = (e) => {
    setName(e.target.value)
  }
  const handleInputContent = (e) => {
    setBoardContent(e.target.value)
  }
  const handleInputCate = (e) => {
    setCounselorCate(e.target.value)
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
  }
*/
if(counselorCate === '금융상품'){
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">상담사 등록</p>
          <div className="NotificationWriteDiv">
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">이름:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={name}
                onChange={handleInputName}
                maxLength ={50}
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
              <div className="NotificationBoardOuterContentDiv">
                <p>금융상품</p>
              </div>
              <div className="NotificationBoardButtonDiv">
                <button className="NotificationUpdateButton" type='button'>등록</button>
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
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">상담사 이름:&nbsp;</p>
                <input 
                className="BoardTitleInput"
                placeholder='제목'
                type='text'
                name='title_input'
                value={name}
                onChange={handleInputName}
                maxLength ={50}
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
              <div className="NotificationBoardOuterContentDiv">
                <p>자산관리</p>
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

export default CounselorWrite;
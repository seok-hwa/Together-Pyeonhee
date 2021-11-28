import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationWrite(props) {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardCate, setBoardCate] = useState('티어');

  const adminID = sessionStorage.getItem('userID');

  const handleInputTitle = (e) => {
    setBoardTitle(e.target.value)
  }
  const handleInputContent = (e) => {
    setBoardContent(e.target.value)
  }
  const handleInputCate = (e) => {
    setBoardCate(e.target.value)
  }

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
        throw new Error(error);
    });
    /*
    //for test
    alert('등록 성공');
    document.location.href = '/notification';
    */
  }

  return (
    <div className="NotificationBoardDiv">
      <p className="NotificationTitleText">공지글 작성</p>
      <div className="NotificationWriteDiv">
        <div className="NotificationWriteBodyDiv">
          <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">제목:&nbsp;</p>
            <input 
            className="BoardTitleInput"
            placeholder='제목'
            type='text'
            name='title_input'
            value={boardTitle}
            onChange={handleInputTitle}
            maxLength ={50}
            ></input>
          </div>
          <div className="BoardCateInputDiv">
              <p className="NotificationBoardCateFont">분류</p>
              <select 
              className="BoardCateInput" 
              name="cate_input"
              onChange={handleInputCate}
              >
                <option value="티어" selected>티어</option>
                <option value="포인트">포인트</option>
                <option value="금융상담">상담</option>
                <option value="금융상품">금융상품</option>
                <option value="오류">오류</option>
                <option value="기타">기타</option>
              </select>
          </div>
          <div className="NotificationBoardOuterContentDiv">
              <textarea 
              className="BoardContentInput"
              placeholder='내용'
              name='content_input'
              value={boardContent}
              onChange={handleInputContent}
              maxLength ={1024}
              ></textarea>
          </div>
          <div className="NotificationBoardButtonDiv">
            <button className="NotificationUpdateButton" type='button' onClick={submit}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationWrite;
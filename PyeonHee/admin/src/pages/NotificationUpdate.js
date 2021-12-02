import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationUpdate({ match }) {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardCate, setBoardCate] = useState('');
  const [loading,setLoading] = useState(false);

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
  useEffect(() => {
    axios({
        method:"POST",
        url: `/notificationBoardInfo`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        console.log(res.data[0]);
        setBoardTitle(res.data[0].title);
        setBoardContent(res.data[0].content);
        setBoardCate(res.data[0].category);
    })
    .then(()=>{
        setLoading(true);
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

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
        url: `/notificationBoardUpdate`,
        data:{
          boardID: match.params.boardID,
          boardTitle: boardTitle,
          boardContent: boardContent,
          boardCate: boardCate,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('수정 성공');
            document.location.href = '/notification/1';
        }else{
            alert('수정 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  if(loading === true){
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
            <button className="NotificationUpdateButton" type='button' onClick={submit}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
  }
  else{
    return (
        <div className="NotificationBoardDiv">
          <p className="NotificationTitleText">공지글 작성</p>
          <div className="NotificationWriteDiv">
            <div className="NotificationWriteBodyDiv">
              <div className="BoardWriteTitleDiv">
                <p className="NotificationBoardTitleFont">제목:&nbsp;</p>
              </div>
              <div className="BoardCateInputDiv">
                  <p className="NotificationBoardCateFont">분류</p>
              </div>
              <div className="NotificationBoardOuterContentDiv">
              </div>
              <div className="NotificationBoardButtonDiv">
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default NotificationUpdate;
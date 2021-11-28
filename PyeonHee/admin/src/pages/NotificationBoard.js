import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationBoard({ match }) {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardDate, setBoardDate] = useState('');
  const [boardUpdateDate, setBoardUpdateDate] = useState('');
  const [boardCate, setBoardCate] = useState('티어');
  
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
        setBoardDate(res.data[0].notice_date);
        setBoardUpdateDate(res.data[0].modified_date);
        setBoardCate(res.data[0].category);
    }).catch(error=>{
        console.log(error);
    });
  },[])
  
  const deleteNotificationBoard=()=>{
    axios({
        method:"POST",
        url: `/notificationDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/notification';
        }else{
            alert('삭제 실패');
        }
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
    /*
    //for test
    alert('로그인 성공');
    sessionStorage.setItem('userID', userID);
    document.location.href = '/';
    */
  }
  return (
    <div className="NotificationBoardDiv">
      <p className="NotificationTitleText">공지사항 확인</p>
      <div className="NotificationBodyDiv">
        <div className="NotificationBoardTitleDiv">
          <p className="NotificationBoardTitleFont">제목:&nbsp;</p>
          <p className="NotificationBoardTitleFont">{boardTitle}</p>
        </div>
        <div className="NotificationBoardDateDiv">
            {boardDate === boardUpdateDate ? 
              <div className="NotificationBoardInnerDateDiv">
              <p className="NotificationBoardDateFont">작성일: {boardDate.substring(0,16).replace('T', ' ')}</p>
              <p className="NotificationBoardDateFont">분류: {boardCate}</p>
              </div>
              :
              <div className="NotificationBoardInnerDateDiv">
              <p className="NotificationBoardDateFont">작성일: {boardDate.substring(0,16).replace('T', ' ')}</p>
              <p className="NotificationBoardDateFont">수정일: {boardUpdateDate.substring(0,16).replace('T', ' ')}</p>
              <p className="NotificationBoardDateFont">분류: {boardCate}</p>
              </div>
            }
        </div>
        <div className="NotificationBoardOuterContentDiv">
          <div className="NotificationBoardInnerContentDiv">
            <p className="NotificationBoardContentFont">{boardContent}</p>
          </div>
        </div>
        <div className="NotificationBoardButtonDiv">
          <button className="NotificationUpdateButton" type='button' onClick={()=>{window.location.href=`/notificationUpdate/${match.params.boardID}`}}>수정</button>
          <button className="NotificationDeleteButton" type='button' onClick={deleteNotificationBoard}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationBoard;
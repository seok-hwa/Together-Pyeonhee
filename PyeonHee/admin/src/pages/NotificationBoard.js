import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function NotificationBoard({ match }) {
  const [boardTitle, setBoardTitle] = useState('안녕하세요');
  const [boardContent, setBoardContent] = useState('모두들 반갑습니다.');
  const [boardDate, setBoardDate] = useState('2021-11-27');
  const [boardCate, setBoardCate] = useState('티어');
  /*
  useEffect(() => {
    axios({
      method:"POST",
      url: `/notificationBoard`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data);
        setBoardTitle(res.data.boardTitle);
        setBoardContent(res.data.boardContent);
        setBoardDate(res.data.boardDate);
        setBoardCate(res.data.boardCate);
    }).catch(error=>{
        console.log(error);
    });
  },[])*/
  return (
    <div className="NotificationBoardDiv">
      <p className="NotificationTitleText">공지사항 확인</p>
      <div className="NotificationBodyDiv">
        <div className="NotificationBoardTitleDiv">
          <p className="NotificationBoardTitleFont">제목:&nbsp;</p>
          <p className="NotificationBoardTitleFont">{boardTitle}</p>
        </div>
        <div className="NotificationBoardDateDiv">
          <p className="NotificationBoardDateFont">작성일: {boardDate}</p>
        </div>
        <div className="NotificationBoardOuterContentDiv">
          <div className="NotificationBoardInnerContentDiv">
            <p className="NotificationBoardContentFont">{boardContent}</p>
          </div>
        </div>
        <div className="NotificationBoardButtonDiv">
          <button className="NotificationUpdateButton" type='button' >수정</button>
          <button className="NotificationDeleteButton" type='button' >삭제</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationBoard;
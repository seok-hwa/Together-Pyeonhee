import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function QueryUpdate({ match }) {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [boardDate, setBoardDate] = useState('');
  const [boardCate, setBoardCate] = useState('티어');
  const [answer, setAnswer] = useState(false);

  const [replyContent, setReplyContent] = useState('');
  const [replyDate, setReplyDate] = useState('');

  const handleInputContent = (e) => {
    setReplyContent(e.target.value)
  }

  const updateSubmit=()=>{
    if(replyContent === ''){
        alert('내용을 입력하세요.');
        return;
      }
      axios({
          method:"POST",
          url: `/replyUpdate`,
          data:{
            replyContent: replyContent,
            boardID: match.params.boardID,
          }
      })
      .then((res)=>{
          if(res.data.status === 'success'){
              alert('수정 성공');
              document.location.href = `/queryBoard/${match.params.boardID}`;
          }else{
              alert('수정 실패');
          }
      }).catch(error=>{
          console.log(error);
      });
  }

  useEffect(() => {
    console.log('이거 확인', match.params.boardID);
    let tempAnswer;
    axios({
      method:"POST",
      url: `/queryBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data[0]);
        setBoardTitle(res.data[0].title);
        setBoardContent(res.data[0].content);
        setBoardDate(res.data[0].notice_date);
        setBoardCate(res.data[0].category);
        if(res.data[0].comment_check===1){
          setAnswer(true);
        }
        tempAnswer = res.data[0].comment_check;
    })
    .then(()=>{
        if(tempAnswer=== 1){
          axios({
            method:"POST",
            url: `/queryReplyBoardInfo`,
            data:{
                boardID: match.params.boardID,
            }
          })
          .then((res)=>{
            console.log(res.data[0]);
            setReplyContent(res.data.answerContent);
            setReplyDate(res.data.answerDate);
          })
        }
    })
    .catch(error=>{
        console.log(error);
    });
  },[])

    return (
      <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">문의게시판</p>
        <div className="QueryBoardBodyDiv">
          <div className="NotificationBoardTitleDiv">
            <p className="NotificationBoardTitleFont">제목:&nbsp;</p>
            <p className="NotificationBoardTitleFont">{boardTitle}</p>
          </div>
          <div className="NotificationBoardDateDiv">
            <div className="NotificationBoardInnerDateDiv">
            <p className="NotificationBoardDateFont">작성일: {boardDate}</p>
            <p className="NotificationBoardDateFont">분류: {boardCate}</p>
            </div>
          </div>
          <div className="NotificationBoardOuterContentDiv">
            <div className="NotificationBoardInnerContentDiv">
              <p className="NotificationBoardContentFont">{boardContent}</p>
            </div>
          </div>
          <div className="QueryBoardReplyDiv">
            <div className="QueryBoardReplyTitleDiv">
              <p>답변</p>
            </div>
            <textarea 
            className="QueryContentInput"
            placeholder='내용'
            name='content_input'
            maxLength ={1024}
            value={replyContent}
            onChange={handleInputContent}
            ></textarea>
            <button className="NotificationUpdateButton" onClick={updateSubmit}>수정</button>
          </div>
        </div>
      </div>
    );
}

export default QueryUpdate;
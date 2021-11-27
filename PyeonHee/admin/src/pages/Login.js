import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function Login(props) {
    const [userID, setUserID] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleInputId = (e) => {
        setUserID(e.target.value)
    }
    const handleInputPw = (e) => {
        setUserPassword(e.target.value)
    }
    const submit=()=>{
        console.log('아이디:',userID, '패스워드:',userPassword);
        
        axios({
            method:"POST",
            url: `/adminLogin`,
            data:{
                userID: userID,
                userPassword: userPassword,
            }
        })
        .then((res)=>{
            if(res.data.status === 'success'){
                alert('로그인 성공');
                sessionStorage.setItem('userID', userID);
                document.location.href = '/';
            }else{
                alert('로그인 실패');
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
    <div className="LoginDiv">
        <div className="LoginTitleDiv">
            <p className="LoginTitleFont">관리자 로그인</p>
        </div>
        <div className="LoginBody">
            <div className="IDDiv">
                <p className="IDPasswordTitleFont">아이디</p>
                <input 
                className="IDInput"
                placeholder='아이디'
                type='text'
                name='id_input'
                value={userID}
                onChange={handleInputId}
                maxLength ={20}
                ></input>
            </div>
            <div className="PasswordDiv">
            <p className="IDPasswordTitleFont">비밀번호</p>
                <input 
                className="PasswordInput"
                type='password'
                placeholder='비밀번호'
                name='password_input'
                value={userPassword}
                onChange={handleInputPw} 
                maxLength ={20}
                ></input>
            </div>
        </div>
        <div className="LoginBottom">
            <button className="LoginButton" type='button' onClick={submit}>로그인</button>
        </div>
    </div>
  );
}

export default Login;
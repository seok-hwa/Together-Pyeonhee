import logo from './logo.svg';
import './App.css';

function Login() {
  return (
    <div className="LoginDiv">
        <div className="LoginTitleDiv">
            <p className="LoginTitleFont">관리자 로그인</p>
        </div>
        <div className="LoginBody">
            <div className="IDDiv">
                <p className="IDPasswordTitleFont">아이디</p>
                <input className="IDInput"></input>
            </div>
            <div className="PasswordDiv">
            <p className="IDPasswordTitleFont">비밀번호</p>
                <input className="PasswordInput"></input>
            </div>
        </div>
        <div className="LoginBottom">
            <button className="LoginButton">로그인</button>
        </div>
    </div>
  );
}

export default Login;
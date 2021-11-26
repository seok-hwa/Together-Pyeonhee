import logo from './logo.svg';
import './App.css';

function Header() {
  return (
    <div className="Header">
        <p className="HeaderText">
          편히가계 관리자 웹사이트
        </p>
        <div className="HeaderRouter">
            <p className="HeaderLink">로그인</p>
            <p className="HeaderLink">고객센터</p>
            <p className="HeaderLink">공지사항</p>
        </div>
    </div>
  );
}

export default Header;
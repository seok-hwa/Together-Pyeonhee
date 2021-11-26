import '../App.css';
import { Link } from "react-router-dom";

function HeaderInLogin() {
  return (
    <div className="Header">
        <p className="HeaderText">
          편히가계 관리자 웹사이트
        </p>
        <div className="HeaderRouter">
            <Link to="/logout">
            <p className="HeaderLink">로그아웃</p>
            </Link>
            <Link to="/main">
            <p className="HeaderLink">고객센터</p>
            </Link>
            <Link to="/service">
            <p className="HeaderLink">공지사항</p>
            </Link>
        </div>
    </div>
  );
}

export default HeaderInLogin;
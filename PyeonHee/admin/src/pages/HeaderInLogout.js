import '../App.css';
import { Link } from "react-router-dom";

function HeaderInLogount() {
  return (
    <div className="Header">
        <p className="HeaderText">
          편히가계 관리자 웹사이트
        </p>
        <div className="HeaderRouter">
            <Link to="/">
            <p className="HeaderLink">로그인</p>
            </Link>
        </div>
    </div>
  );
}

export default HeaderInLogount;
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
    <li>
        <Link to="/test" style={{ marginRight: 10 }}>
            test
        </Link>
      </li>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          로그인/회원가입하기
        </Link>
      </li>
      
    </ul>
  </nav>
);
export default Navigation;
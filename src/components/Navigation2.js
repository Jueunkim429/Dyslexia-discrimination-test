import React from "react";
import { Link } from "react-router-dom";

const Navigation2 = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
    <li>
        <Link to="/qna" style={{ marginRight: 10 }}>
          QnA 질문하기
        </Link>
      </li>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{ marginRight: 10 }}
        >
          <span>
            {userObj.displayName
              ? `${userObj.displayName}님의 Mypage`
              : "Mypage"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation2;
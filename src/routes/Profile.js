import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import Myqna from "components/Myqna";
import MyCommnet from "components/Mycommet";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  // 모든 qna 불러오기
  const [qnalist, setQnalist] = useState([]);
  useEffect(() => {
    dbService.collection("qna").onSnapshot((snapshot) => {
      const listArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQnalist(listArray);
    });
  }, []);
 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="닉네임"
          value={newDisplayName}
        />
        <input
          type="submit"
          value="변경"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <br></br>
      <div>
        <div className="profile_box">
          <p><b>내가 쓴 글</b></p>
          <div>
          {qnalist.map((list) => {
            if (list.creatorId === userObj.uid)
              return (
                <Myqna
                  key={list.id}
                  qnaObj={list}
                  creatorId={list.creatorId}
                />
              );
          })}
          </div>
        </div>

        <div className="profile_box">
          <p><b>내가 답변한 글</b></p>
          <div>
          {qnalist.map((list) => {
              return (
                <MyCommnet
                qnaObj={list}
                  userObj={ userObj}
                />
              );
          })}
          </div>
        </div>

      </div>

      <button onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};
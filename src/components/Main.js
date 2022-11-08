import React, { useState } from "react";
import { NavLink, useHistory, useNavigate } from "react-router-dom";
import { dbService, storageService } from "fbase";

const Main = ({ qnaObj, isOwner}) => {
  let history = useHistory();
  const [editing, setEditing] = useState(false);
  const [newQna, setNewQna] = useState(qnaObj.text);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`qna/${qnaObj.id}`).update({
      text: newQna,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewQna(value);
  };
  const onQnaClick= () => {
    history.push({
      pathname: `/qna/${qnaObj.id}`,
      state: { qnaObj: qnaObj,
     isOwner:isOwner}
    });
  };
  return (
    <div>
        <>
        <div onClick={onQnaClick}>
          <h4>{qnaObj.title}</h4>
          <p>{qnaObj.text.length > 20 ? `${qnaObj.text.slice(0, 20)}...` : qnaObj.text}</p>
          <hr></hr>
        </div>
        </>
    </div>
  );
};

export default Main;
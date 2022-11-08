import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { useHistory } from "react-router-dom";

const MyComment = ({ qnaObj, userObj }) => {
  let history = useHistory();

  const [mycom, setMycom] = useState([]);
  useEffect(() => {
    dbService
      .doc(`qna/${qnaObj.id}`)
      .collection("comments")
      .onSnapshot((snapshot) => {
        const checkArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMycom(checkArray);
      });
  }, []);

  const [bucket, setBucket] = useState(false);
  useEffect(() =>{
    for(var x=0; x<mycom.length; x++){
        if (mycom[x].creatorId === userObj.uid) {
              setBucket(!bucket);
        } 
    }
}, [mycom.length]);

  const onClick = () => {
    history.push({
        pathname: `/qna/${qnaObj.id}`,
        replace:false,
        state: { qnaObj: qnaObj }
      });
  };

  return (
    <>
      <div className="mycommet_box">
        {bucket ? (
          <div onClick={onClick}>
          {qnaObj.title}
      </div>
        ) : (
            <></>
        )}
      </div>
    </>
  );
};

export default MyComment;
import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import Main from "components/Main";


const Home = ({ userObj }) => {
  const [qnas, setQnas] = useState([]);
  useEffect(() => {
    dbService.collection("qna").onSnapshot((snapshot) => {
      const qnaArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQnas(qnaArray);
    });
  }, []);
  return (
    <div>

      <div style={{ marginTop: 30 }}>
        {qnas.map((qna) => (
          <Main
            key={qna.id}
            qnaObj={qna}
            isOwner={qna.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
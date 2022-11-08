import Comment from "components/Comment";
import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";


const Detaillist = ({ userObj }) => {
    //qnaObj 가지고 오기
    const location = useLocation();
    const qnaObj = location.state.qnaObj;
    //isOwner 가지고 오기
    const isOwner= location.state.isOwner;
    const history = useHistory();

    //삭제
    const [comobjlists, setComobjlists] = useState([]);
  useEffect(() => {
    dbService
      .collection("qna")
      .doc(`${qnaObj.id}`)
      .collection("comments")
      .onSnapshot((snapshot) => {
        const listArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComobjlists(listArray);
      });
  }, []);
    const onDeleteClick = async () => {
      async function deleteCollection(dbService, collectionPath) {
        const collectionRef = dbService.collection(collectionPath);
        const query = collectionRef;

        //debugger
        return new Promise((resolve, reject) => {
          deleteQueryBatch(dbService, query, resolve).catch(reject);
        });
      }

      async function deleteQueryBatch(dbService, query, resolve) {
        const snapshot = await query.get();

        const batchSize = snapshot.size;
        if (batchSize === 0) {
          // When there are no documents left, we are done
          resolve();
          return;
        }

        // Delete documents in a batch
        const batch = dbService.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        /*
        process.nextTick(() => {
          deleteQueryBatch(dbService, query, resolve);
        });
        */
      }

      for (let i = 0; i < comobjlists.length; i++) {
        deleteCollection(
          dbService,
          `qna/${qnaObj.id}/comments/${comobjlists[i].id}/comments2`
        );
        await dbService.doc(`qna/${qnaObj.id}/comments/${comobjlists[i].id}`).delete();
      }

      deleteCollection(dbService, `qna/${qnaObj.id}/comments`);
      await dbService.doc(`qna/${qnaObj.id}`).delete();
        //뒤로 가기
        history.push("/");
      };

    return(
        <div>
        제목 : <b>{qnaObj.title}</b>
        <p>{qnaObj.userName}님</p>
        <div className="enter_space">{qnaObj.text}</div>
        {qnaObj.attachmentUrl && <img src={qnaObj.attachmentUrl} />}
        {isOwner && (
            <div >
              <button onClick={onDeleteClick}>
                삭제
              </button></div>)}
       
        <hr></hr>
        <div className="comment_box">
        <Comment          
        userObj={userObj}
          qnaObj={qnaObj}
        />
        </div>
        </div>
    );
};
export default Detaillist;
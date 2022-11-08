import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Comment2 from "./Comment2";

export default function ComItem({commentObj, isOwner,qnaObj,userObj}) {
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
    process.nextTick(() => {
      deleteQueryBatch(dbService, query, resolve);
    });
  }
  deleteCollection(dbService, `qna/${qnaObj.id}/comments/${commentObj.id}/comments2`)
  await dbService
    .doc(`qna/${qnaObj.id}`)
    .collection("comments")
    .doc(`${commentObj.id}`)
    .delete();

  };

  return (
    <div >
      <div>
        <p>{commentObj.userName}</p>
        <label className="enter_space">
          {commentObj.text} 
        </label>
        <>
        </>
        {isOwner?<button onClick={onDeleteClick}>
            삭제
        </button>: <p></p> }
        
        <br></br>
        <div className="comment2_box">
          <Comment2          
          userObj={userObj}
            qnaObj={qnaObj}
            commentObj={commentObj}
          />
          
        </div>
        <hr></hr>
      </div>


      <div>
        
      </div>
    </div>
);
};
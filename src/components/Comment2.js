import { dbService } from "fbase";
import { useEffect, useState } from "react";
import ComItem2 from "./ComItem2";


const Comment2= ({ userObj,qnaObj,commentObj }) => {
    const [comment2, setComment2] = useState("");
    const [comments2, setComments2] = useState([]);

    useEffect(() => {
        dbService.doc(`qna/${qnaObj.id}`).collection("comments").doc(`${commentObj.id}`).collection("comments2").onSnapshot((snapshot) => {
          const commentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments2(commentArray);
        });
    }, []);
  
      const onSubmitComment = async (event) => {
          event.preventDefault();
          await dbService.doc(`qna/${qnaObj.id}`).collection("comments").doc(`${commentObj.id}`).collection("comments2").add({
            text: comment2,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName:userObj.displayName,
          });
          setComment2("");
      }

    const onChangeComment = (event) => {
        const {
          target: { value },
        } = event;
        setComment2(value);
    };
      
    return (
          <div>
            <div >
              <form onSubmit={onSubmitComment}>
                  <textarea
                  className="comment_textarea"
                    type="text"
                    placeholder="댓글을 달아주세요."
                    value={comment2}
                    onChange={onChangeComment}
                  />
        
                  <button type="submit">
                  댓글달기
                  </button>
              </form>

              <>
                {comments2.map((comment2) => (
                  <ComItem2
                    key={comment2.id}
                    comment2Obj={comment2}
                    commentObj={commentObj}
                    isOwner={comment2.creatorId === userObj.uid}
                    qnaObj={qnaObj}
                  />
                ))}
              </>
              
            </div>

            <div>
            
          
            </div>
          </div>
  );
};
export default Comment2;
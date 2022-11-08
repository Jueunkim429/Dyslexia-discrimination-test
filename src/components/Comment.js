import { dbService } from "fbase";
import { useEffect, useState } from "react";
import ComItem from './ComItem';


const Comment= ({ userObj,qnaObj }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
      dbService.doc(`qna/${qnaObj.id}`).collection("comments").onSnapshot((snapshot) => {
          const commentArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentArray);
        });
    }, []);
  
      const onSubmitComment = async (event) => {
          event.preventDefault();
          await dbService.doc(`qna/${qnaObj.id}`).collection("comments").add({
            text: comment,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            userName:userObj.displayName,
          });
          setComment("");
      }

    const onChangeComment = (event) => {
        const {
          target: { value },
        } = event;
        setComment(value);
    };
      
    return (
          <div>
            <div >
              <form onSubmit={onSubmitComment}>
                  <textarea
                  className="comment_textarea"
                    placeholder="답변을 달아주세요."
                    value={comment}
                    onChange={onChangeComment}
                  />
        
                  <button type="submit">
                  답변달기
                  </button>
              </form>

              <>
                {comments.map((comment) => (
                  <ComItem
                    key={comment.id}
                    commentObj={comment}
                    isOwner={comment.creatorId === userObj.uid}
                    qnaObj={qnaObj}
                    userObj={userObj}
                  />
                ))}
              </>
              
            </div>

            <div>
            
          
            </div>
          </div>
  );
};
export default Comment;
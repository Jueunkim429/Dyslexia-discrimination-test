import { dbService } from "fbase";


export default function ComItem2({commentObj,comment2Obj, isOwner,qnaObj}) {
  const onCommentDeleteClick = async (event) => {
    event.preventDefault();
    await dbService.doc(`qna/${qnaObj.id}`).collection("comments").doc(`${commentObj.id}`).collection("comments2").doc(`${comment2Obj.id}`).delete();
  };

  return (
    <div >
      <div >
      <div className="enter_space">
          <p>{comment2Obj.userName}님</p>
          {comment2Obj.text} 
        </div>
        { isOwner? <button onClick={onCommentDeleteClick}>
            삭제
        </button> : <p></p>
        }
        
        <hr></hr>
      </div>


      <div>
        
      </div>
    </div>
);
};
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";

const QnA = ({ userObj }) => {
  const [qnatitle, setQnatitle] = useState("");
  const [qna, setQna] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    if (qna === "") {
      return;
    }
    else if (qnatitle === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    
    const qnaObj = {
      title: qnatitle,
      text:qna,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName:userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("qna").add(qnaObj);
    setQna("");
    setQnatitle("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setQnatitle(value);
  };
  const onChangeqna = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.id === "qna") {
      setQna(value);
    }
    
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  const onKeyUp = (event) => {
    const {
      target: { value },
    } = event;    
    var content = value;
   //  document.getElementById('countspan').html(content.length);
    document.getElementById('countspan').innerHTML = content.length;
    
    if (content.length > 2000){
      alert("최대 2000자까지 입력 가능합니다.");
    }
  }
  return (
    <form onSubmit={onSubmit} className="qna_form">
      <div>
      <img src="img/test.png"></img>
        <div>
        제목 : &nbsp;
        <input
          value={qnatitle}
          className="qna_input"
          onChange={onChange}
          type="text"
          maxLength={120}
        />
        </div>
        
        <br></br>
        <div>
        <p>내용을 입력해주세요.</p>
        <div>
        <textarea
        id="qna"
            value={qna}
            onKeyUp={onKeyUp }
            className="qna_textarea"
            onChange={onChangeqna}
            type="text"
            placeholder="최대 20000까지 입력 가능합니다."
            maxLength={2000}
          />
        </div>
          
           <div className="count"><span id="countspan">0</span>/2000</div>
        </div>
        
        
      </div>
      
      <button>
        <label htmlFor="attach-file">사진 추가하기</label>
      </button>
      
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div>
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div onClick={onClearAttachment}>
            <span>삭제</span>
          </div>
        </div>
      )}
      <input type="submit" value="질문하기" />
    </form>
  );
};
export default QnA;
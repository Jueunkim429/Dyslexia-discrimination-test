import { authService, dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import "../style.css";


function My({ refreshUser, userObj }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const [reserve, setReserve] = useState("");
  const onSubmit = async (event) => {
    if (reserve=== "") {
      return;
    }
    event.preventDefault();
    
    const reserveObj = {
      date: reserve,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      userName:userObj.displayName,
    };
    await dbService.collection("reserve").add(reserveObj);
    setReserve("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReserve(value);
  };
  
    return(
      <>
      <p>마이페이지입니다.</p>

      <div>
        <form onSubmit={onSubmit} className="qna_form">
          <div>
            <div>
              예약날짜 : &nbsp;
                <input
                  value={reserve}
                  className="qna_input"
                  onChange={onChange}
                  type="date"
                />
            </div>
            <input className="all_button" type="submit" value="예약하기" />
          </div>
        </form>

       </div>

       <button className="all_button" onClick={onLogOutClick}>
          Log Out
        </button>
      </>
        );
    }
    
    export default My;

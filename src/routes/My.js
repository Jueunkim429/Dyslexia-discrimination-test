import { authService, dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import "../style.css";
import { useEffect } from "react";
import Reserve from "components/Reserve";


function My({ refreshUser, userObj }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState("");
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const [reserve, setReserve] = useState("");
  const [reserveObj2, setReserveObj2] = useState("");
  const onSubmit = async (event) => {
    if (reserve=== "") {
      return;
    }
    event.preventDefault();
    let createdAt = Date.now()
    
    let attachmentUrl = `https://firebasestorage.googleapis.com/v0/b/dyslexia-discrimination-test.appspot.com/o/image%2F${createdAt}%2Fimg.png?alt=media`;
    //let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${createdAt}/img`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    let testtext ="아직 없음"
    const reserveObj = {
      date: reserve,
      createdAt: createdAt,
      creatorId: userObj.uid,
      userName:userObj.displayName,
      test : testtext,
      attachmentUrl,
    };
    await dbService.collection("reserve").add(reserveObj);
    setReserve("");
    setAttachment("");
    setReserveObj2(reserveObj.creatorId);
  };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setReserve(value);

  };

  const onChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit2 = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  
  const [reservelist, setReservelist] = useState([]);
  useEffect(() => {
    dbService.collection("reserve").onSnapshot((snapshot) => {
      const listArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservelist(listArray);
    });
  }, []);
  console.log(reserveObj2)
  console.log(reservelist)
    return(
      <>
      <p>마이페이지입니다.</p>

      <div>
        <form onSubmit={onSubmit2}>
        <input
          onChange={onChange2}
          type="text"
          autoFocus
          placeholder="닉네임"
          value={newDisplayName}
        />
        <input
          type="submit"
          value="변경"
          style={{
            marginTop: 10,
          }}
        />
        </form>
      </div>

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

      <div>
      {reservelist.map((reservelists) => (
          <Reserve
            key={reservelists.id}
            reserveObj={reservelists}
            isOwner={reservelists.creatorId === userObj.uid}
          />
        ))}
      

      </div>

       <button className="all_button" onClick={onLogOutClick}>
          Log Out
        </button>
      </>
        );
    }
    
    export default My;

import { authService, dbService, storageService } from "fbase";
import { useState } from "react";
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
      <br></br>
      <div className="my_main">
        <div>
          <form onSubmit={onSubmit2}  className="my_name">
            <input
              onChange={onChange2}
              type="text"
              autoFocus
              placeholder="이름"
              value={newDisplayName}
              className="my_text"
            />
            <input
              type="submit"
              value="확인"
              className="my_button"
            />
          </form>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div className="my_reserve">
            <br></br>
                <input
                    value={reserve}
                    className="my_date"
                    onChange={onChange}
                    type="date"
                />
                <input className="my_button" type="submit" value="예약하기" />
            </div>
          </form>
        </div>
      </div>

<br></br>
      <div>
        {reservelist.map((reservelists) => {
        if (reservelists.creatorId === userObj.uid)
        return(
        <Reserve
          key={reservelists.id}
          reserveObj={reservelists}
          isOwner={reservelists.creatorId === userObj.uid}
        />
        );
      })}
      </div>

       <button className="all_button" onClick={onLogOutClick}>
          Log Out
        </button>
      </>
        );
    }
    
    export default My;

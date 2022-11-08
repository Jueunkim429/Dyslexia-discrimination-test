import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function My({ refreshUser, userObj }) {
    const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
    return(
        <>
        <p>마이페이지입니다.</p>

        <button onClick={onLogOutClick}>
        Log Out
      </button>
      </>
        );
    }
    
    export default My;

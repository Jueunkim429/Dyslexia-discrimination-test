import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import {  Link, useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import Navigation2 from "./Navigation2";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  let history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  const gotoTest = () => {
    history.push({
      pathname: `/test`
    });
  };

  return (
    <>
      {init ? (
        
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <>
        
        </>
      )}
    </>
  );
}

export default App;
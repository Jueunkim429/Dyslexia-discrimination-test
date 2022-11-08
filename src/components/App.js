import { Link, Route, Router, useHistory } from "react-router-dom";
import React from "react";
import AppRouter from "./Router";
import Auth from "routes/Auth";
import Test from "routes/Test";
import Intro from "./Intro";
import { authService } from "fbase";
import { useEffect } from "react";
import { useState } from "react";
import Log from "./Log";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
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
  return (
    <>
    <div>
    <Link to={"/test"}> 
      <button>
        test
      </button>
    </Link>

    <Link to={"/log"}> 
    
      <button>
        로그인/회원가입
      </button>
    </Link>

    <Link to={"/"}> 
      <button>
        home
    </button>
    </Link>
    </div>
    <Route exact path="/log">
      <Log />
    </Route>
    <Route exact path="/test">
      <Test />
    </Route>
    <Route exact path="/">
      <Intro />
    </Route>
      </>
  );
}

export default App;
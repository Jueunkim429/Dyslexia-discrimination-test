import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { useState } from "react";
import { useEffect } from "react";
import AppRouter from "components/Router";

const Auth = () => {
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
    <div>
      <AuthForm />
    </div>
  );
};
export default Auth;
